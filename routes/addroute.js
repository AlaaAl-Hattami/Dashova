const express = require('express')
const router = express.Router()
 const usercontroller = require("../Controllers/usercontroller")
 const {requierdAuth} =require("../middleware/middleware")



// get طلبات
router.get("/user/add.html", requierdAuth, usercontroller.user_add_get)

// post الخاصه هذه اكواد المشروع الحقيقي
router.post("/user/add.html", requierdAuth , usercontroller.user_post)

module.exports = router