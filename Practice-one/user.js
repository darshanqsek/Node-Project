const mongoose = require("mongoose");
const usersschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: Number,
  skill: String,
});

module.exports = mongoose.model('users',usersschema);
