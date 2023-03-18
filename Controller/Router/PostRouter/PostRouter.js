const express = require("express");
const post = require("../../../Model/Post/PostModel");
const router = express.Router();
const CloudinaryUpload = require("../Student/FileUpload/CloudinaryImages");
const imgbbUploader = require("imgbb-uploader");
const fs = require("fs-extra");

router.post("/WritePost", CloudinaryUpload.single("img"), (req, res) => {
  imgbbUploader("31b54c6a5b6657ab6db6355e8de99eba", `${req.file.path}`)
    .then((response) => {
      const url = response.url;
      const newPost = new post({
        post: req.body.post,
        img: url,
        email: req.body.email,
        name: req.body.name,
        date: req.body.date,
        profileImg: req.body.profileImg,
      });
      // send to database
      newPost.save((err) => {
        if (err) {
          // local computer img remove
          fs.remove(req.file.path, (errs) => {
            if (errs) {
              res.status(500).json({
                Rerror: "images remove faild",
              });
            }
          });

          res.status(500).json({
            error: "thare was a server side error ",
          });
        } else {
          // local computer img remove
          fs.remove(req.file.path, (errs) => {
            if (errs) {
              res.status(500).json({
                Rerror: "images remove faild",
              });
            }
          });
          res.status(200).json({
            message: "post upload successful",
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
});



// get post

router.get("/allpost", (req, res) => {
  post.find((err, data) => {
    if (err) {
      res.status(500).json({
        error: "thare was a server side errro",
      });
    } else {
      res.json(data);
    }
  });
});
module.exports = router;
