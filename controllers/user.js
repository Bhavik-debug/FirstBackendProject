const { v4 : uuidv4 } = require('uuid');
const User = require('../models/user')
const {setUser} = require('../Service/auth')

async function UserSignUp(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/login')
}

async function Userlogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password})
    if(!user) return res.render('03_login',{
        error: "Invalid Username or Password"
    })
    const token = setUser(user);
    res.cookie('uid', token);
    return res.redirect('/')
}

module.exports = {
    UserSignUp,
    Userlogin,
}