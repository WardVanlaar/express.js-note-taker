const fs = require("fs");
const { createNewNote, validateNote } = require("../lib/notes.js");
const { notes } = require("../data/notes");

jest.mock("fs");

test("creates a note object", () => {
  const note = createNewNote({ name: "Test", id: "jhgdja3ng2" }, notes);

  expect(note.name).toBe("Test");
  expect(note.id).toBe("jhgdja3ng2");
});

test("validates note", () => {
  const note = {
    title: "Test1",
    text: "Text1",
  };

  const invalidNote = {
    title: "Test2",
    text: "",
  };

  const result = validateNote(note);
  const result2 = validateNote(invalidNote);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
