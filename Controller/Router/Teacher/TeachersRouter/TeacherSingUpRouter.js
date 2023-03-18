const express = require("express");
const teacher = require("../../../../Model/Teacher/TeachersModel/TeacherSingupModel");
const router = express.Router();
const fs = require("fs-extra");
const uplaod = require("../../Student/FileUpload/SingupImg");
const checkLogin = require("../../../../middleware/CheckLogin");
const student = require("../../../../Model/Student/StudentSingupModel/StudentSingupModel");
const imgbbUploader = require("imgbb-uploader");
const CloudinaryUpload = require("../../Student/FileUpload/CloudinaryImages");

//  teacher singup router
// router.post(
//   "/teacherSingUp",
//   CloudinaryUpload.single("file"),
//   async (req, res) => {
//     const pathfile = `${__dirname}../../../Student/FileUpload/StudentPhoto/${req.file.filename}`;
//     imgbbUploader("31b54c6a5b6657ab6db6355e8de99eba", `${req.file.path}`)
//       .then(async (response) => {
//         // img url
//         const url = response.url;
//         const newTeacher = new teacher({
//           name: req.body.name,
//           qualification: req.body.qualification,
//           fburl: req.body.fburl,
//           email: req.body.email,
//           password: req.body.password,
//           phone: req.body.phone,
//           address: req.body.address,
//           role: req.body.role,
//           status: req.body.status,
//           img: url,
//         });
//         try {
//           const students = await student.find({ email: newTeacher.email });
//           // student teacher collection validation
//           if (students.length === 0) {
//             newTeacher.save((err) => {
//               if (err) {
//                 fs.remove(pathfile, (errs) => {
//                   if (errs) {
//                     res.status(500).json({
//                       Rerror: "images remove faild",
//                     });
//                   }
//                 });
//                 res.status(500).json({
//                   error: "There was a server side error",
//                 });
//               } else {
//                 fs.remove(pathfile, (errs) => {
//                   if (errs) {
//                     res.status(500).json({
//                       Rerror: "images remove faild",
//                     });
//                   }
//                 });
//                 res.status(500).json({
//                   message: "Account Create Successful!",
//                 });
//               }
//             });
//           } else {
//             res.status(500).json({
//               alreadyUse: "This email is used for Student Account",
//             });
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       })
//       .catch((error) => console.error(error));
//   }
// );
//  teacher singup router

// no photo change teacher---------

router.post("/teacherSingUp", async (req, res) => {
  // const url = response.url;
  const newTeacher = new teacher({
    name: req.body.name,
    qualification: req.body.qualification,
    fburl: req.body.fburl,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    role: req.body.role,
    status: req.body.status,
    // img: url,
  });
  try {
    const students = await student.find({ email: newTeacher.email });
    // student teacher collection validation
    if (students.length === 0) {
      newTeacher.save((err) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error",
          });
        } else {
          res.status(500).json({
            message: "Account Create Successful!",
          });
        }
      });
    } else {
      res.status(500).json({
        alreadyUse: "This email is used for Student Account",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// no photo change teacher---------

// get all teacher
router.get("/allTeacher", checkLogin, (req, res) => {
  teacher.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "Theare was a server side error",
      });
    } else {
      res.status(200).json(data);
    }
  });
});
module.exports = router;

// teacher status update
router.patch("/teacherStatus/:id", (req, res) => {
  teacher.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: req.body.status,
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "update successfully!",
        });
      }
    }
  );
});

// teacher delete
router.delete("/teacherDelete/:id", (req, res) => {
  const id = req.params.id;
  teacher.deleteOne({ _id: id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Delete Successfull",
      });
    }
  });
});
