const AsyncHandler = require("express-async-handler");
const User = require("../../models/User");


// Get all users
const getAllUsers = AsyncHandler(async (req, res) => {
    const users = await User.find().select("-password").populate("cart.product");
    res.status(200).json({
        message: "Users fetched successfully",
        data: users,
    });
});

const getUserById = AsyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password").populate("cart.product");
    res.status(200).json({
        message: "User fetched successfully",
        data: user,
    });
});

const deleteUser = AsyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message: "User deleted successfully",
        data: user,
    });
});


module.exports={
    getAllUsers,
    deleteUser,
    getUserById
}