const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    id:String,
    taskName: String,
    Aboutthetask: String,
    image: String
});


const Note = mongoose.model("Note", noteSchema);

module.exports = Note;