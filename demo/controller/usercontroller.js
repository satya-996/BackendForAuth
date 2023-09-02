const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../model/userModel")
const { Router } = require("express")
const dashboard=asyncHandler(async(req, res)=>{
    if(req && user) {
        res.json({status:'ok', data:'ok'})
    } else {
        res.json({status:'error', data:'error'})
    }
})
const registerUser= asyncHandler(async (req, res)=>{
    const {username, email, password}=req.body
    if(!username || !email || !password) {
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const userAvailable=await User.findOne({email})
    if(userAvailable) {
        res.status(400)
        throw new Error(("user already exist"))
    }
    const hashedpassword=await bcrypt.hash(password, 10)
    console.log("hashed password is", hashedpassword)
    const user=await User.create({
        username,
        email,
        password:hashedpassword
    })
    console.log(`user created"${user}`)
    if (user) {
        res.status(201).json({ _id: user.id, email:user.email})
    } else {
        res.status(400)
        throw new Error("user data is not valid")
    }
    res.json({message:"register the user"})
}) 
const loginUser= asyncHandler(async  (req, res)=>{
    const {email, password}=req.body
    if(!email || !password) {
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const user=await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken=jwt.sign({
          user:{
            username:user.username,
            email:user.email,
            id:user.id
          },  
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
        )
        res.status(200).json({accessToken})
    } else {
        res.status(401)
        throw new Error("email or password is not valid")
    }
})

const currentUser= asyncHandler(async  (req, res)=>{
    res.json(req.user)
})
module.exports={registerUser, loginUser, currentUser, dashboard}