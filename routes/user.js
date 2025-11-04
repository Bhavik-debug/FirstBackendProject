const express = require('express')
const {UserSignUp, Userlogin} = require('../controllers/user')
const router = express.Router()

router.post('/', UserSignUp)
router.post('/login', Userlogin)

module.exports = router;