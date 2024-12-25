const AsyncHandler = require("express-async-handler");
const User = require("../../models/User");

// Remove product from user's cart
const deleteFromCart = AsyncHandler(async (req, res) => {
    const { productId } = req.body;
    const { userId } = req.params; 

    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Find the product in the user's cart
    const productIndex = user.cart.findIndex(item => item.product._id == productId);

    // If the product is not in the cart, return an error
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the product from the cart
    user.cart.splice(productIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json({
        message: "Product removed from cart successfully",
        data: user.cart,
    });
});

module.exports = { deleteFromCart };
