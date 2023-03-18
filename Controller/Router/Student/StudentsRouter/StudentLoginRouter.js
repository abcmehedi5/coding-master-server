const express = require("express");
const student = require("../../../../Model/Student/StudentSingupModel/StudentSingupModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const teacher = require("../../../../Model/Teacher/TeachersModel/TeacherSingupModel");
// login check router

router.post("/student-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const studentData = await student.findOne({ email: email });
    const teacherData = await teacher.findOne({ email: email });
    // if (studentData.password === password) {
    //   const token = jwt.sign(
    //     {
    //       email: studentData.email,
    //       name: studentData.name,
    //       studentId: studentData._id,
    //     },
    //     process.env.JWT_SECRET,
    //     {
    //       expiresIn: "5h",
    //     }
    //   );
    //   res.status(200).json({
    //     data: studentData,
    //     access_token: token,
    //     loginSuccess: "Login Successful!",
    //   });
    // } else {
    //   res.status(400).json({
    //     loginPassError: "Password do not match",
    //   });
    // }

    if (email === studentData?.email) {
      if (studentData.password === password) {
        const token = jwt.sign(
          {
            email: studentData.email,
            name: studentData.name,
            studentId: studentData._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "5h",
          }
        );
        res.status(200).json({
          data: studentData,
          access_token: token,
          loginSuccess: "Student Login Successful!",
        });
      } else {
        res.status(400).json({
          loginPassError: "Password do not match",
        });
      }
    } else {
      if (teacherData.password === password) {
        const token = jwt.sign(
          {
            email: teacherData.email,
            name: teacherData.name,
            studentId: teacherData._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "5h",
          }
        );
        res.status(200).json({
          data: teacherData,
          access_token: token,
          loginSuccess: "Login Successful!",
        });
      } else {
        res.status(400).json({
          loginPassError: "Password do not match",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: "invalid Email address!",
    });
  }
});

module.exports = router;
