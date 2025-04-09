const Authuser = require("../models/register");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");



const user_login_get = (req, res) => {
    res.render("auth/login");
  };
  
  
  const user_register_get = (req, res) => {
    res.render("auth/register");
  };
  

const user_signout_get = (req, res) => {
    res.cookie("jwt", "", {maxAge : 1})
 
    res.redirect("/")
  }

const user_login_post = async (req, res) => {
    const user_login = await Authuser.findOne({ email: req.body.email });
    // من هانا تبدا المقارنه  بين هل هو موجود الايميل والباسورد في قاعده البيانات 
    try {
      if (user_login === null) {
        res.json({notFoundEmail : "Email not ound " })
        res.redirect("/login");
      } else {
        const check_pass = await bcrypt.compare(
          req.body.password,
          user_login.password
        );
        // وهنا تنتهي المقارنه حق اذا هو موجود او لا مسجل لدينا بقاعده البيانات 
    
        //وهذا مقارنه ثانيه بصفحه login الباسورد الذي ادخلته صحيح نخزن الباسورد في jwt cookies في المتصفح 
        if (check_pass) {
          console.log("correct email &&&&&&& pass word");
    
          var token = jwt.sign({ id: user_login._id }, process.env.JWT_SECRET_KEY);
          res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
          res.json({id : user_login._id  })
        } else {
          res.json({notCorrecPassword: `Password not Correct ❌ for : ${req.body.email}`})
          res.redirect("/login");
        }
      }
    } catch (error) {
      console.log(error)
    }
  };
  
// هذه الداله خاصه بانشاء حساب

   const user_register_post = [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  
    async (req, res) => {
      const objError = validationResult(req);
      if (!objError.isEmpty()) {
        return res.json({ arr_errors: objError.errors });
      }
   
      try {
        const isCurrentEmail = await Authuser.findOne({ email: req.body.email });
        if (isCurrentEmail) {
          return res.json({EmailFound : "Email already exists" })
        }
  
             const newuser = await Authuser.create(req.body)
  
        var token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET_KEY);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        res.json({ id: newuser._id });
  
      } catch (error) {
        console.log(error);
      }
    }
  ];


module.exports= {
    user_register_get,
    user_signout_get,
    user_login_get,
    user_login_post,
    user_register_post
}