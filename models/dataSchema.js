const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  authSchema = new Schema({
    firstname:String,
    lastname:String,
    email:String,
    phone:Number,
    age:Number,
    country:String,
    gender:String,

}, {timestamps:true}
)

const authuser=mongoose.model("custemer",authSchema);
module.exports=authuser;