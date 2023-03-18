const mongoose = require('mongoose')
const addCourseSchema = new mongoose.Schema({
    courseName:{
        type: String,
        required: true,
    },
    coursePrice:{
        type: String,
        required: true,
    },
    courseDescription:{
        type: String,
        required: true,
    },
    img: {
        type: String,
      },
})

const course = new mongoose.model("course", addCourseSchema);
module.exports = course