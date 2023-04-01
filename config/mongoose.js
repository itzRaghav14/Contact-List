// require the library
const mongoose = require('mongoose');

// connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');

// acquiring a connection (to check if it is successful);
const db = mongoose.connection;

// checking for error
db.on('error in connection with mongoose ', console.error.bind(console, 'error connecting to db'));

// if it is up then print this
db.once('open', function(){
    console.log('Opened succesfully.');
});