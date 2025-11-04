const {getUser} = require('../Service/auth')

async function restrictToLoggedInUserOnly(req, res, next){
    const userUid = await req.cookies?.uid;
    if(!userUid) return res.redirect('/login')
    //if user is not logged in we are sending him to login page
    const user = getUser(userUid);
    if(!user) return res.redirect('/login')
    req.user = user;
    next();
}

//koi tumeh force nai kr rha ki login hona hi pdega
async function checkAuth(req, res, next) {
    const userUid = await req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}