const User = require("../models/user.models");

const jwt = require("jsonwebtoken");
secret = "secret";
//Post /register
//registers a user
const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log(newUser);
    return res.status(202).json({ message: `Welcome ${newUser.username}` });
  } catch (err) {
    console.log(err);
    return res.status(422).json(err);
  }
};

//Post /login
//logs in a user
const loginUser = async (req, res) => {
  try {
    const userToLogin = await User.findOne({ username: req.body.username });
    console.log("USER ->", userToLogin);
    //Checks if password matches hashed password
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Error();
    }
    //Sends token to user
    const token = jwt.sign({ sub: userToLogin._id }, secret, {
      expiresIn: "7 days",
    });

    return res
      .status(200)
      .json({ message: `Welcome back ${userToLogin.username}`, token: token });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: "Unauthorised" });
  }
};

module.exports = { loginUser, registerUser };
