const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const articleSchema = new Schema({
    profileImage:String,
    username: String,
    email: String,
    password: String || Number,
    confirm_password: String || Number,
    employInfo: [
        {
            firstname:String,
            lastname:String,
            email:String,
            phone:Number,
            age:Number,
            country:String,
            gender:String,
            createdAt: Date,
            updatedAt: { type: Date, default: Date.now }
        
        }
    ]
    
})
// هنا اشفر البيانات  الي اشتيها بس بشفر الان الباسورد فقط 
articleSchema.pre("save", async function (next) {
 const salt = await bcrypt.genSalt();
 this.password = await bcrypt.hash(this.password, salt);
//  this.email = await bcrypt.hash(this.email, salt);
//  this.confirm_password = await bcrypt.hash(this.confirm_password, salt);

 next();
});

 const authuser = mongoose.model('user', articleSchema);
module.exports = authuser;