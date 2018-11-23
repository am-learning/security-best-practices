require('dotenv').config()
const express   = require('express')
const path      = require('path')                   // for utilities to work with file and directory paths
// SECURITY MIDDLEWARE                              ----------------------------------
const cors      = require('cors')                   // for Cross-origin resource sharing and allowing HTTP headers
const helmet    = require('helmet')                 // for managing HTTP settings for protection against attacks (CSRF, XSS etc)
// MISCELLANEOUS MIDDLEWARE                         ----------------------------------
const bodyParser= require('body-parser')            // for POST/PUT/PATCH request handling
const validator = require('express-validator')      // for form input validation 
const session   = require('express-session')        // for user session handling
const MongoStore= require('connect-mongodb-session')(session)   // for storing sessions created by express-session
const passport  = require('passport')               // for authentication

// HELPERS                                          ----------------------------------
const mongoose  = require('./helpers/mongo')

// INSTANTIATE THE APP                              ----------------------------------
const app       = express()
const port      = process.env.PORT

// HELMET OPTIONS                                   ----------------------------------
const helmetOptions = { 
    dnsPrefetchControl: { allow: true }             // to allow DNS lookups for URLS in the page, this improves performance by about 5%
}

// CORS OPTIONS                                     ----------------------------------
const allowedClients  = ['http://localhost:3001', 'http://localhost:8081']
const headersToExpose = ['Authorization', 'Content-Length', 'X-Requested-With', 'Strict-Transport-Security', 'X-Frame-Options', 'X-XSS-Protection', 'X-Content-Type-Options', 'Content-Security-Policy']
const headersToAllow  = ['Authorization', 'Content-type', 'Content-Length', 'Origin']
const corsOptions = { 
    exposedHeaders: "Authorization",  // figure out which other 
    allowedHeaders: headersToAllow,
    credentials: true,                            
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        // allow requests from the specific clients
        if (allowedClients.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error(`The client ${origin} is not allowed by CORS policy of this site`), false)
        }
    }
  }
// COOKIE OPTIONS
let cookie = {
    maxAge: Number(process.env.COOKIE_AGE),
    secure: false,                  // serve cookies on http (or in development mode)
    httpOnly: true                  // clientside javascript(document.cookie) cannot see this cookie
}   
// Use secured cookies in production only (when https is enabled)
if (process.env.NODE_ENV === 'production'){ 
    app.set('trust proxy', 1)       // trust first proxy
    cookie.secure = true
    // use domain if needed         
}

// MONGO STORE OPTIONS 
// stores user sessions in the mongodb (accessible via req.session)
const storeOptions =  {
    ttl: 24 * 60 * 60,          // = 1 day (ttl is used if the cookie doesnt have a maxAge)
    autoReconnect: true,
    databaseName: mongoose.connection.name
}
const store = new MongoStore(storeOptions, function(error) {
    if (error)      console.log('Mongo Error')
})
store.on('error', function(error) {
    if (error)      console.log('Mongo Error')
})


// the order of 'middleware use' is important                 ----------------------------------
app.use(helmet(helmetOptions))
app.use(cors(corsOptions))                              // omit the corsOptions if you want to use default CORS policy (not a good idea)
app.use(express.static(path.join(__dirname, '../client-vue/dist'))) // https://expressjs.com/en/starter/static-files.html
app.use(bodyParser.json({ parameterLimit: 100000, limit: '60mb' }))                         // for parsing application/json
app.use(bodyParser.raw({ parameterLimit: 100000, limit: '60mb' }))
app.use(bodyParser.urlencoded({ parameterLimit: 100000, limit: '60mb', extended: true }))   // for parsing application/x-www-form-urlencoded
app.use(validator())                // this line must be immediately after express.bodyParser()!
app.use(session({ 
    name: process.env.SESSION_ID,   // make sure this name is unique if running multiple servers on localhost (or another same host)
    secret: process.env.AUTH_SECRET, 
    saveUninitialized: false,       // don't create session until something stored
    resave: false,                  // don't save session if unmodified
    rolling: true,                  // resets cookie age with every response
    cookie: cookie,
    store: store
}))

app.use(passport.initialize())
app.use(passport.session())

// Routes                                           ----------------------------------
const mainRoutes    = require('./routes/main.route')
const apiRoutes     = require('./routes/api.route')
const adminRoutes   = require('./routes/admin.route')
const publicRoutes   = require('./routes/public.route')
// public or guest routes
app.use('/', mainRoutes)
app.use('/public', publicRoutes)
// protected routes
app.use('/api', apiRoutes)
app.use('/admin', adminRoutes)


// Error Handling                                   ----------------------------------
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    //res.status(err.status || 500)
    //res.render('error')
})

// START THE SERVER                                 ----------------------------------
if (process.env.NODE_ENV == 'development') {
    // (If not already started by another entity, such as the tests)
    if(!module.parent){
        app.listen(port, ()=> {
            console.log(`
            App is Listening on port ${port}
            ENV: ${process.env.NODE_ENV}
            URL: http://localhost:${port}`)
        })
    }
}

// Start the 'HTTPS' server                         ----------------------------------
if (process.env.NODE_ENV == 'production') {
    const https     = require("https")
    const credentials = {  
        key: fs.readFileSync("my-api.key", "utf8"),
        cert: fs.readFileSync("my-api.cert", "utf8")
    };
    https  
        .createServer(credentials, app)
        .listen(port, function() {
            console.log(`App is Listening on port ${port}`)
        })
}

// EXPORT THE APP FOR TESTING                       ----------------------------------
module.exports = app                               