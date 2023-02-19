const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js")
const port = 8000;

const mongoose = require("./config/mongoose");
const list = require("./model/item")

const app = express();


app.set("view engine", "ejs");
app.set(__dirname + "/views");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){

    // let day = date.getDate();
    // let day = date.getDay();

    list.find({}, (err, items) => {
        if(err){
            console.log("Error in fetching item from db");
            return;
        }

        res.render("list", {
            listTitle: "Today",
            newListItems: items
        })
    })

});

app.post("/", function(req, res){

    let item = req.body.newInput;

    list.create({
        name: req.body.newInput
    }, (err, newItem) => {
        if(err){
            console.log("error in creating a itme!");
            return;
        }
        // console.log("**********", newItem);
        return res.redirect("/")

    })

    // if(req.body.list === "Work List"){
    //     workItem.push(item);
    //     return res.redirect("/work")

    // }
    // else{
    //     items.push(item);
    //     return res.redirect("/");
    // }

});

app.get("/", function(req, res){
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
app.post("/delete", (req, res) => {

    // console.log(req.body.checkbox)
    list.findByIdAndDelete(req.body.checkbox, (err) => {
        if(err){
            console.log("error in deleting an item!");
            return;
        }
        return res.redirect("/");
    })
})


app.listen(port, function(err){
    if(err){
        console.log("Error while running the server");
    }
    else{
        console.log("The server is up and running on the port: ", port)
    }
})