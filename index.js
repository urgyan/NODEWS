const cookieParser = require('cookie-parser');
const express = require('express');
const env = require('./config/environment');

const app = express();
const port = 8001;
// express layout
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');
// used for session cookies

const session = require('express-session');

const passport = require('passport');

const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);

console.log('chat server is listening on port 5000');
const path = require('path');

if (env.name == 'development'){ ///only in development mode sass  middleware should run
  
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),  
    debug: true,
    outputStyle:'extended',
    prefix:'/css'
}));

}
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

app.use(express.static(env.asset_path));
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
    secret: env.session_cookie_key,
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