const express = require("express");
const URL = require("../models/url")

const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.user) return res.redirect('/login')
    const allurls = await URL.find({createdBy:req.user._id})
    return res.render('01_home.ejs', {
        urls: allurls,
    })
})

router.get('/signup', (req, res)=>{
    return res.render('02_signUp.ejs');
})

router.get('/login', (req, res)=>{
    return res.render('03_login.ejs');
})

module.exports = router;