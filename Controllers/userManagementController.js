var moment = require("moment");
const Authuser = require("../models/register");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const user_welcom_get = (req, res) => {
  res.render("welcom");
};

const user_index_get = (req, res) => {
  //هانا decoded تعني فك التشفير ويخلي كل مستخدم يدخل بحقه البيانات حسيب id
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
  // console.log(decoded.id)
  Authuser.findOne({ _id: decoded.id })
    .then((data) => {
      console.log(data);
      res.render("index", { arr: data.employInfo, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_delete = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  Authuser.updateOne(
    { "employInfo._id": req.params.id },
    { $pull: { employInfo: { _id: req.params.id } } }
  )
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_view_get = (req, res) => {
  Authuser.findOne({ "employInfo._id": req.params.id })
    .then((data) => {
      const pressObj = data.employInfo.find((element) => {
        return element._id == req.params.id;
      });
      console.log("_______________________________________");
      res.render("user/view", { arr: pressObj, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_get = (req, res) => {
  Authuser.findOne({ "employInfo._id": req.params.id })
    .then((data) => {
      const pressObj = data.employInfo.find((element) => {
        return element._id == req.params.id;
      });
      console.log("");
      res.render("user/edit", { arr: pressObj, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_search_post = (req, res) => {
  const search = req.body.search.trim();
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  Authuser.findOne({ _id: decoded.id })
    .then((data) => {
      const clickSearchbtn = data.employInfo.filter((element) => {
        return (
          element.firstname.includes(search) ||
          element.lastname.includes(search) 

 
        );
      });
      console.log("********************************************************");
      console.log(clickSearchbtn);
      res.render("user/search", {arr :clickSearchbtn, moment:moment })
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_put = (req, res) => {
  Authuser.updateOne(
    { "employInfo._id": req.params.id },
    //اذا كنت تريد مثلا تعمل تعديل ع حقل واحد نعمل بعد .$.username او اي شي
    { "employInfo.$": req.body }
  )
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
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
  console.log(
    " ====================================================================="
  );
  console.log(req.body);
  Authuser.updateOne({ _id: decoded.id }, { $push: { employInfo: req.body } })
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

// هنا بيكون الداله حق انشاء حساب للمستخدم الجديد

module.exports = {
  user_welcom_get,
  user_index_get,
  user_edit_get,
  user_view_get,
  user_search_post,
  user_delete,
  user_edit_put,
  user_add_get,
  user_post,
};
