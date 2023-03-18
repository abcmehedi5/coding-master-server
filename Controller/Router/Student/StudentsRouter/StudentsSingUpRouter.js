const mongoose = require("mongoose");
const express = require("express");
const student = require("../../../../Model/Student/StudentSingupModel/StudentSingupModel");
const uplaod = require("../FileUpload/SingupImg");
const router = express.Router();
const path = require("path");
const fs = require("fs-extra");
const checkLogin = require("../../../../middleware/CheckLogin");
const teacher = require("../../../../Model/Teacher/TeachersModel/TeacherSingupModel");
const CloudinaryUpload = require("../FileUpload/CloudinaryImages");
const imgbbUploader = require("imgbb-uploader");
// router
// post student singup start
router.post(
  "/studentSingup",
  CloudinaryUpload.single("file"),
  async (req, res) => {
    // save images bufer to database
    const pathfile = `${__dirname}../../FileUpload/StudentPhoto/${req.file.filename}`;

    imgbbUploader("31b54c6a5b6657ab6db6355e8de99eba", `${req.file.path}`)
      .then(async (response) => {
        const url = response.url;

        const newStudent = new student({
          name: req.body.name,
          roll: req.body.roll,
          registration: req.body.registration,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          gPhone: req.body.gPhone,
          shift: req.body.shift,
          semester: req.body.semester,
          gender: req.body.gender,
          address: req.body.address,
          role: req.body.role,
          img: url,
        });

        try {
          const teachers = await teacher.find({ email: newStudent.email });
          // student teacher collection validation
          if (teachers.length === 0) {
            newStudent.save((err) => {
              if (err) {
                fs.remove(pathfile, (errs) => {
                  if (errs) {
                    res.status(500).json({
                      Rerror: "images remove faild",
                    });
                  }
                });
                res.status(500).json({
                  error: "There was a server side error",
                });
              } else {
                fs.remove(pathfile, (errs) => {
                  if (errs) {
                    res.status(500).json({
                      Rerror: "images remove faild",
                    });
                  }
                });
                res.status(500).json({
                  message: "Account Create Successful!",
                });
              }
            });
          } else {
            res.status(500).json({
              alreadyUse: "This email is used for teacher Account",
            });
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => console.error(error));
    // image upload funcation end
  }
);

// post student singup end

// get all student student

router.get("/allStudent", checkLogin, (req, res) => {
  // { name: { $regex: search } }
  student.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "Theare was a server side error",
      });
    } else {
      if (data.length == 0) {
        res.send("No Data Found");
        res.status(200).json({
          emptyError: "No Data Found!",
        });
      }
      res.status(200).json(data);
    }
  });
});


// delete studnet

router.delete('/studentDelete/:id',(req ,res)=>{
  student.deleteOne({_id:req.params.id},(err)=>{
    if (err) {
      req.status(500).json({
        error:"theare was a server side error"
      })
    }else{
      res.status(200).json({
        message:"Student Delete Successfull"
      })
    }
  })
})
module.exports = router;
