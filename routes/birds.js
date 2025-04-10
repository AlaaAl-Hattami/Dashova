const express = require('express')
const router = express.Router()
 const userManagementController = require("../Controllers/userManagementController")
 const authenticationController = require("../Controllers/authenticationController")
 var {requierdAuth} =require("../middleware/middleware")
 var {checkuser} = require ("../middleware/middleware")
 const path = require("path");

 const multer  = require('multer')
 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads"); // مجلد الصور
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // اسم فريد
    }
  });
  const upload = multer({ storage: storage });

 router.get("*" ,checkuser)
 router.post("*" ,checkuser)

 router.post("/profile", upload.single("img"),
   authenticationController.user_profile_post
);
  
  
router.get("/" , userManagementController.user_welcom_get)

router.get("/home", requierdAuth,  userManagementController.user_index_get )

router.get("/edit/:id",requierdAuth , userManagementController.user_edit_get)

// هنا يتم عرض البيانات في صفحة اليوزر
router.get("/view/:id", requierdAuth , userManagementController.user_view_get)


router.post("/search", userManagementController.user_search_post)

// هذه اكواد خاصه بحذف البيانات من قاعدة البيانات
router.delete("/edit/:id", userManagementController.user_delete) 

router.put("/edit/:id", userManagementController.user_edit_put)


 // هنا بيكون الخاص بحق انشاءحساب جديد 
 router.post("/register", authenticationController.user_register_post)

 router.post("/login", authenticationController.user_login_post)

 
router.get("/singout", authenticationController.user_signout_get)


router.get("/login", authenticationController.user_login_get)

router.get("/register", authenticationController.user_register_get)


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