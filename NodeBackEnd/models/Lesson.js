const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    lessonTitle: { type: String, required: true },
    content: { type: String, required: true },
    orderNumber: { type: Number, required: true },
    previousLessonId:{ type: String, required: false },
    nextLessonId: { type: String, required: false }
  },
  { timestamps: true }
);

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;