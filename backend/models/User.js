const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 16,
    },
    mobile: {
        type: String,
        required: true,
        min: 10,
    },
    gender: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
        min: 10,
    },
});

module.exports = mongoose.model("User", userSchema);