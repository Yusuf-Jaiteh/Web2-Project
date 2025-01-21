const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment' },
    content: { type: String, required: true },
    submissionDate: { type: Date, default: Date.now },
    grade: {type: Number, requird: false},
  },
  { timestamps: true }
);

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;