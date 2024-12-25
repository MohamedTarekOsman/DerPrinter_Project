const Orders = require("../../models/Orders");

const updateOrderImage = async (req, res) => {
    const { orderId, imageId } = req.params; // Extract orderId and imageId from the request params

    try {
        // Find the order by ID
        const order = await Orders.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Find the image in the order's images array
        const imageToUpdate = order.images.id(imageId);

        if (!imageToUpdate) {
            return res.status(404).json({ message: 'Image not found in order' });
        }

        // Check if a new file was uploaded
        if (req.file) {
            imageToUpdate.image = req.file.path; // Update the image URL with the uploaded file's URL from Cloudinary
        }

        // Update the status if provided
        if (req.body.status) {
            imageToUpdate.status = req.body.status;
        }

        // Save the updated order
        await order.save();

        return res.status(200).json({ message: 'Image updated successfully', order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating the image', error });
    }
};

module.exports = updateOrderImage;
