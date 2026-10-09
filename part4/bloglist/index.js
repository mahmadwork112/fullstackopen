const express = require("express");
const mongoose = require("mongoose");

const app = express();

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl =
  "mongodb+srv://mahmadsiddiqui111_db_user:WtWBkXRtAX2jTXmc@bloglist.ocmhcjs.mongodb.net/?appName=bloglist";

mongoose.connect(mongoUrl, { family: 4 });

app.use(express.json());

// routes
app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => response.json(blogs));
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => response.status(201).json(result));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
