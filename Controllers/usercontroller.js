const Article = require("../models/dataSchema");
var moment = require("moment");
const Authuser = require("../models/register");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");


const user_welcom_get = (req, res) => {
    res.render("welcom");
  
};

 const user_signout_get = (req, res) => {
   res.cookie("jwt", "", {maxAge : 1})

   res.redirect("/")
 }

const user_login_get = (req, res) => {
  res.render("auth/login");
};

const user_register_get = (req, res) => {
  res.render("auth/register");
};

const user_index_get = (req, res) => {
  Article.find()
    .then((data) => {
      res.render("index", { arr: data, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_get = (req, res) => {
  Article.findById(req.params.id)
    .then((data) => {
      res.render("user/edit", { arr: data, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_view_get = (req, res) => {
  Article.findById(req.params.id)
    .then((data) => {
      res.render("user/view", { arr: data, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_search_post = (req, res) => {
  const search = req.body.search.trim();
  Article.find({ $or: [{ firstname: search }, { lastname: search }] })
    .then((data) => {
      res.render("user/search", { arr: data, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_delete = (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_put = (req, res) => {
  Article.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_add_get = (req, res) => {
  res.render("user/add");
};

const user_post = (req, res) => {
  Article.create(req.body)
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

// هنا بيكون الداله حق انشاء حساب للمستخدم الجديد

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
    console.log(" Validation passed successfully!");
    console.log("Received data:", req.body);

    

    try {
      const isCurrentEmail = await Authuser.findOne({ email: req.body.email });
      if (isCurrentEmail) {
        return res.json({EmailFound : "Email already exists" })
      }

           const newuser = await Authuser.create(req.body)

      var token = jwt.sign({ id: newuser._id }, "Dashova");
      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.json({ id: newuser._id });

    } catch (error) {
      console.log(error);
    }
  }
];



   

const user_login_post = async (req, res) => {
  const user_login = await Authuser.findOne({ email: req.body.email });
  // من هانا تبدا المقارنه  بين هل هو موجود الايميل والباسورد في قاعده البيانات 
  if (user_login === null) {
    console.log(" email not found ");
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

      var token = jwt.sign({ id: user_login._id }, "Dashova");
      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.redirect("/home");
    } else {
      console.log("incorrect password");
      res.redirect("/login");
    }
  }
};

module.exports = {
  user_signout_get,
  user_login_post,
  user_login_get,
  user_register_get,
  user_welcom_get,
  user_index_get,
  user_edit_get,
  user_view_get,
  user_search_post,
  user_delete,
  user_edit_put,
  user_add_get,
  user_post,
user_register_post
};
