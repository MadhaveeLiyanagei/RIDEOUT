const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const vehicleSchema = new Schema({
    modelName :{
        type : String,
        required: true
    },

    brandName :{
        type : String,
        required: true
    },

    manufactureYear :{
        type : String,
        required: true
    },

    price :{
        type : Number,
        required: true
    }

})

const vehicle = mongoose.model("vehicle",vehicleSchema);
module.exports = vehicle;