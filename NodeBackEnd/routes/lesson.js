const express = require('express');
const router = express.Router()
const Lesson = require('../models/Lesson')

router.get('/:id', async (req, res) =>{
    try{
        const lesson = await Lesson.findById(req.params.id).populate('course')
        res.send(lesson)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/', async (req, res) =>{
    try{
        const lessons = await Lesson.find().populate('course')
        res.send(lessons)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/', async (req, res) =>{
    const lesson = new Lesson({
        course: req.body.course,
        lessonTitle: req.body.lessonTitle,
        content: req.body.content,
        orderNumber: req.body.orderNumber,
        previousLessonId: req.body.previousLessonId,
        nextLessonId: req.body.previousLessonId
    })

    try{
        const newLesson = await lesson.save()
        res.status(201).json(newLesson)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router