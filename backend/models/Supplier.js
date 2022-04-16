const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({


  


    supplier_name : {
        type : String,
        required: true
    },

    email : {
        type : String,
        required: true
    },

    nic : {
        type : String,
        required: true
    },

    phone_number : {
        type : String,
        required: true
    },

    gender : {
        type : String,
        required: true
    }

    

})

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;