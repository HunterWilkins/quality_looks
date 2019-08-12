module.exports = function(app) {
    var mongojs = require("mongojs");

    var databaseUrl = "qldb";
    var collections = ["reviews", "comments"]

    var db = mongojs(databaseUrl, collections);

    db.on("error", function(error) {
        console.log("Mongo Database Error: ", error);
    });
    
    app.get("/all", function(req,res){
        db.reviews.find({}, function(error, found){
            if (error) {
                console.log(error);
            }

            else {
                res.json(found);
            }
        });
    });

    app.get("/article/:id", function(req, res) {
        db.reviews.find({
            "Id": req.params.id
        }, function(error, found) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(found);
            }
        });
    });

    app.post("/submit", function(req, res) {
        if (req.body.title != ""){
            console.log(req.body);

            db.reviews.insert(req.body, function(error, saved) {
                if (error) {
                    console.log(error);
                }
                else {
                    res.send(saved);
                }
            });
        }
        else {
            alert("YOU DIDN'T ADD A TITLE, IDIOT!");
        }
    });
}