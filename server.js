const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/qldb"

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}));

// app.use(passport.initialize());
// app.use(passport.session());

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});


// Routes
require("./routes/api")(app);
require("./routes/html")(app);

app.listen(PORT, () => {
    console.log("Listening in on " + PORT);
});
