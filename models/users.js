const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:{type:String, unique:true},
  password:String,
  profile:{
    name:String,
    picture:String,
    website:String
  }
} , {timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
