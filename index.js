import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async(req,res) => {
    const result = await db.query("SELECT * FROM posts ORDER BY id ASC");
    const posts = result.rows;
    res.render("index.ejs",{ pos: posts});
});

app.get("/new", (req,res) => {
    res.render("new.ejs");
});

app.post("/new", async(req,res)=>{
    const title= req.body['title'];//req.body.title
    const content= req.body['content']; //req.body.content
    const date= new Date();
    await db.query("INSERT INTO posts (title, content, date) VALUES($1, $2, $3)",[title, content, date])
    res.redirect("/");
});

app.get("/edit/:id", async(req,res) => {
    try{
    const postId = parseInt(req.params.id); //req.params.id gets the route parameters if i it fetches it as 1 similar to req.body
    //we convert into integer because its in the form of string but when comparing we need to compare with integer otherwise even if they are equal it gives false
    // Find the post with the matching id
    const result = await db.query("SELECT * FROM POSTS WHERE id=$1", [postId]);
    const post = result.rows[0];
   if(post){
     res.render("edit.ejs", { post: post });
   }else{
    res.status(404).send("Post not found");
   }
    
    } catch(error) {
        console.log(err);
    }
}
);

app.post("/edit/:id", async(req,res) => {
    try{
    const postId = parseInt(req.params.id);
    const {title, content} = req.body;
    const date = new Date();
     await db.query("UPDATE posts SET title = $1, content = $2, date = $3 WHERE id = $4",[title, content, date, postId]);

   res.redirect("/");
    }
    catch(err){
        console.log(err);
    }
});

app.post("/delete/:id", async(req,res) => {
try{
 const postId = parseInt(req.params.id);
 const result = await db.query("DELETE FROM posts WHERE id = $1", [postId]);
 res.redirect("/");
}
catch(err){
    console.log(err);
}
});

app.listen(port, ()=> {
    console.log("Server is running on port " +port);
});