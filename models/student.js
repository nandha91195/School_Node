const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let studentDetails = new Schema({
  schoolName: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  className: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

module.exports = Student = mongoose.model("Student", studentDetails);
