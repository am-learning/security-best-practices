const passport  = require('passport')
const bcrypt    = require('bcryptjs')
const User      = require('../models/User')

exports.login = (req, res, next) => {
    //console.log(req.body)

    // Validate Form using express-validator
    req.checkBody('username', 'Username is Required').notEmpty()
    req.checkBody('username', 'Username is not valid Email').isEmail()
    req.checkBody('password', 'Password is Required').notEmpty()

    // Handle Validation Errors
    const validationErrors = req.validationErrors()
    if (validationErrors){
        const message = "Errros in Login Form"
        //console.log(message)
        res.json({message})
    }else{
        // Use Passport to authenticate user
            // first, the helpers/passport -> passport.use('local') is executed
            // then the callback (err, user, data) => {} is executed
        passport.authenticate('local', (err, user, data) => {
            if (err) {
                console.log(err.message)
                res.json({authenticated: false, message: "Other Server error" })
                // HTTP Error 500 - server errors
            }else{
                if (!user) {
                    res.json({authenticated: false, message: data.message })
                    //HTTP Error 401 - Unauthorized: Access is denied due to invalid credentials.
                }else{                      
                    // Regenerate session with a new Id 
                    // this is to avoid using the same session as was created for the Public/guest access
                    if (!req.session.passport){
                        console.log('No session exists for the user')
                        req.session.regenerate((err) =>{                            
                            if (err) {
                                console.log(err)
                                return next(err)
                            }   
                            // add basic information to the session
                            req.session.type    = 'loggedIn'   
                            req.session.user    = user.username
                            req.session.visits  = 1

                            // set the cookie age to a month, if 'Remember Me' is set for the user currently logging in                       
                            if (req.body.rememberMe){
                                req.session.rememberMe      = true
                                req.session.cookie.maxAge   = 30 * 24 * 60 * 60 * 1000  // set to 1 month
                            } 

                            // log the user in to the passport session
                            req.login(user, err =>{
                                if (err){
                                    console.log(err.message)
                                    return next(err)
                                }
                                //console.log('added user to the req.user')                   
                                let nonSensitiveUser = {username:user.username, email:user.email, token: user.token}
                                res.json({authenticated: true, user: nonSensitiveUser})
                            })
                        })
                    }                                                                                        
                }
            }
        })(req, res, next)
    }
}

exports.register = async (req, res, next) => {
    //console.log(req.body)
    let user    = req.body
    let errors  = []
    let message = ''

    // Validate Form using express-validator
    req.checkBody('username', 'Username is Required').notEmpty()
    req.checkBody('username', 'Username is not a valid Email').isEmail()
    req.checkBody('password', 'Password is Required').notEmpty()
    req.checkBody('repeatPassword', 'Repeat Password is Required').notEmpty()
    req.checkBody('repeatPassword', 'Passwords do not match').equals(user.password)

    // Handle Validation Errors
    const validationErrors = req.validationErrors()
    if (validationErrors){
        message = "Errros in Registration Form"        
        validationErrors.forEach(error => {
            errors.push(error.msg)
        })        
        res.json({message, errors})
    }else{
        // Hash and Salt the password before storing the user in the Database
        const salt      = bcrypt.genSaltSync()
        user.password   = bcrypt.hashSync(user.password, salt)

        try{
            let registeredUser = await new User(user).save()
            if (registeredUser._id){
                req.login(registeredUser, function(err){
					if (err){
						//console.log(err.message)
						return next(err)
					}
					//console.log('added newly registered user to the req.user')
                    res.json({registered: true})
				})                
            }else
                res.json({registered: false})
        }catch(err){
            //console.log(err)
            if (err.code === 11000){
                message = 'Username Already Exists'
                errors.push(message)
                res.json({registered: false, message, errors})
            }else{
                message = 'Unknown Serverside Error'
                errors.push(message)
                res.json({registered: false, message, errors})
            }
            
        } 
    }  
}

exports.logout = (req, res) => {   
    // Log out from the passport session
    req.logout()
    // clear the session cookie on the server and the client
    if (req.session.user) {
        res.clearCookie(process.env.SESSION_ID)     // client cookie
        req.session.destroy(function(err){          // server session/cookie
            if(err)     console.log(err)
        })
    } 

    console.log('User Logged out, session destroyed')
    // return to client
    res.status(200).json({loggedOut: true, message: 'User Successfully Logged Out'})
}
