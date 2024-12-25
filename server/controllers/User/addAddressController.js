const User = require("../../models/User");


const addAddress = async (req, res) => {
  try {
    const { userId } = req.params; // User ID from the URL
    const { userName,userEmail,userPhone,address, AddressDetails, city, postalCode } = req.body; // Address details from the request body

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the new address to the addresses array
    user.addresses.push({ userName,userEmail,userPhone,address, AddressDetails, city, postalCode });

    // Save the updated user document
    await user.save();

    // Respond with the updated addresses
    res.status(200).json({
      message: 'Address added successfully',
      addresses: user.addresses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  try {
      const user = await User.findByIdAndUpdate(
          userId,
          { $pull: { addresses: { _id: addressId } } },
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Address deleted successfully", user });
  } catch (error) {
      res.status(500).json({ message: "Error deleting address", error });
  }
};

module.exports = { addAddress, deleteAddress };
