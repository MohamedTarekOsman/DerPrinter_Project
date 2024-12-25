const AsyncHandler = require("express-async-handler");
const User = require("../../models/User");

const updateCartOptions = AsyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { paymentOption, chosenAddress} = req.body;

    // Find the product by ID
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    // Update fields
    if (paymentOption) user.paymentOption = paymentOption;
    if (chosenAddress) user.chosenAddress = chosenAddress;

    const updatedUser = await user.save();

    res.status(200).json({ message: "user updated successfully", data: updatedUser });
});

module.exports={
    updateCartOptions
}