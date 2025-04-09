const express = require('express')
const router = express.Router()
 const userManagementController = require("../Controllers/userManagementController")
 const {requierdAuth} =require("../middleware/middleware")



// get طلبات
router.get("/user/add.html", requierdAuth, userManagementController.user_add_get)

// post الخاصه هذه اكواد المشروع الحقيقي
router.post("/user/add.html", requierdAuth , userManagementController.user_post)

module.exports = router