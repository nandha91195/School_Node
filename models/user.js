const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

let UserModel = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    default: CONFIG.userType[0]
  },
  updatedBy: {
    type: String,
    default: CONFIG.userType[0]
  },
});

module.exports = User = mongoose.model("User", UserModel);
