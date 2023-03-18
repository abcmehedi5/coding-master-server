const mongoose = require("mongoose");
const moduleSchema = new mongoose.Schema({
  moduleTitle: {
    type: Object,
    required: true,
    unique:true
  },
  moduleDetails: {
    required: true,
    type: Array,
    unique:true
    
  },


  // videoTitle: {
  //   type: String,
  //   required: true,
  // },
  // videoId: {
  //   type: String,
  //   required: true,
  // },
});

const modules = new mongoose.model('module',moduleSchema);
module.exports = modules
