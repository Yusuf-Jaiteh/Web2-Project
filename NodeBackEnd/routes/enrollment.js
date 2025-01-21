const express = require('express');
const router = express.Router()
const Enrollment = require('../models/Enrollment')

router.get('/', async (req, res) =>{
    try{
        const enrollments = await Enrollment.find().populate('course').populate('user')
        res.send(enrollments)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/', async (req, res) =>{
    const enrollment = new Enrollment({
        course: req.body.course,
        user: req.body.user,
        enrollmentDate: req.body.enrollmentDate
    })

    try{
        const newEnrollment = await enrollment.save()
        res.status(201).json(newEnrollment)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router