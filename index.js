var express = require("express");
var multer = require("multer");
const fs = require("fs");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log("ahihi");
    console.log(file);
    if (file.mimetype === "image/jpeg") {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    }
    if (file.mimetype === "image/png") {
      cb(null, file.fieldname + "-" + Date.now() + ".png");
    }
    return;
  },
});

var upload = multer({ storage: storage });
const path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.post("/profile", upload.single("avatar"), function (req, res, next) {
  const file = req.file;
  console.log(file);
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  //   res.contentType("image/jpeg");
  // res.sendFile(path.join(__dirname + `/uploads/${file.filename}.jpg`));
  res.send(file.filename + "");
});
app.get("/ahihi/:img", (req, res) => {
  console.log(req.params);
  res.sendFile(path.join(__dirname + `/uploads/${req.params.img}.jpg`));
});

app.listen(80);
