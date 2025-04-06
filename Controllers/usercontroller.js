
const Article = require("../models/dataSchema");
var moment = require("moment");
const Authuser = require("../models/register");
 
const user_welcom_get = (req, res) => {
  res.render("welcom");
};
const user_login_get = (req, res) => {
  res.render("auth/login");
};

const user_register_get = (req, res) => {
  res.render("auth/register");
}

 const user_index_get = (req, res) => {
   Article.find()
     .then((data) => {
       res.render("index", { arr: data, moment: moment });
     })
     .catch((err) => {
       console.log(err);
     });
 };

 const user_edit_get =  (req, res) => {
   Article.findById(req.params.id)
     .then((data) => {
       res.render("user/edit", { arr: data, moment: moment });
     })
     .catch((err) => {
       console.log(err);
     });
 };

 const user_view_get= (req, res) => {
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
   Article.find({ $or: [
    { firstname: search }, { lastname: search }
  ]
 })
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

 const user_edit_put =  (req, res) => {
    Article.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.redirect("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const user_add_get =  (req, res) => {
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
  const user_register_post = async (req, res) => {
   try {
    const user = Authuser.create(req.body);
    console.log(user);

   } catch (error) {
    console.log(error);
   }
  }; 
  
module.exports = {
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