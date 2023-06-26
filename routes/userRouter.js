const express = require('express');
const isAuthenticated = require('../middlewares/auth')
const { getAllUser, register, getMyProfile, login, logout} = require('../controllers/userController')

const router = express.Router();

router.get('/all', getAllUser)

router.post('/new', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me',isAuthenticated,getMyProfile)


module.exports = router