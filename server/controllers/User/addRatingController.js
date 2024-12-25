const AsyncHandler = require("express-async-handler");
const User = require("../../models/User");


const addRating = AsyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { ratingStars, ratingText } = req.body;

    // Validate ratingStars
    if (!ratingStars || ratingStars < 1 || ratingStars > 5) {
        return res.status(400).json({ message: "Rating stars must be between 1 and 5" });
    }

    // Find user and update rating
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { ratingStars, ratingText },
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message: "Rating added successfully",
        data: updatedUser,
    });
});

module.exports = {
    addRating,
};
