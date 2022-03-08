
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const { send } = require("process");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser: true});
const articleSchema = {
    title:String,
    content:String
};
const Article = mongoose.model("Article",articleSchema);

app.get("/articles",function(req,res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        }
        res.send(err);   
    });
});

app.post("/articles",function(req,res){
    
    const newArticle = new Article({
        title: req.query.title,
        content: req.query.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Successfully added a new article")
        }
        else{
            res.send("chombu");
        }
    });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});