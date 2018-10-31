exports.login = (req, res) => {
    console.log(req.body)
    // TODO: use passport etc and generate a proper token
    res.status(200).json({authenticated: true, token: 'asdf'})
}

exports.register = (req, res) => {
    console.log(req.body)
    // TODO: use passport etc and generate a proper token
    res.status(200).json({registered: true})
}