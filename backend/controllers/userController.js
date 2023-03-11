const generateToken = require("../dbConnect/generateToken");
const User = require("../models/userModel")
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const isAuth = require("../middlewares/authMiddleware");
const { query } = require("express");
require('dotenv').config()


//SIGNUP
const registerUser = async (req,res)=>{
    const {name,email,password,pic} = req.body;
   try {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    return res.status(400).json({errors:errors.mapped()})
 
    if (!name || !email || !password){
      return  res.status(400).send({ msg: "Please enter all the fields" });
    }

    const userExist = await User.findOne({email});

    if(userExist){
        return res.status(400).send({ msg: "User already exisit" });

    }
    const salt  = await bcrypt.genSalt(10 )
      hashedPassword = await bcrypt.hash (password , salt )

    const user = await User.create({
        name,
        email,
        password : hashedPassword ,
        pic

    })
    
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email : user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    }else {
        return res.status(400).send({ msg: "Failed to create user" });
 
    }


}catch (err) {
  
  res.status(500).send("server error");

}
}

//LOGIN
const authUser = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    return res.status(400).json({errors:errors.mapped()})
 
    if  (!email || !password)
    return res.status(400).json({ msg: "please add all fields" });
    const user = await User.findOne({email})
    let isValidPassword = false;
    if (user) {
      isValidPassword=await bcrypt.compare(password, user.password)
    }
    if  (user && isValidPassword){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }else {
    res.status(400).json({ msg: "Invalid credential" });
  }
  } catch (error) {

    res.status(500).send("server error");
  }
}

//DELETE
const deleteUser= ( async (req, res) => {
  try {
    const response = await User.deleteOne({ _id: req.params.idDelete });
    res.send({ msg: "user deleted successfully", response });
  } catch (error) {
    console.log(error);
  }
});



/*const getUser= ( async (req, res) => {
   res.send({ user: req.user });
   console.log(getUser);
});*/


const getAll= async (req, res) => {
  const keyword = req.query

  ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
  : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
}

  
  

module.exports={registerUser, authUser, deleteUser,getAll}