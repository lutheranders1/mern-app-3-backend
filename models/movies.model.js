const mongoose = require("mongoose");
const User = require("./user.models");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  year: String,
  director: String,
  review: String,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    //required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

movieSchema.set("toJSON", { virtuals: true });
movieSchema.plugin(uniqueValidator);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
