const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage() // بدون حفظ على القرص
});

module.exports = upload;
