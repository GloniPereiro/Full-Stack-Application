const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Tu będzie zapisany "hash", nie jawne hasło
    role: { type: String, default: "user" } // 👈 tu definiujemy role
});

module.exports = mongoose.model('User', UserSchema);
