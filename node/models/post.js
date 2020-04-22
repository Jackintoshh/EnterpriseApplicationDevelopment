const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, default: "Hello"},
  content: { type: String, default: "Hello"},
  //user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model('PostModel', postSchema);
