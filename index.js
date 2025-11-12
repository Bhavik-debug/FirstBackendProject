const express = require('express')
const path = require('path')
const {connectMongo} = require('./connect.js')
const cookieParser = require('cookie-parser')
const {checkForAuthentication, restrictTo} = require('./middleware/auth.js')

const URL = require('./models/url.js')
const User = require('./models/user')

const urlRoute = require('./routes/url.js')
const staticRoute = require('./routes/staticRouter.js')
const userRoute = require('./routes/user.js')

const app = express();
port = 3000;

//connection
connectMongo("mongodb://127.0.0.1:27017/url_shorterner")//forms new db named url_shorterner
    .then(()=>{
        console.log('mongoDB connected');
    })

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))//telling our server that all ejs files are kept in views folder

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use(checkForAuthentication);//will run always

app.use('/url', restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);

app.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const entry = await URL.findOneAndUpdate(
            { shortId: id }, //finding url fo given id from database
            { 
                //$push adds a new object to the visitHistory arra
                $push: { 
                    visitHistory: { timestamp: Date.now() }
                } 
            }, // update
            { new: true } // returning updated document
        );
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        res.redirect(entry.redirectURL);//Redirects the user to the original full URL
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})