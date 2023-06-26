const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const sendCookie = require('../utils/features')
const { ErrorHandler } = require('../middlewares/error')


const getAllUser = async (req, res) => { }

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })

        if (user) {
            return next(new ErrorHandler("User Already Exist", 400))
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword });
        sendCookie(user, res, "Registerd Successfully", 201)
    } catch (error) {
        next(error)
    }
}


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid Email and Password", 400))
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return next(new ErrorHandler("Invalid Email and Password", 400))
        }
        sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
    } catch (error) {
        next(error)
    }
}

const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}

const logout = (req, res) => {
    res.status(200).cookie("token", "",
        {
            expire: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "Logout Successfully",
            user: req.user
        })

}
module.exports = { getAllUser, register, getMyProfile, login, logout }