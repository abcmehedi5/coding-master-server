const multer = require("multer");
const path = require("path");

// upload path folder
const UPLOAD_FOLDER = `${__dirname}/StudentPhoto`;
// file uplaod
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    const finalFile = fileName + fileExt;
    cb(null, finalFile);
  },
});
const uplaod = multer({
  storage: storage,
  limits: {
    fileSize: 2000000, // 2MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg, png ,jpg formate allowed!"));
    }
  },
});
module.exports= uplaod
