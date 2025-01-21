const express = require('express');
const router = express.Router()
const User = require('../models/User')
const Course = require('../models/Course')
const Submission = require('../models/Submission')
const Enrollment = require('../models/Enrollment')

router.get('/:id', async (req, res) =>{
    try{
        const user = await User.findById(req.params.id)

        const courses = await Course.find({ instructor: user._id });
        const submissions = await Submission.find({ user: user._id });
        const enrollments = await Enrollment.find({ user: user._id });

        const result = { 
            user,
            courses,
            submissions,
            enrollments
        };

        res.json(result);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/', async (req, res) =>{
    try{
        const users = await User.find()

        const coursePromises = users.map(user =>
            Course.find({ instructor: user._id }) 
        );

        const submissionPromises = users.map(user =>
            Submission.find({ user: user._id }) 
        );

        const enrollmentPromises = users.map(user =>
            Enrollment.find({ user: user._id }) 
        );

        const courses = await Promise.all(coursePromises);
        const submissions = await Promise.all(submissionPromises);
        const enrollments = await Promise.all(enrollmentPromises);

        const result = users.map((user, index) => ({
            user,
            courses: courses[index],
            submissions: submissions[index],
            enrollments: enrollments[index]
        }));


        res.json(result);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields with the new data from the request body
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.username = req.body.username || user.username;
        user.role = req.body.role || user.role;

        // Only update the password if a new one is provided, and hash it
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10); // Salt the new password
            user.password = await bcrypt.hash(req.body.password, salt); // Hash the new password
        }

        // Save the updated user
        await user.save();

        // Send the updated user as a response
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optionally, delete all courses associated with this user (if needed)
        await Course.deleteMany({ instructor: user._id });

        // Optionally, delete all submissions associated with this user (if needed)
        await Submission.deleteMany({ user: user._id });

        // Optionally, delete all enrollments associated with this user (if needed)
        await Enrollment.deleteMany({ user: user._id });

        // Now delete the user
        await User.deleteOne({ _id: req.params.id });

        // Send a response confirming the deletion
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




module.exports = router