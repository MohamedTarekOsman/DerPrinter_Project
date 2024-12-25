const AsyncHandler = require("express-async-handler");
const User = require("../../models/User");
const Products = require("../../models/Products");

// Add product to user's cart
const addToCart = AsyncHandler(async (req, res) => {
    const { productId, selectedItems, price, orderDelivery } = req.body;
    const { userId } = req.params;

    const image = req.file ? req.file.path : null;
    
    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Validate that the product exists
    const product = await Products.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }


    user.cart.push({
        product: productId,
        selectedItems, 
        price,
        orderDelivery,
        image
    });

    await user.save();

    res.status(200).json({
        message: "Product added to cart successfully",
        data: user.cart,
    });
});

module.exports = { addToCart };
