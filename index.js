const express = require('express');
const app = express();
const port = 8001;
// express layout
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');
app.use(express.static('./assets'));
app.use(expressLayouts);

// extract style and script from sub pages into layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express  router
app.use('/', require('./routes'))
// set up the views engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){

    if(err){
        console.log(`there is error in server: ${err}`);
    }

    console.log(`the server is running successfully at port : ${port}`);
});