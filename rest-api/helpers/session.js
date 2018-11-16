// User Session Management (something new for me, work in progress)
// https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions

const User          = require('../models/User')

exports.clients = async (req, res, next) =>{
    console.log(req.session)
    if (req.session && req.session.passport.user) {
        console.log(`Welcome back client`)
        try {
            let user = await User.findByEmail({ email: req.session.user.email })
            if (user) {
                req.user = user;
                delete req.user.password; // delete the password from the session
                req.session.user = user;  // refresh the session value
                res.locals.user = user;
            }
            // finishing processing the middleware and run the route
            next()
        } catch (e) {
            return next(e)
        }    
    } else {
        next()
    }
}

// personalize a session for guest only   
exports.guests = (req, res, next) =>{
    console.log('On a Public Route ...')
    // if a session already exists
    if (req.session) {
        // increment the visit counter (session is saved automatically)
        req.session.visits++
        // if the visitor is accessing the route as a passport-Authententicated user         
        if (req.session.passport){  
            console.log(`\t******
            This user is not a guest. 
            They have an account with us with username ${req.user.username} 
            But they are visiting a public page. 
            However, they are already logged in because the session has a passport key
            Everything Looks good! Nothing to worry about.
            ******`)  

            next()
        }else{
            if (req.session.user){ 
                console.log(`user '${req.session.user}' has been here before`)
            
                next()
            }else{
                console.log('havent seen the user in a while (or ever)')
                // store the user in session (session is saved automatically)
                req.session.type   = 'guest'
                req.session.user   = 'guest'
                req.session.visits = 1
                
                next()
            }  
        }
    }else{      // express-session has already created a new session, so its ok to go to the route as a guest
        next()
    }
}