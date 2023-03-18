const express = require("express");
const checkLogin = require("../../../../middleware/CheckLogin");
const student = require("../../../../Model/Student/StudentSingupModel/StudentSingupModel");
const teacher = require("../../../../Model/Teacher/TeachersModel/TeacherSingupModel");
const router = express.Router();

router.post("/stProfile", checkLogin, async (req, res) => {
  try {
    const email = req.body.email;
    const teacherSingle = await teacher.findOne({ email: email });
    const studentSingle = await student.findOne({ email: email });
    if (email === studentSingle?.email) {
      res.status(200).json(studentSingle);
    } else {
      res.status(200).json(teacherSingle);
    }
  } catch (error) {
    res.status(200).json({
      error:'no data fetching'
    });
  }
});

module.exports = router;
