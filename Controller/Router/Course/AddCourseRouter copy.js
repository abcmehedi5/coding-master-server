const express = require("express");
const course = require("../../../Model/Course/AddCourseModel");
const router = express.Router();
const imgbbUploader = require("imgbb-uploader");
const CloudinaryUpload = require("../Student/FileUpload/CloudinaryImages");
const fs = require("fs-extra");

router.post("/addCourse", CloudinaryUpload.single("img"), (req, res) => {
  imgbbUploader("31b54c6a5b6657ab6db6355e8de99eba", `${req.file.path}`)
    .then((response) => {
      const url = response.url;
      const newAddCourse = new course({
        courseName: req.body.courseName,
        img: url,
        coursePrice: req.body.coursePrice,
        courseDescription: req.body.courseDescription,
      });

      // send to database
      course.save((err) => {
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

// router.post("/addCourse",CloudinaryUpload.single("img"),(req , res) =>{
//     imgbbUploader("31b54c6a5b6657ab6db6355e8de99eba", `${req.file.path}`)
// })

// router.post("/addCourse",(req , res) =>{

//     console.log(req.body);
//     // const newAddCourse = new course({
//     //     courseName: req.body.courseName,
//     //     // img: url,
//     //     coursePrice: req.body.coursePrice,
//     //     courseDescription: req.body.courseDescription,
//     //   });
//     //   console.log(newAddCourse);
// })

// router.post("/addCourse", (req, res) => {
//   console.log(req.body);
// });

module.exports = router;
