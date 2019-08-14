module.exports = function(app) {

    app.get("/", function(req, res) {
        res.render("home");
    });

    app.get("/reviews", function(req, res) {
        res.render("reviews");
    });

    app.get("/reviews/:id", function(req, res) {
        res.render("article");
    });

    app.get("/school", function(req, res){
        res.render("lectures");
    });
}