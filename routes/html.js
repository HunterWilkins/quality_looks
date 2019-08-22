module.exports = function(app) {
    var db = require("../models");
    const bcrypt = require("bcryptjs");


    app.get("/", function(req, res) {
        res.render("home");
    });

    app.get("/reviews/:id", async(req, res) => {
        let reviews = await db.Review.find({type: req.params.id}).exec();
        if (reviews[0] !== undefined) {
            res.render("reviews");
        }
        else {
            res.render("catch");
        }
    });

    app.get("/essay/:id", async(req, res) => {
        let reviews = await db.Review.find({Id: req.params.id}).exec();
        if (reviews[0] !== undefined) {
            res.render("article");
        }
        else {
            res.render("home");
        }
    });

    
    app.get("/login", function (req, res) {
        res.render("devtool");
    });


    app.get("/devtool", function(req, res){
        res.render("devtool");
    })

    app.get("*", function(req, res) {
        res.render("home");
    });
}