const { Schema, model } = require("mongoose");
const { generateToken } = require("../helpers/generateToken");

const UserSchema = Schema({
  card: {
    type: String,
    required: false,
  },

  fullname: {
    type: String,
    required: false,
  },

  dni: {
    type: Number,
    required: false,
  },

  email: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: false,
  },

  photo: {
    type: String,
    required: false,
  },

  phone: {
    type: Number,
    required: false,
  },

  token: {
    type: String,
    default: generateToken(),
  },

  confirmed: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.setImgUrl = function setImgUrl(filename) {
  const HOST = process.env.HOST || "localhost:4000";
  this.photo = `${HOST}/public/${filename}`;
};

module.exports = model("User", UserSchema);
