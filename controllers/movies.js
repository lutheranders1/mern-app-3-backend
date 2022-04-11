const mongoose = require("mongoose");
const Movie = require("../models/movies.model");
const User = require("../models/user.models");

const getPosts = async (req, res) => {
  try {
    const movie = await Movie.find();
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    // console.log(req.body)
    // console.log(owner req.currentUser._id)
    const newMovie = { ...req.body, owner: req.currentUser._id };
    const movieToAdd = await Movie.create(newMovie);
    return res.status(201).json(movieToAdd);
  } catch (err) {
    console.log(err);
    return res.status(422).json(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndUpdate(id, req.body);
    const updatedMovie = await Movie.findById(id);
    return res.status(202).json(updatedMovie);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Not Found" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const movieToDelete = await Movie.findById(id);
    if (!movieToDelete) throw new Error();
    if (!movieToDelete.owner.equals(req.currentUser._id)) throw new Error();
    await movieToDelete.remove();
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Not Found" });
  }
};

///Get One Movie///
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("owner");
    // console.log(movie)
    if (!movie) throw new Error();
    return res.status(200).json(movie);
  } catch (err) {
    console.log(`Movie not found`);
    console.log(err);
    return res.status(404).json({ message: "Movie Not Found" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await (
      await User.findById(req.currentUser._id)
    ).populate("createdMovies");
    if (!user) throw new Error();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Not Found" });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getUserProfile,
};
