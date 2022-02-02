const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require("./data/notes");

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(
      (note) => note.title === query.title
    );
  }
  return filteredResults;
}

// "text" to be replaced with ID once ID is created!
function findById(text, notesArray) {
    const result = notesArray.filter(note => note.text === text)[0];
    return result;
  }

app.get("/api/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// "text" to be replaced with ID once ID is created!
app.get("/api/notes/:text", (req, res) => {
  const result = findById(req.params.text, notes);
  res.json(result);
});

app.listen(PORT, () => {
  console.log("API server now on port 3001!");
});
