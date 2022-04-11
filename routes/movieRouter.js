const express = require("express");
const movieCont = require("../controllers/movies");

const appCon = require("../controllers/application_coontoller");
const proCont = require("../controllers/users.js");
const seC = require("../routes/securityRoute");
const router = express.Router();

router
  .route("/movies")
  .get(movieCont.getPosts)
  .post(seC.secureRoute, movieCont.createPost);

router
  .route("/movies/:id")
  .get(movieCont.likePost)
  .put(seC.secureRoute, movieCont.updatePost)
  .delete(seC.secureRoute, movieCont.deletePost);
router.route("/register").post(appCon.registerUser);

router.route("/login").post(appCon.loginUser);

router.route("/profile").get(seC.secureRoute, movieCont.getUserProfile);

module.exports = router;
