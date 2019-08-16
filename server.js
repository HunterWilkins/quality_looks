const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
let PORT = process.env.PORT || 3000;
const app = express();
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/qldb"

// Express =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

// Handlebars Info =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
// =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

// Routes =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
require("./routes/api")(app);
require("./routes/html")(app);
// =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

app.listen(PORT, () => {
    console.log("Listening in on " + PORT);
});
