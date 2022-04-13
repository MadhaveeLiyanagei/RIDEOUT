const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverSchema = new Schema({

    driver_id : {
        type : String,
        required: true
    },

    driver_name : {
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

const driver = mongoose.model("driver", driverSchema);
module.exports = driver;