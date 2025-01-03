const AsyncHandler = require("express-async-handler");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcryptjs')
const crypto=require('crypto');
const { response } = require("express");
const sendEmail = require("./sendEmail");

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
    });
};


const signUp = AsyncHandler(async (req, res) => {
    const { name, email, password, phone, gender, role, addresses } = req.body;

    const lastUser = await User.findOne().sort({ createdAt: -1 }); // Assuming you have a `createdAt` field

    // Generate the next order ID
    const lastUserId = lastUser?.id || "4999"; // Default to der4999 if no orders exist
    const nextUserId = (parseInt(lastUserId) + 1);
    // Create a new user
    const user = await User.create({
        id:nextUserId,
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

const facebookLogin = AsyncHandler(async (req, res) => {
    const { name, email, fbId } = req.body;

    if (!fbId) {
        return res.status(400).json({ message: 'Facebook ID is required.' });
    }

    // Check if user exists based on Facebook ID or email
    let user = await User.findOne({ $or: [{ fbId }, { email }] });

    if (user) {
        // If user exists, update Facebook ID if missing and log in
        if (!user.fbId) {
            user.fbId = fbId;
            await user.save();
        }

        // Generate a token for the user
        const token = generateToken(user._id);
        return res.status(200).json({ data: user, token });
    }

    // If user doesn't exist, create a new user
    user = await User.create({
        name,
        email,
        fbId,
    });

    // Generate a token for the new user
    const token = generateToken(user._id);
    res.status(201).json({ data: user, token });
});

const forgetPassword=AsyncHandler(async(req,res,next)=>{
    // 1) get user by email 
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({ message: 'Email not logged to the System' });
    }

    // 2) if user exists, generate hash reset random 6 digits and save it in db
    const resetCode=Math.floor(100000+Math.random()*900000).toString();
    const hashedResetCode=crypto.createHash('sha256').update(resetCode).digest('hex');

    // 3) save password reset code in db and make validation for 10 minutes
    user.passwordResetCode=hashedResetCode
    user.passwordResetExpires=Date.now()+(10*60*1000)
    user.passwordResetVerified = false;

    await user.save();

    // 4)send reset code via email
    const message = ` Hi ${user.name},\n We received a request to reset the password on your Account. \n(   ${resetCode}   )\n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The DerPrinter Team`;
    try {
    await sendEmail({
        email: user.email,
        subject: 'Your password reset code (valid for 10 min)',
        message,
      });
    } catch (err) {
      user.passwordResetCode = undefined;
      user.passwordResetExpires = undefined;
      user.passwordResetVerified = undefined;
  
      await user.save();
      return response.status(500).json(err);
    }

    res
      .status(200)
      .json({ status: 'Success', message: 'Reset code sent to email' });
})

const verifyPassResetCode=AsyncHandler(async(req,res,next)=>{
    // 1)get user based on reset code and expiration date
    const hashedResetCode=crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
    const user=await User.findOne({
    passwordResetCode:hashedResetCode,
    passwordResetExpires:{$gt :Date.now()}
    })
    if(!user){
        return res.status(500).json({message:'Reset code invalied or expired'});
    }
    // 2)reset code valid
    user.passwordResetVerified=true;
    await user.save();
    res.status(200).json({
        status: 'success',
    })
})

const resetPassword=AsyncHandler(async(req,res,next)=>{
    // 1)get user based on email
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json({message:`there is no user with this email ${req.body.email}`});
    }

    // 2)check if reset code is verified
    if(!user.passwordResetVerified){
        return res.status(400).json({message:`reset code not verified  ${req.body.email}`});
    }

    user.password=req.body.newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();

    //if everything is ok,generate token
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE_TIME,
    });
    res.status(200).json({token});
})
module.exports = {
    signUp,
    signIn,
    facebookLogin,
    forgetPassword,
    verifyPassResetCode,
    resetPassword
};
