const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [ { timestamp: {type: Number} } ],//visitHistory is defined as an array in which each element is an object containing a single field named timestamp. This timestamp field is stored as a Number, typically representing the time of each visit in milliseconds (as returned by Date.now()). This allows the application to keep a detailed history of when users accessed the shortened URL, with each visit recorded as an entry in the array.
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }//here we have given id which is reffering user
}, {timestamps: true})

const URL = mongoose.model('url', urlSchema);

module.exports = URL