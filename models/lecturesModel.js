const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let LectureSchema = new Schema ({
    Id: {
        type: Number,
    },

    title: {
        type: String
    },

    subtitle: {
        type: String
    },

    type: {
        type: String
    },

    text: {
        type: String
    }
});

let Lecture = mongoose.model("Lecture", LectureSchema);

module.exports = Lecture;