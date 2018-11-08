const passport  = require('passport')
const bcrypt    = require('bcryptjs')

exports.login = (req, res) => {
    console.log(req.body)

    // Form validation using express-validator
    req.checkBody('username', 'Username is Required').notEmpty()
    req.checkBody('username', 'Username is not valid Email').isEmail()
    req.checkBody('password', 'Password is Required').notEmpty()

    const validationErrors = req.validationErrors()
    if (validationErrors){
        const message = "Errros in Login Form"
        console.log(message)
        res.json({message})
    }else{
        // TODO: use passport etc and generate a proper token
        res.status(200).json({authenticated: true, token: 'asdf'})
    }
}

exports.register = async (req, res) => {
    console.log(req.body)
    let user = req.body
    // Validate Form using express-validator
    req.checkBody('username', 'Username is Required').notEmpty()
    req.checkBody('username', 'Username is not a valid Email').isEmail()
    req.checkBody('password', 'Password is Required').notEmpty()
    req.checkBody('repeatPassword', 'Repeat Password is Required').notEmpty()
    req.checkBody('repeatPassword', 'Passwords do not match').equals(user.password)

    // Handle Validation Errors
    const validationErrors = req.validationErrors()
    if (validationErrors){
        const message = "Errros in Registration Form"
        let errors = []
        validationErrors.forEach(error => {
            errors.push(error.msg)
        })        
        res.json({message, errors})
    }else{
        // Hash and Salt the password before storing the user in the Database
        const salt      = bcrypt.genSaltSync()
        user.password   = bcrypt.hashSync(user.password, salt)

        // TODO: uncomment the below when the database is implemented
        /* try{
            let registeredUser = await new User(user).save()
            if (registeredUser._id)
                res.status(200).json({registered: true})
            else
                res.send({registered: false})
        }catch(err){
            console.log(err)
            if (err.code === 11000){
                res.json({message: 'User Already Exists'})
            }else
                res.json({message: 'Serverside error'})
        } */

        res.status(200).json({registered: true})
    }
    
}

exports.logout = (req, res) => {
    // TODO: make sure to log out from the session and expire the cookie/tokens etc
    // req.logout()
    res.status(200).json({message: 'User Successfully Logged Out'})
}