const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 8001;
// express layout
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');
// used for session cookies

const session = require('express-session');

const passport = require('passport');

const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle:'extended',
    prefix:'/css'
}));
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

app.use(express.static('./assets'));
// make the uploads path avaliable to the browser
app.use('/uploads',express.static(__dirname+ '/uploads'));

app.use(expressLayouts);

// extract style and script from sub pages into layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the views engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    // TODO change the secret before deyployment in production mode
    secret: 'blhasomething',
    saveUninitialized: false,
    resave: false,

    cookie: {
        maxAge:(1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
          mongoUrl: 'mongodb://localhost/codeial_development',
          autoRemove: "disabled",
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express  router
app.use('/', require('./routes'));

app.listen(port, function(err){

    if(err){
        console.log(`there is error in server: ${err}`);
    }

    console.log(`the server is running successfully at port : ${port}`);
});