const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    enrollmentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;