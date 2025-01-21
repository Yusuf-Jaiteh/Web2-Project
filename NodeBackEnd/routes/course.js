const express = require('express');
const router = express.Router()
const Course = require('../models/Course')
const User = require('../models/User')
const Lesson = require('../models/Lesson')
const Assignment = require('../models/Assignment')
const Enrollment = require('../models/Enrollment')
const { verifyToken } = require('./authentication');

router.get('/instructor/:id', async (req, res) =>{
    try{
        const courses = await Course.find({ instructor: req.params.id })
        const lessonPromises = courses.map(course =>
            Lesson.find({ course: course._id }) // Find all lessons referencing this course
        );

        const assignmentPromises = courses.map(course =>
            Assignment.find({ course: course._id }) // Find all assignments referencing this course
        );

        const enrollmentPromises = courses.map(course =>
            Enrollment.find({ course: course._id }) // Find all enrollments referencing this course
        );

        // Use Promise.all to run the queries in parallel
        const lessons = await Promise.all(lessonPromises);
        const assignments = await Promise.all(assignmentPromises);
        const enrollments = await Promise.all(enrollmentPromises);

        // Combine the courses with their related documents
        const result = courses.map((course, index) => ({
            course,
            lessons: lessons[index],
            assignments: assignments[index],
            enrollments: enrollments[index]
        }));
        res.json(result);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', async (req, res) =>{
    try{
        const course = await Course.findById(req.params.id).populate('instructor');

        const lessons = await Lesson.find({ course: course._id });
        const assignments = await Assignment.find({ course: course._id });
        const enrollments = await Enrollment.find({ course: course._id });

        const result = { 
            course,
            lessons,
            assignments,
            enrollments
        };

        res.json(result);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor'); // Get all courses

        const lessonPromises = courses.map(course =>
            Lesson.find({ course: course._id }) // Find all lessons referencing this course
        );

        const assignmentPromises = courses.map(course =>
            Assignment.find({ course: course._id }) // Find all assignments referencing this course
        );

        const enrollmentPromises = courses.map(course =>
            Enrollment.find({ course: course._id }) // Find all enrollments referencing this course
        );

        // Use Promise.all to run the queries in parallel
        const lessons = await Promise.all(lessonPromises);
        const assignments = await Promise.all(assignmentPromises);
        const enrollments = await Promise.all(enrollmentPromises);

        // Combine the courses with their related documents
        const result = courses.map((course, index) => ({
            course,
            lessons: lessons[index],
            assignments: assignments[index],
            enrollments: enrollments[index]
        }));

        res.json(result); // Return the courses with their related documents
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) =>{
    const course = new Course({
        courseTitle: req.body.courseTitle,
        description: req.body.description,
        instructor: req.body.instructor
    })

    try{
        const newCourse = await course.save()
        res.status(201).json(newCourse)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Update a course by ID
router.put('/:id', async (req, res) => {
    try {
        // Find the course by ID
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Update course fields with the new data from the request body
        course.courseTitle = req.body.courseTitle || course.courseTitle;
        course.description = req.body.description || course.description;
        course.instructor = req.body.instructor || course.instructor;
        

        // Save the updated course
        await course.save();

        // Send the updated course as a response
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



//  Delete a course by ID
router.delete('/:id', async (req, res) => {
    try {
        // Find the course by ID
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Now delete the user
        await Course.deleteOne({ _id: req.params.id });

        // Send a response confirming the deletion
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router