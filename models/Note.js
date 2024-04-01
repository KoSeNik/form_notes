const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  fio: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  descriptionProblem: {
    type: String,
    require: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
