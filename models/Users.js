const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new Schema ({
    username: {
        type: String
    },

    password: {
        type:String
    }
});

// UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", UserSchema);

module.exports = User;