module.exports = function(app) {
    var mongojs = require("mongojs");
    const mongoose = require("mongoose");

    var databaseUrl = "qldb";
    var collections = ["reviews", "lectures"]

    var db = require("../models");

    app.get("/all", function(req, res){
        db.Review.find({})
        .then(function(dbReview){
            res.json(dbReview);
        }).catch(function(err){
            res.json(err);
        });
    })

    app.get("/all/:type", function(req,res){
        db.Review.find({type: req.params.type})
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