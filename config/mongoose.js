const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to Mongodb"));

db.once('open',function(){

    console.log('Connected to Database :: mongodb');
});

module.exports= db;