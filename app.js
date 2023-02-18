const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const port = 8000;

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItem = [];

app.set("view engine", "ejs");
app.set(__dirname + "/views");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){

    // let day = date.getDate();
    let day = date.getDay();

    res.render("list", {
        listTitle: day,
        newListItems: items
    })


});

app.post("/", function(req, res){

    let item = req.body.newInput;

    if(req.body.list === "Work List"){
        workItem.push(item);
        return res.redirect("/work")

    }
    else{
        items.push(item);
        return res.redirect("/");
    }

});

app.get("/work", function(req, res){
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItem
    })
});

// app.post("/work", function(req, res){

//     var item = req.body.newInput;
//     workItem.push(item);

//     return res.redirect("/");
// });

app.listen(port, function(err){
    if(err){
        console.log("Error while running the server");
    }
    else{
        console.log("The server is up and running on the port: ", port)
    }
})