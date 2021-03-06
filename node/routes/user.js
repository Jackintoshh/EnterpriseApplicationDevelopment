const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User successfully added',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });

});

router.post("/login", (req, res, next) => {
  let fetchUser;
  User.findOne({ email: req.body.email}).then(user => {
    if(!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      return res.status(401).json({
      message: "Auth failed"
      });
    }
    const token = jwt.sign({email: fetchUser.email, userID: fetchUser._id}, 'secretstring', { expiresIn: "1h"});
    res.status(200).json({
      token: token
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    });
  });
});

module.exports = router;
