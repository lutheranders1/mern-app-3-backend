const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user.models");
const logger = require("morgan");
const appController = require("./controllers/application_coontoller");
const cors = require("cors");
require("dotenv").config();

const moviesRoutes = require("./routes/movieRouter");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api", moviesRoutes);

// enable cors for all routes
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, User-Email, Auth-Token, Authorization"
  );
  next();
});

// serve everything in assets folder as static, so we can get our single html page
app.use(express.static("public"));

// unprotected root route
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "hello" });
// });
app.use((_req, res) => {
  res.status(404).json({ message: `Route not found` });
});

const PORT = "5000";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || "5000", () =>
      console.log(`server running on port: ${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
