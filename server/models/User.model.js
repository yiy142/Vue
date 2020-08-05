const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
});

const User = mongoose.model('User', userSchema, 'user');
module.exports = User;
