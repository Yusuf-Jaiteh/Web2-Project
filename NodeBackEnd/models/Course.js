const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    courseTitle: { type: String, required: true },
    description: { type: String, required: false },
    instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;