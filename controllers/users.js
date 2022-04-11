const User = require("../models/user.models");

const getUserProfile = async (req, res) => {
  try {
    const user = await (
      await User.findById(req.currentUser._id)
    ).populate("postedBy");
    if (!user) throw new Error();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Not Found" });
  }
};

module.exports = { getUserProfile };
