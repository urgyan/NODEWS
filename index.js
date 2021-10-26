const express = require('express');
const app = express();
const port = 8001;


// use express as router
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