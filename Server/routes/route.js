const { Router } = require("express");
const { Error } = require("mongoose");
const Post = require("../server side/models/post");
const route = Router();
const axios = require("axios");

//read
route.get("/api/New", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(403).json({ message: error });
  }
});

route.get("/api/New/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await Post.findById(id);
    res.json(posts);
  } catch (error) {
    res.status(403).json({ message: error });
  }
});

// Create
route.post("/api/New", async (req, res) => {
  const exist = {
    RollNumber: req.body.RollNumber,
  };
  const stdData = await Post.findOne(exist);
  if (!stdData) {
    const post = new Post({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      RollNumber: req.body.RollNumber,
      Email: req.body.Email,
    });
    try {
      const p = await post.save();
      res.json(p);
    } catch (error) {
      res.status(403).json({ message: error });
    }
  } else {
    res.json({ message: "Student Already Exist" });
    // throw new Error("User Already Exist");
  }
});

// Update
route.patch("/api/New/:id", async (req, res) => {
  const id = req.params.id;
  const post = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    RollNumber: req.body.RollNumber,
    Email: req.body.Email,
  };
  try {
    await Post.findByIdAndUpdate(id, post);
    res.json({ message: "Post Update Seccess Fully" });
  } catch (error) {
    res.status(403).json({ message: error });
  }
});

// Delete
route.delete("/api/New/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Post.findByIdAndDelete(id);
    return res.json({ message: "Post Delete Seccess Fully" });
  } catch (error) {
    res.status(403).json({ message: error });
  }
});

module.exports = route;
