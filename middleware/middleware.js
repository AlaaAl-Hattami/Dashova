const jwt = require("jsonwebtoken");

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

module.exports = requierdAuth;
