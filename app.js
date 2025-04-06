const express = require("express");
const app = express();
const port = process.env.PORT || 15000;
const mongoose = require("mongoose");
const birds = require("./routes/birds");
const birds2 = require("./routes/addroute");

// require
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// cookie-parser هذا علشان نجيب cookies من المتصفح حقنا هذه يعني اعدادات نزلتها
var cookieParser = require("cookie-parser");
app.use(cookieParser());

//  هذا الكود يعمل على تحديث الصفحه تلقائي بدون مانعمل refresh للصفحه
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

mongoose
  .connect(
    "mongodb+srv://alaa1:774460081@cluster0.msyyhxg.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })

  .catch((err) => {
    console.log(err);
  });

app.use(birds);
app.use(birds2);
