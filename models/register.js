const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  
    username: String,
    email: String,
    password: String || Number,
    confirm_password: String || Number,
})

 const mydata = mongoose.model('user', articleSchema);
module.exports = mydata;