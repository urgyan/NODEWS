const mongoose = require('mongoose');

const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to Mongodb"));

db.once('open',function(){

    console.log('Connected to Database :: mongodb');
});

module.exports= db;