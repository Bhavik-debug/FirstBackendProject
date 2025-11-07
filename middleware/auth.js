const {getUser} = require('../Service/auth')

function checkForAuthentication(req, res, next){
    
}

function restrictToLoggedInUserOnly(req, res, next) {
    const token = req.cookies?.uid;
    if (!token) return res.redirect('/login');
    const user = getUser(token);
    if (!user) return res.redirect('/login');
    req.user = user;
    next();
}


//koi tumeh force nai kr rha ki login hona hi pdega
function checkAuth(req, res, next) {
    const token = req.cookies?.uid;
    if (!token) {
        req.user = null;
        return next();
    }
    const user = getUser(token);
    if (!user) {
        req.user = null; // token invalid or expired
        return next();
    }
    req.user = user;
    next();
}


module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}