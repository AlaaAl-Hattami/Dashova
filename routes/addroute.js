const express = require('express')
const router = express.Router()
 const usercontroller = require("../Controllers/usercontroller")

const Article = require("../models/dataSchema");
var moment = require("moment");


// get طلبات
router.get("/user/add.html", usercontroller.user_add_get)

// post الخاصه هذه اكواد المشروع الحقيقي
router.post("/user/add.html", usercontroller.user_post)

module.exports = router