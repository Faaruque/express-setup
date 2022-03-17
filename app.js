// external imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");

//internal imports
// const route = require("./router");

app = express();

// middlware array
const middlware = [
  morgan("dev"),
  express.urlencoded({ extended: true }),
  express.json(),
  express.static("public"),
];
app.use(middlware);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// set view engine
app.set("view engine", "ejs");

// router handle
app.get("/", (req, res) => {
  res.status(201).json({
    message: "Home Route",
  });
});

// 404 not found error handle
app.get("*", (req, res) => {
  res.send("<h1> 404 Not Found</h1>");
});

// Data-base connect
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database Connected Succesfully`);
  })
  .catch((e) => {
    console.log(e);
  });

// server setup
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on PORT - ${process.env.PORT}`);
});
