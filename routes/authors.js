const express = require("express");
const Author = require("../models/author");
const router = express.Router();

// All Authors Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch (error) {
    console.log(error);
  }
});

// New Authors Route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create Authors Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch (error) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }

  //   res.send(req.body.name);
});

module.exports = router;
