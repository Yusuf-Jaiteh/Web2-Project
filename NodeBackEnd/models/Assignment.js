const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema(
    {
        assignmentTitle: { type: String, required: true },
        description: { type: String, required: false },
        dueDate: { type: Date, required: true },
        pointsPossible: { type: String, required: true},
        course: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;