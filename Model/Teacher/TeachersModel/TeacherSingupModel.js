const mongoose = require("mongoose");
const teacherSingupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email Address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    maxLength: 11,
  },
  address: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  fburl: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },

  // img: {},
});
const teacher = new mongoose.model("teacher", teacherSingupSchema);
module.exports = teacher;
