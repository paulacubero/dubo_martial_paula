const mongoose = require('mongoose');


// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = mongoose.model("User",userSchema,"users")