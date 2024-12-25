const AsyncHandler = require("express-async-handler");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcryptjs')

const signUp = AsyncHandler(async (req, res) => {
    const { name, email, password, phone, gender, role, addresses } = req.body;

    // Create a new user
    const user = await User.create({
        name,
        email,
        password,
        phone,
        gender,
        role,
        addresses: addresses || [],
    });

    // Generate Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    res.status(201).json({ data: user, token });
});


const signIn= AsyncHandler(async(req,res)=>{
    //check if user already exists in database
    const user=await User.findOne({email:req.body.email})
    if(!user||!(await bcrypt.compare(req.body.password,user.password))){
        return res.status(400).json({ message: "invalid email or password" });
    }

     //generate Token
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE_TIME,
    });

    res.status(201).json({data:user,token});
})

module.exports = {
    signUp,
    signIn
};
