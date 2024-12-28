const AsyncHandler = require("express-async-handler");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcryptjs')


const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
    });
};


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

module.exports = {
    signUp,
    signIn,
    facebookLogin
};
