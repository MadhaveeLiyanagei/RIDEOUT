const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({

  

    userName : {
        type : String,
        required: true
    },

    vehicleNo : {
        type : String,
        required: true
    },

    paidtDate : {
        type : String,
        required: true
    },

    total : {
        type : String,
        //required: true
    }


})

const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;