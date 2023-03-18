const mongoose = require("mongoose");
const SingupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  roll: {
    type: String,
    required: true,
    maxlength: 8,
  },
  registration: {
    type: String,
    required: true,
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
  gPhone: {
    type: String,
    required: true,
    maxLength: 11,
  },
  shift: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  img: {},
});

const student = new mongoose.model("student", SingupSchema);
module.exports = student;
