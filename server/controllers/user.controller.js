const user = require('../model/users.model.js');

// method to get all users
const getUsers = async (req,res) => {
    try {
        const Users = await user.find({});
        res.status(200).json(Users)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// method to get a user by id
const getUser = async (req,res)=>{
    try {
        const {_id} = req.params;
        const User = await user.findById(_id);
        res.status(200).json(User);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// method to add a user
const addUser = async (req,res) =>{
    try {
      const User = await user.create(req.body);
      res.status(200).json(User)
    } catch (error) {
       res.status(500).json({message:error.message})
    }
 }

 // method to edit or update a user
 const editUser = async (req,res) =>{
    try {
       const {_id} = req.params;
      const User = await user.findByIdAndUpdate(_id,req.body);

      if(!User){
        return res.status(404).json({message: 'user not found'})
      }
      
      const updatedUser = await user.findById(_id);
      res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//method to delete a user
const deleteUser =  async (req,res) => {
    try {
           const {_id} = req.params;
           const User = await user.findByIdAndDelete(_id);
           if(!User){
            return res.status(404).json({message: 'user not found'});
           }
    
           res.status(200).json({message: 'user deleted successfully'});
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }}

module.exports = {
    getUsers,
    deleteUser,
    addUser,
    editUser,
    getUser
}