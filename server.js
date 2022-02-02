const fs = require("fs");
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { notes } = require("./data/notes");

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(
      (note) => note.title === query.title
    );
  }
  if (query.text) {
    filteredResults = filteredResults.filter(
      (note) => note.text === query.text
    );
  }
  return filteredResults;
}

function findById(id, notesArray) {
  const result = notesArray.filter((note) => note.id === id)[0];
  return result;
}

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./data/notes.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return note;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
}

app.get("/api/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get("/api/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  res.json(result);
});

app.post("/api/notes", (req, res) => {
  req.body.id = notes.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

app.listen(PORT, () => {
  console.log("API server now on port 3001!");
});
