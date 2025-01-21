const express = require('express');
const router = express.Router()
const Submission = require('../models/Submission')

router.get('/', async (req, res) =>{
    try{
        const submissions = await Submission.find().populate('user').populate('course').populate('assignment')
        res.send(submissions)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/', async (req, res) =>{
    const submission = new Submission({
        submissionDate: req.body.submissionDate,
        content: req.body.content,
        grade: req.body.grade,
        user: req.body.user,
        assignment: req.body.assignment,
        course: req.body.course
    })

    try{
        const newSubmission = await submission.save()
        res.status(201).json(newSubmission)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// PUT route to update a submission
router.put('/:id', async (req, res) => {
    try {
        // Find the submission by ID
        const submission = await Submission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        // Update only the fields that are provided in the request body
        if (req.body.submissionDate) {
            submission.submissionDate = req.body.submissionDate;
        }
        if (req.body.content) {
            submission.content = req.body.content;
        }
        if (req.body.grade) {
            submission.grade = req.body.grade;
        }
        if (req.body.user) {
            submission.user = req.body.user;
        }
        if (req.body.assignment) {
            submission.assignment = req.body.assignment;
        }
        if (req.body.course) {
            submission.course = req.body.course;
        }

        // Save the updated submission
        const updatedSubmission = await submission.save();
        res.json(updatedSubmission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router