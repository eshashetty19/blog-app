import express from "express";
import bodyParser from "body-parser";

let posts = [
    {
        id: 1,
        title: "My First Post",
        content: "This is first blog post. Excited to start blogging!",
        date: new Date()
    },
    {
        id: 2,
        title: "Second Post",
        content: "Here is another post to test the blog application.",
        date: new Date()
    }
];

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs",{ pos: posts});
});

app.get("/new", (req,res) => {
    res.render("new.ejs");
});

app.post("/new",(req,res)=>{
    
    const newPost = {
        id: posts.length + 1,
        title: req.body['title'], //req.body.title
        content: req.body['content'], //req.body.content
        date: new Date()
    };
    posts.push(newPost);
    res.redirect("/");
});

app.get("/edit/:id", (req,res) => {
    const postId = parseInt(req.params.id); //req.params.id gets the route parameters if i it fetches it as 1 similar to req.body
    //we convert into integer because its in the form of string but when comparing we need to compare with integer otherwise even if they are equal it gives false
    // Find the post with the matching id
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        res.render("edit.ejs", { post: post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.post("/edit/:id", (req,res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if(post){
        post.title = req.body.title;
        post.content=req.body.content;
        
    }
   res.redirect("/");
});

app.post("/delete/:id", (req,res) => {
 const postId = parseInt(req.params.id);
 const post=posts.find(p => p.id === postId);
 if(post){
        posts = posts.filter(p => p.id !== postId);
 }
 res.redirect("/");
});

app.listen(port, ()=> {
    console.log("Server is running on port " +port);
});