const express = require("express");
const modules = require("../../../Model/Module/ModuleModel");
const router = express.Router();

// post method module

router.post("/addModule", (req, res) => {
  const newModule = new modules({
    moduleTitle: req.body.moduleTitle,
    moduleDetails: req.body.moduleDetails,
  });

  newModule.save((err) => {
    if (err) {
      res.status(500).json({
        error: "therer was a server side error",
      });
    } else {
      res.status(200).json({
        message: "module upload successfull",
      });
    }
  });
});

// find all module

router.get("/allModule", (req, res) => {
  modules.find((err, data) => {
    if (err) {
      res.status(500).json({
        error: "Not found",
      });
    } else {
      res.status(200).json(data);
    }
  });
});

// load single module
router.get("/singleModule/:id", (req, res) => {
  modules.findById({ _id: req.params.id }, (err, singleModule) => {
    if (err) {
      res.status(500).json({
        error: "canot find module data",
      });
    } else {
      res.status(200).send(singleModule);
    }
  });
});

// module mutliple video add
router.post("/moduleVideo/:id", (req, res) => {
  const { videoTitle, videoId } = req.body;
  const id = req.params.id;

  modules.findById(id, function (err, doc) {
    if (err) {
      res.status(500).json({
        error: "server side error",
      });
    }
    // Add a new object to the moduleDetails array
    doc.moduleDetails.push({
      videoTitle: req.body.videoTitle,
      videoId: req.body.videoId,
    });
    // Save the document
    doc.save(function (err) {
      if (err) {
        res.status(500).json({
          error: "server side error",
        });
      } else {
        res.status(200).json({
          message: "module video update successfull",
        });
      }
    });
  });
});

// delete module
router.delete("/deleteModule/:id", (req, res) => {
  const id = req.params.id;
  modules.deleteOne({ _id: id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "server side error",
      });
    } else {
      res.status(200).json({
        message: " delete susccessfull",
      });
    }
  });
});

// delete video with video id
// router.delete("/deleteVideo/:moduleId/:videoId", (req, res) => {
//   const moduleId = req.params.moduleId;
//   const videoId = req.params.videoId;
//   modules.findById(moduleId, function (err, doc) {
//     if (err) {
//       res.status(500).json({
//         error: "server side error",
//       });
//     }
//     doc.save(function (err) {
//       if (err) {
//         res.status(500).json({
//           error: "server side error",
//         });
//       } else {
//         res.status(200).json({
//           message: " video deletion successfull",
//         });
//       }
//     });
//   });
// });

router.delete("/deleteVideo/:moduleId/:videoId", (req, res) => {
  const moduleId = req.params.moduleId;
  const videoId = req.params.videoId;
  modules.findById(moduleId, function (err, doc) {
    if (err) {
      res.status(500).json({
        error: "server side error",
      });
    } else {
      doc.moduleDetails = doc.moduleDetails.filter((moduleDetail) => moduleDetail.videoId != videoId);
      doc.save(function (err) {
        if (err) {
          res.status(500).json({
            error: "server side error",
          });
        } else {
          res.status(200).json({
            message: " video deletion successfull",
          });
        }
      });
    }
  });
});


module.exports = router;
