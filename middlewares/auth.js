const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const isAuthenticated = async(req, res, next) =>{

    const { token } = req.cookies;

    if(!token){
        return res.status(404).json({
            success:false,
            message:"Login First"
        })
    }
    const decoded = jwt.verify(token, "jkdflkasdiouwqdoih")
    req.user = await User.findById(decoded._id);
    next();
}

module.exports = isAuthenticated