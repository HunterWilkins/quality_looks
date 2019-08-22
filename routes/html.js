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

    
    app.get("/pig/:user/:id", async (req, res) => {
      
        try {
            let user = await db.User.find({secretName: req.params.user}).exec();
            console.log(user);
            if ( !user || !bcrypt.compareSync(req.params.id, user[0].secretId)){
                res.render("home");
            }
            else {
                res.render("devtool");
            }
        }

        catch(err) {
            console.log(err)
        }
       
        
    })


    app.get("/devtool", function(req, res){
        res.render("devtool");
    })

    app.get("*", function(req, res) {
        res.render("home");
    });
}