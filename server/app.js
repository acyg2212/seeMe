const express = require('express'),
    Session = require('express-session'),
    bodyParse = require('body-parser'),
const { MongoClient } = require("mongodb"),
    middleware = require('connect-ensure-login'),
    FileStore = require('session-file-store')(Session),
    config = require('./config/default'),
    flash = require('connect-flash'),
    port = 3333,
    app = express();
const passport = require('./auth/passport')

app.use(passport.initialize());
app.use(passport.session());

const uri = "mongodb + srv://seeMe_app:<password>@cluster0.afmnk.mongodb.net/<dbname>?retryWrites=true&w=majority"

const client = new MongoClient(uri);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static('public'));
app.use(flash());
app.use(require('cookie-parser')());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json({ extended: true }));
app.use('/login', require('./route/login'));
app.use('/register', require('./routes/register'));

app.use(Session({
    store: new FileStore({
        path: './server/sessions'
    }),
    secret: config.server.secret,
    maxAge: Date().now + (60 * 1000 * 30)
}));

app.get('*', middleware.ensureLoggedIn(), (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log(`App listening on ${port}!`));