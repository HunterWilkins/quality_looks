const mongoose = require("mongoose");
const passport = require("passport");
let User = require("../models/Users");

let userController = {};

userController.doLogin = function(req, res) {
    passport.authenticate("local")(req, res, function() {
        res.redirect("/");
    });
}

module.exports = userController;;