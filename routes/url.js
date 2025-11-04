const express = require ('express')
const router = express.Router();
const {generateNewShortURL, getAnalytics} = require("../controllers/url.js")

router.post("/", generateNewShortURL);
router.get("/analytics/:id", getAnalytics)


module.exports = router;