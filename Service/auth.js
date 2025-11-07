const jwt = require("jsonwebtoken");
const secret = "loveumom";

// ✅ Create a JWT using minimal data
function setUser(user) {
    return jwt.sign(
        {
            _id: user._id.toString(), // store only unique ID
            email: user.email,
        },
        secret
    );
}

// ✅ Decode the JWT safely
function getUser(token) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error("JWT Verification Failed:", err.message);
        return null; // return null if token invalid
    }
}

module.exports = {
    setUser,
    getUser,
};
