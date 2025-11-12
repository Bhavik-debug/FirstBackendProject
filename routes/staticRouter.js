const express = require("express");
const {restrictTo} = require("../middleware/auth")
const URL = require("../models/url")

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  try {
    const allUrls = await URL.find({})
      .populate("createdBy", "email"); // only bring user's email field
      
    return res.render("01_home", { urls: allUrls });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


router.get('/', restrictTo(['NORMAL','ADMIN']), async (req, res) => {
    if(!req.user) return res.redirect('/login')//req.user comes from middleware restrictToLoggedInUserOnly 
    const allurls = await URL.find({createdBy:req.user._id})
      .populate("createdBy", "email");
    return res.render('01_home.ejs', {
        urls: allurls,
        id: req.query.new || null, // ✅ pass newly created ID if available
    })
})

router.get('/signup', (req, res)=>{
    return res.render('02_signUp.ejs');
})

router.get('/login', (req, res)=>{
    return res.render('03_login.ejs');
})

module.exports = router;