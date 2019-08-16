const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ReviewSchema = new Schema ({
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

    score: {
        type: Number
    },

    text: {
        type: String
    }
});

let Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;