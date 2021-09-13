const express = require("express");
const router = express.Router();
const Note = require("../models/note");

router
  .route("/")
  .post(async (req, res) => {
    // creating a note

    const title = req.body.title;
    const content = req.body.content;

    try {
      note = new Note({
        title: title,
        content: content,
      });

      await note.save();

      let notes = await Note.find({}).select("-__v");
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  })
  .get(async (req, res) => {
    //   return notes
    try {
      let notes = await Note.find({}).select("-__v");
      res.json(notes);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server error");
    }
  })
  .delete(async (req, res) => {
    const id = req.body.id;
    try {
      Note.findOneAndDelete({ _id: id }, function (err, docs) {
        if (err) {
          console.log(err);
        }
      });

      let notes = await Note.find({}).select("-__v");
      res.json(notes);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server error");
    }
  });

module.exports = router;
