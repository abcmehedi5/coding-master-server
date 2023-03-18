const express = require("express");
const course = require("../../../Model/Course/AddCourseModel");
const CourseBuy = require("../../../Model/Course/BuyCourseModel");
const router = express.Router();

router.post("/buyCourse/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newCourseBuy = new CourseBuy({
      transactionId: req.body.transactionId,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      courseId: id,
      access: false,
    });
    newCourseBuy.save(newCourseBuy, (err) => {
      if (err) {
        res.status(500).json({
          error: "therer was a server side error",
        });
      } else {
        res.status(200).json({
          message:
            "Thank you for purchasing. If you provide correct information, you will be notified soon",
        });
      }
    });
  } catch (error) {
    res.send("course not found");
  }
});

//  get all  Transaction

router.get("/allTransaction", (req, res) => {
  CourseBuy.find((err, transaction) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json(transaction);
    }
  });
});

// check box router
router.patch("/checkBoxUpdate/:id", (req, res) => {
  const id = req.params.id;
  const isChecked = req.body.status;
  CourseBuy.findById(id, (err, courseBuy) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    if (!courseBuy) {
      return res.status(404).send("CourseBuy not found");
    }

    courseBuy.access = isChecked;

    courseBuy.save((err, updatedCourseBuy) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.status(200).json(updatedCourseBuy);
    });
  });
});

// delete transuction
router.delete("/transactionDelete/:id", (req, res) => {
  const id = req.params.id;
  CourseBuy.deleteOne({ _id: id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Transaction Delete Successfull",
      });
    }
  });
});

module.exports = router;
