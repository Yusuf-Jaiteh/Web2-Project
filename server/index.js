const express = require('express');
const mongoose = require('mongoose');
const user = require('./model/users.model.js')
const userRoute = require('./routes/user.route.js');
const cors = require('cors');
const app = express();

// middle ware
app.use(express.json())
app.use(cors());

//routes
app.use('/users', userRoute);


mongoose.connect('mongodb://127.0.0.1:27017/crud');

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const usermodel = mongoose.model('Users', UserSchema);





app.listen(3001, () => {
    console.log('Server is running on port 3001');
});