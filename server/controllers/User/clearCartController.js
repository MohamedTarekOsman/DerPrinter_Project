const User = require("../../models/User");

const clearCartAndResetUser = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed as a parameter
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.cart = []; // Clear the cart
        user.chosenAddress = 0; // Reset chosenAddress
        user.paymentOption = 'cash'; // Set paymentOption to 'cash'

        // Save the updated user
        await user.save();

        res.status(200).json({ 
            message: 'Cart cleared and user details reset successfully',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

module.exports = { clearCartAndResetUser };
