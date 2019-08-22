const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let Schema = mongoose.Schema;

let UserSchema = new Schema ({
    username: {
        type: String
    },

    password: {
        type:String
    }
});

// UserSchema.plugin(passportLocalMongoose);

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

let User = mongoose.model("User", UserSchema);

module.exports = User;