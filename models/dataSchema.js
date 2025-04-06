const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  articleSchema = new Schema({
    firstname:String,
    lastname:String,
    email:String,
    phone:Number,
    age:Number,
    country:String,
    gender:String,

}, {timestamps:true}
)

const mydata=mongoose.model("user",articleSchema);
module.exports=mydata;