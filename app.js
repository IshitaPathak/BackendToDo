const express = require("express");
const bodyParser = require("body-parser");
let Items = ["Book Food", "Cook Food", "Eat Food"];
let workItems = [];
const app = express();

app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday : "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("list", { listTitle : day,newListItems: Items });
});

//code that handles the post request in home route
app.post("/", function(req,res){
    var Item = req.body.newItem;
    Items.push(Item);
    console.log(Item);
    // res.render("list", {newListItem: Item});
    res.redirect("/");
})

app.get("/work", function(req,res){
    res.render("list",{listTitle:"Work List",newListItems:workItems});
});

app.post("/work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})
app.listen(3000, function () {
    console.log("server started on port 3000 ");
});