const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flight = new Schema(
    {
        flight_number : {type : Number, required : true},
        flight_duration : {type : Number, required : true },
        source : {type : String, required : true},
        destination : {type : String, required : true},
        departure_time : {type : Date, required : true}
    },
    {timestamps : true},
);

module.exports = mongoose.model('flight_master', flight);