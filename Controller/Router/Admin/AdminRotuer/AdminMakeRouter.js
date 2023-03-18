const express = require("express");
const checkLogin = require("../../../../middleware/CheckLogin");
const admin = require("../../../../Model/Admin/AdminMakeModel");
const router = express.Router();

// admn data post
router.post("/makeAdmin", (req, res) => {
  const newAdmin = new admin({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  });

  newAdmin.save((err) => {
    if (err) {
      res.status(500).json({
        error: "Theare was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Admin Make Successful",
      });
    }
  });

});

//  admin get

router.get("/allAdmin", checkLogin, async (req, res) => {
  try {
    const result = await admin.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json({
      message: error.message,
    });
  }

  // admin delete

  router.delete("/adminDelete/:id", (req, res) => {
    admin.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).json({
          error: "Theare was a server side error",
        });
      } else {
        res.status(200).json({
          message: "Admin Delete Successful",
        });
      }
    });
  });
});
module.exports = router;
