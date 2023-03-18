const mongoose = require("mongoose");
const makeAdminSchema = new mongoose.Schema({
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
  role: {
    type: String,
    required: true,
  },
});

const admin = new mongoose.model("admin", makeAdminSchema);
module.exports = admin;
