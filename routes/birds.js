const express = require('express')
const router = express.Router()
 const usercontroller = require("../Controllers/usercontroller")
 var {requierdAuth} =require("../middleware/middleware")
 var {checkuser} = require ("../middleware/middleware")
// get الخاصه هذه اكواد المشروع الحقيقي

 router.get("*" ,checkuser)

router.get("/" , checkuser, usercontroller.user_welcom_get)

router.get("/singout", usercontroller.user_signout_get)


router.get("/login", usercontroller.user_login_get)

router.get("/register", usercontroller.user_register_get)

router.get("/home", requierdAuth,  usercontroller.user_index_get )

router.get("/edit/:id",requierdAuth , usercontroller.user_edit_get)

// هنا يتم عرض البيانات في صفحة اليوزر
router.get("/view/:id", requierdAuth , usercontroller.user_view_get)


router.post("/search", usercontroller.user_search_post)

// هذه اكواد خاصه بحذف البيانات من قاعدة البيانات
router.delete("/edit/:id", usercontroller.user_delete) 

router.put("/edit/:id", usercontroller.user_edit_put)


 // هنا بيكون الخاص بحق انشاءحساب جديد 
 router.post("/register", usercontroller.user_register_post)

 router.post("/login", usercontroller.user_login_post)

// app.post("/", (req, res) => {
//   console.log(req.body);

//   // هنا يتم انشاء المودل وحفظ البيانات في قاعدة البيانات
//   const article = new Article(req.body);
//   article
//     .save()
//     .then(() => {
//       res.redirect("/new.html");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// app.get("/new.html", (req, res) => {
//   res.send("<h1>data saved</h1>");
// });



module.exports = router