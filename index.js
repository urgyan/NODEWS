const express = require('express');
const app = express();
const port = 8000;
// use express as router
app.use('/', require('./routes'))
app.listen(port, function(err){

    if(err){
        console.log(`there is error in server: ${err}`);
    }

    console.log(`the server is running successfully at port : ${port}`);
});