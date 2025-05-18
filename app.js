const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const app = express();
dotenv.config();
const port = process.env.PORT || 15000;



// 🧠 ربط MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running: http://localhost:${port}/`);
    });
  })
  .catch((err) => console.log("❌ MongoDB error:", err));

// 🧩 إعدادات الميدل وير
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

// 📂 ملفات ستاتيكية
app.use(express.static("public"));
app.use('/uploads', express.static("uploads"));

// 🖼️ إعداد القوالب
app.set("view engine", "ejs");

// 🔄 LiveReload للإعادة التلقائية
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// 📦 Routes
const birds = require("./routes/birds");
const birds2 = require("./routes/addroute");
app.use(birds);
app.use(birds2);
