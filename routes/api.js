module.exports = function(app) {
    const bcrypt = require("bcryptjs");
    var db = require("../models");

    const passport = require("passport");
    const LocalStrategy = require("passport-local").Strategy;

    passport.use(new LocalStrategy(function(username, password, done){
        db.User.findOne({username})
        .then(user => {
            if (!user || !user.validatePassword(password)) {
                done(null, false, {message: "Ha! Nice try, hackers!"});
            }

            else {
                done(null, user);
            }
        }).catch(e => done(e));
    }));

    const loggedInOnly = (req, res, next) => {
        if (req.isAuthenticated()) next();
        else {
            res.redirect("/devtool");
        }
    }

    const loggedOutOnly = (req, res, next) => {
        if (req.isUnauthenticated()) next();
        else res.redirect("/");
    }

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
    app.post("/submit", async (req, res) => {
        if (req.body.reviewInfo.title != ""){
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
                console.log(error);
            }
        }
    });

    app.post("/update", async (req, res) => {
        if (req.body.title != ""){
            try {
                let user = await db.User.findOne({username: req.body.username}).exec();
                if (!user || !bcrypt.compareSync(req.body.password, user.password)) { // If the username or password doesn't match up, prevent entry.
                    console.log("HA! No thanks, HACKERS!");
                }
                else {
                    console.log("Made a mistake, did we? Well, we can't have that, now can we? ;3"); // Uhhhhhhhhh... don't read into this either.
                    let newData = req.body.reviewInfo;
                    let filter = {title: req.body.title};
                    let update = {
                        subtitle: newData.subtitle,
                        text: newData.text,
                        score: newData.score,
                        type: newData.type
                    }
                    
                    db.Review.findOneAndUpdate(filter, update).exec();
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    });

    app.post("/delete", async (req, res) => {
        if (req.body.title != ""){
            try {
                let user = await db.User.findOne({username: req.body.username}).exec();
                if (!user || !bcrypt.compareSync(req.body.password, user.password)) { // If the username or password doesn't match up, prevent entry.
                    return res.status(400).send({message: "HA! Nice try, HACKERS!"});
                }
                else {
                    console.log("Ohhhh nooOOOOoo...you want to delete something?" + 
                        "That must make you feel *teeeerrribleee*...is there aaaanything I" +
                        " can doooo to make you feel better? Aaaaaaaaaannnyyyyythhhiiinnng???? ;3 <3"); // Um...yeah, I'm sorry.
                    db.Review.findOneAndDelete({title: req.body.title}).exec();
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    });

    // Create New User *** ONLY TO BE USED ONCE: DELETE/COMMENT OUT IMMEDIATELY AFTER CREATING AUTH USER ***
    // app.post("/register", function (req, res) {
    //     req.body.password = bcrypt.hashSync(req.body.password, 10);
    //     db.User.create(req.body)
    //     .then(function(dbUser) {
    //         res.json(dbUser);
    //     }).catch(function(err){
    //         res.json(err);
    //     });
    // });
}