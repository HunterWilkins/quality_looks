module.exports = function(app) {
    var db = require("../models");


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

    app.get("*", function(req, res) {
        res.render("home");
    });
}