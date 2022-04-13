const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new Schema({

    username :{
        type : String,
        required: true
    },

    vehicleNo :{
        type : String,
        required: true
    },

    startDate :{
        type : Date,
        required: true
    },

    endDate :{
        type : Date,
        required: true
    },

    total :{
        type : String,
        required: true
    }

})

const booking = mongoose.model("booking",bookingSchema);
module.exports = booking;
