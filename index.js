var express = require("express");
var multer = require("multer");
const fs = require("fs");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
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
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.contentType("image/jpeg");
  res.send(fs.readFileSync(req.file.path));
});
app.get("/ahihi", (req, res) => {
  res.sendFile(path.join(__dirname + "/uploads/ccc.jpg"));
});

app.listen(80);
