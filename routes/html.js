module.exports = function(app) {

    app.get("/", function(req, res) {
        res.render("home");
    });

    app.get("/reviews/:id", function(req, res) {
        res.render("reviews");
    });

    app.get("/school", function(req, res){
        res.render("lectures");
    });

    app.get("/essay/:id", function(req, res){
        res.render("article");
    })
}