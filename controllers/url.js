const { nanoid } = require('nanoid');
const URL = require('../models/url.js');

async function generateNewShortURL(req, res) {
    try {
        const body = req.body;
        if (!body || !body.url) {
            return res.status(400).json({ err: "url is required" });
        }
        const shortID = nanoid(5);
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],//because we are making new url that is why array here should be empty
            createdBy: req.user._id,
        });
        return res.redirect("/");
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ err: "Server Error" });
    }
}


async function getAnalytics(req, res){
    const id = req.params.id;
    const result = await URL.findOne({ shortId: id });
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    else return res.json(
        {
            totalClicks:result.visitHistory.length,
            analytics: result.visitHistory,
        }
    )
}

module.exports = {
    generateNewShortURL,
    getAnalytics,
}