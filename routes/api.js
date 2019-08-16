module.exports = function(app) {
    const bcrypt = require("bcryptjs");
    var db = require("../models");

    app.get("/all", function(req, res){
        db.Review.find({})
        .then(function(dbReview){
            res.json(dbReview);
        }).catch(function(err){
            res.json(err);
        });
    });

    // Displays all relevant reviews based on the href. =/=/=/=/=/=/=/ 
    // Currently only two types: Art and Lecture. 
    app.get("/all/:type", function(req,res){
        db.Review.find({type: req.params.type})
        .then(function(dbReview){
            res.json(dbReview);
        }).catch(function(err){
            res.json(err);
        });
    });
    // =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

    // Displays the relevant article accessed by clicking the .review divs in reviews.handlebars =/=/=/=/=/
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
    // =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

    // New Review Submission Route
    app.post("/submit", async function(req, res) {
        if (req.body.username != ""){
            try {
                let user = await db.User.findOne({username: req.body.username}).exec();
                if (!user || !bcrypt.compareSync(req.body.password, user.password)) { // If the username or password doesn't match up, prevent entry.
                    return res.status(400).send({message: "HA! Nice try, HACKERS!"});
                }
                else {
                    console.log("Welcome back, handsome. ;3 Let's add that review, shall we? *mwah*"); // Uhhhhhhhhh don't read into this
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
    });

    // Create New User *** ONLY TO BE USED ONCE: DELETE/COMMENT OUT IMMEDIATELY AFTER CREATING AUTH USER ***
    app.post("/register", async (req, res) => {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        db.User.create(req.body)
        .then(function(dbUser) {
            res.json(dbUser);
        }).catch(function(err){
            res.json(err);
        });
    });
}