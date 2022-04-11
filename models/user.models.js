const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Movie = require("./movies.model");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: false, maxlength: 30 },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
});

userSchema.virtual("createdMovies", {
  ref: "Movie", //Model this relates to
  localField: "_id", //Field from user model stored on movie model
  foreignField: "owner", //Field on the movie that stores the user id
});

userSchema.set("toJSON", {
  virtuals: true,
  transform(_doc, json) {
    delete json.password;
    return json;
  },
});

userSchema.virtual("passwordConfirmation").set(function (passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
});
//Custom pre validation
userSchema.pre("validate", function (next) {
  if (
    this.isModified("password") &&
    this.password !== this._passwordConfirmation
  ) {
    this.invalidate("passwordConfirmation", "Passwords do not match");
  }
  next();
});

//Custom pre save
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  }
  next();
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

module.exports = User;
