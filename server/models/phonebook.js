const mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    id: Number,
    name: String,
    phonenumber: String,
})

module.exports = mongoose.model("phonebook", todoSchema); 