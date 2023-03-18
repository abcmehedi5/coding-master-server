const express = require("express");
const admin = require("../../../Model/Admin/AdminMakeModel");
const student = require("../../../Model/Student/StudentSingupModel/StudentSingupModel");
const teacher = require("../../../Model/Teacher/TeachersModel/TeacherSingupModel");
const router = express.Router();
// student role
router.post("/studentRole", async (req, res) => {
  try {
    const email = req.body.email;
    const result = await student.find({ email: email });
    res.status(200).send(result.length > 0);
  } catch (error) {
    console.log(error.message);
  }
});
// if (result?.role === "student") {
//   res.status(200).send(true);
// }

// teacher role
router.post("/teacherRole", async (req, res) => {
  try {
    const email = req.body.email;
    const result = await teacher.find({ email: email });
    res.status(200).send(result.length > 0);
  } catch (error) {
    console.log(error.message);
  }
});

// single teacher
router.post("/singleTeacher", async (req, res) => {
  try {
    const email = req.body.email;
    const result = await teacher.findOne({ email: email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

// admin role
router.post("/adminRole", async (req, res) => {
  try {
    const email = req.body.email;
    const result = await admin.find({ email: email });
    res.status(200).send(result.length > 0);
  } catch (error) {
    console.log(error.message);
  }
});

// // course role
// router.post("/courseRoll", (req, res) => {

// });

module.exports = router;
