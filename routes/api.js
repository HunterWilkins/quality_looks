module.exports = function(app) {
    var mongojs = require("mongojs");
    const mongoose = require("mongoose");

    var databaseUrl = "qldb";
    var collections = ["reviews", "comments"]

    var db = require("../models");
    
    app.get("/all", function(req,res){
        db.Review.find({})
        .then(function(dbReview){
            res.json(dbReview);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.get("/article/:id", function(req, res) {
        db.Review.find({
            "Id": req.params.id
        })
        .then(function(dbReview) {
            res.json(dbReview);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.post("/submit", function(req, res) {
        if (req.body.title != ""){
            console.log(req.body);

            db.Review.create(req.body)
            .then(function(dbReview) {
                res.json(dbReview);
            }).catch(function(err){
                res.json(err);
            });
        }
        else {
            alert("YOU DIDN'T ADD A TITLE, IDIOT!");
        }
    });
}