const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    userId: String,
    action: String,
    fileName: String,
    date: { type: Date, default: Date.now },
    email: String
});

module.exports = mongoose.model("Log", logSchema);
