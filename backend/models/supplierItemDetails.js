const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierItemSchema = new Schema({
    
    supItemId : {
        type : String,
        required: true
    },
    supName : {
        type : String,
        required: true
    },
    itemName : {
        type : String,
        required: true
    },
    purchasedDate : {
        type : String,
        required: true
    },
    quantity : {
        type : Number,
        required: true
    },
    unitprice : {
        type : Number,
        required: true
    },
    
    totalAmount : {
        type : Number,
        required: true
    }


})

const Supplier_Item_Detail = mongoose.model("Supplier_Item_Detail", supplierItemSchema);

module.exports = Supplier_Item_Detail;