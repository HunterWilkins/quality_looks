module.exports = function(app) {
    var mongojs = require("mongojs");
    const mongoose = require("mongoose");
    const bcrypt = require("bcryptjs");


    var databaseUrl = "qldb";
    var collections = ["reviews"]

    var db = require("../models");
    var auth = require("../controllers/Auth");

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

    app.post("/submit", async (req, res) => {
        if (req.body.username != ""){
            try {
                let user = await db.User.findOne({username: req.body.username}).exec();
                if (!user) {
                    return res.status(400).send({message: "HA! Nice try, HACKERS!"});
                }
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(400).send({message: "HA! IN YOUR FACE!"});
                }
                else {
                    console.log("Welcome back, handsome. ;3 Let's add that review.");
                    db.Review.create(req.body.reviewInfo)
                    .then(function(dbReview) {
                        res.json(dbReview);
                    }).catch(function(err){
                        res.json(err);
                    });
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
            
        }
        else {
            alert("YOU DIDN'T ADD A TITLE, IDIOT!");
        }
    });

    app.post("/register", async (req, res) => {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            db.User.create(req.body)
            .then(function(dbUser) {
                res.json(dbUser);
            }).catch(function(err){
                res.json(err);
            })
            // let user = new db.User(req.body);
            // let result = await user.save();
            // res.send("result");
    })
    app.post("/login", async (req, res) => {
        
    });


}