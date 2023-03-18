const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    lastActiveAt: true,
  },
  name: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    required: true,
  },
});

const post = new mongoose.model("post", postSchema);
module.exports = post;
