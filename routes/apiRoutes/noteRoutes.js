const router = require("express").Router();
const { createNewNote, validateNote } = require("../../lib/notes");
const { notes } = require("../../data/notes");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

// delete notes -- code adapted from https://github.com/nicolewallace09/note-taker
router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  let note;

  notes.map((element, index) => {
    if (element.id == id) {
      note = element;
      notes.splice(index, 1);
      return res.json(note);
    }
  });
});

module.exports = router;
