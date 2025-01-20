const express  = require('express');
const user = require('../model/users.model.js')
const router = express.Router();
const controller = require('../controllers/user.controller.js')



router.get('/', controller.getUsers );
router.get('/:_id',controller.getUser);
router.post('/add-user', controller.addUser);
router.put('/:_id',controller.editUser);
router.delete('/delete/:_id', controller.deleteUser);




module.exports = router;