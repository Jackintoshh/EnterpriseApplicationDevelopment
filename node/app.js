const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');
const postsRoutes = require("./routes/posts")
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect("mongodb+srv://jack:qZszPYF1t6h5jFqm@cluster0-fiqxk.mongodb.net/node-angular?retryWrites=true&w=majority").then(() => {
  console.log('Connected to mongo!');
})
.catch(() => {
  console.log('Could not connect to mongo');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);



module.exports = app;
