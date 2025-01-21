const express = require('express');
const mongoose= require('mongoose');
const cors= require('cors');
const app = express();
const authRoutes = require('./routes/authentication');

// Middleware to parse incoming JSON
app.use(express.json());

app.use(cors({ origin: 'http://localhost:4200' }))

mongoose.connect('mongodb://127.0.0.1/lms',{
    useNewUrlParser: true,
})
.then(() => console.log('Connected to mongoDB'))
.catch(err => console.error('Error connecting to mongoDB:', err));

app.use('/auth', authRoutes);

const usersRouter = require('./routes/user')
app.use('/api/users', usersRouter)

const assignmentsRouter = require('./routes/assignment')
app.use('/api/assignments', assignmentsRouter)

const coursesRouter = require('./routes/course')
app.use('/api/courses', coursesRouter)

const enrollmentsRouter = require('./routes/enrollment')
app.use('/api/enrollments', enrollmentsRouter)

const lessonsRouter = require('./routes/lesson')
app.use('/api/lessons', lessonsRouter)

const submissionsRouter = require('./routes/submission')
app.use('/api/submissions', submissionsRouter)

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
