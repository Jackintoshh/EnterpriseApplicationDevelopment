const express = require("express");

const router = express.Router();
const Post = require('../models/post');
const checkAuth = require("../middleware/checkauth");

router.post("", checkAuth, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then(result => {
    console.log(result);
    console.log(post);
    res.status(201).json({
    message: 'Post added',
    postID: result._id
  });
  });

});

router.put("/:id", checkAuth, (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful"});
  });
});

//qZszPYF1t6h5jFqm

router.get("",(req, res, next) => {
  /*const posts = [
    { id: 'awdawdad', title: 'Server side post', content: 'This is from the server'},
    { id: 'qwdqdqd', title: 'Second servr side post', content: 'Also from the server'}
  ];*/

  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Posts fetch success',
      posts: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    }else {
      res.status(404).json({message: 'Post Not Found'});
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  //console.log(req.params._id);
  Post.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted"});
  });

});

module.exports = router;
