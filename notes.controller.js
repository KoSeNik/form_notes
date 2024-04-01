const chalk = require("chalk");
const Note = require("./models/Note");

async function addNote(fio, phoneNumber, descriptionProblem) {
  await Note.create({ fio, phoneNumber, descriptionProblem });

  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await Note.find();

  return notes;
}

module.exports = {
  addNote,
  getNotes,
};
