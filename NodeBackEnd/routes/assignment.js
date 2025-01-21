const express = require('express');
const router = express.Router()
const Assignment = require('../models/Assignment')

router.get('/', async (req, res) =>{
    try{
        const assignments = await Assignment.find().populate('course') 
        
        const submissionPromises = assignments.map(assignment =>
            Assignment.find({ assignment: assignment._id }) // Find all assignments referencing this course
        );

        const submissions = await Promise.all(submissionPromises);

        const result = assignments.map((assignment, index) => ({
            assignment,
            submissions: submissions[index],
        }));

        res.send(assignments)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/', async (req, res) =>{
    const assignment = new Assignment({
        assignmentTitle: req.body.assignmentTitle,
        description: req.body.description,
        dueDate: req.body.dueDate,
        course: req.body.course,
        pointsPossible: req.body.pointsPossible,
    })

    try{
        const newAssignment = await assignment.save()
        res.status(201).json(newAssignment)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router