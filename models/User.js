const { Schema, model } = require('mongoose');
const { generateJWT } = require('../helpers/generateJWT');

const UserSchema = Schema({
    card: {
        type: String,
        required: false,
    },
    fullname: {
        type: String,
        required: true,
    },
    dni: {
        type: Number,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    phone: {
        type: Number,
        required: false,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
}); 

module.exports = model('User', UserSchema);