const mongoose = require("mongoose");
const BuyCorseSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  access: {
    type: Boolean,
    required: true,
  },
});

const CourseBuy = new mongoose.model("CourseBuy", BuyCorseSchema);
module.exports = CourseBuy;
