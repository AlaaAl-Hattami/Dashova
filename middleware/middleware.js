const jwt = require("jsonwebtoken");
const Authuser = require("../models/register");

//هذه داله حق login تتحقق التوكن موجود او لا
const requierdAuth = (req, res, next) => {
  console.log("requierdAuth");
  const token = req.cookies.jwt;

  if (token) {
    console.log("sucess login");

    jwt.verify(token, "Dashova", (err) => {
      if (err) {
        // التوكن هانا لوهو غير صالح
        res.redirect("/login");
      } else {
        // التوكن صالح، يعني بخليه  يكمل للصفحة
        next();
      }
    });
  } else {
    // ما فيش توكن
    res.redirect("/login");
  }
};

const checkuser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    // login user
    jwt.verify(token, "Dashova", async (err, decoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const loginUser = await Authuser.findById(decoded.id);
        res.locals.user = loginUser;
        next();
      }
    });
  } else {
    // no login
    res.locals.user = null
    next()
  }
};

module.exports = {requierdAuth, checkuser} ;

