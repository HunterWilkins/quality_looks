const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// Routes
require("./routes/api")(app);
require("./routes/html")(app);

app.listen(PORT, () => {
    console.log("Listening in on " + PORT);
});
