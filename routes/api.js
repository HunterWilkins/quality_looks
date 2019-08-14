module.exports = function(app) {
    var mongojs = require("mongojs");
    const mongoose = require("mongoose");

    var databaseUrl = "qldb";
    var collections = ["reviews", "lectures"]

    var db = require("../models");
    
    app.get("/all", function(req,res){
        db.Review.find({})
        .then(function(dbReview){
            res.json(dbReview);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.get("/lectures", function(req,res) {
        db.Lecture.find({})
        .then(function(dbLecture){
            res.json(dbLecture);
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
            if (req.body.type === "lecture") {
                db.Lecture.create(req.body)
                .then(function(dbLecture){
                    res.json(dbLecture);
                }).catch(function(err){
                    res.json(err);
                });
            }

            else {
                db.Review.create(req.body)
                .then(function(dbReview) {
                    res.json(dbReview);
                }).catch(function(err){
                    res.json(err);
                });
            }
            
        }
        else {
            alert("YOU DIDN'T ADD A TITLE, IDIOT!");
        }
    });
}