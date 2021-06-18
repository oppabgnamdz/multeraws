var express = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.post("/profile", upload.single("avatar"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log("post file");
  res.send("Done");
});
app.get("/ahihi", (req, res) => {
  res.sendFile(path.join(__dirname + "/uploads/ccc.jpg"));
});

app.listen(8000);
