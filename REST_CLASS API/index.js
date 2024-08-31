const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Setting EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "apnacollege",
    content: "I love coding",
  },
  {
    id: uuidv4(),
    username: "lalit kr",
    content: "Hard work is important for success",
  },
  {
    id: uuidv4(),
    username: "manmeet",
    content: "I got selected for my 1st internship",
  },
];

// Route to render the posts
app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

// Serve the form
app.get("/posts/new", (req, res) => {
  res.render("new");
});

// Add a new post
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// Show a specific post
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// Edit form for a specific post
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// Update a post's content
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

app.delete("/posts/:id",(req,res) =>{
  let { id } = req.params;

  posts = posts.filter((p) => id !== p.id);
  //res.send("delete sucess");
  res.redirect("/posts");
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
