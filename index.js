var express = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const path = require("path");
var app = express();
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.post("/profile", upload.single("avatar"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log("post file");
  res.send("Done");
});

app.listen(80);
