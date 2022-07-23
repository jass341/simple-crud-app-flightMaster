const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/flightDb', {useNewUrlParser : true})
    .catch(e => {
        console.error('Connection error');
    });

const db = mongoose.connection;

module.exports = db;