const AsyncHandler = require("express-async-handler");
const Orders = require("../../models/Orders");

// Create a new Order
const createOrder = AsyncHandler(async (req, res) => {
    const { name, price, status, userId, paymentOption, chosenAddress, images,orderDelivery,selectedItems } = req.body;

    // The image URLs are provided by Cloudinary through multer
    // const images = req.files ? req.files.map((file) => file.path) : []; // Handling multiple files

    const lastOrder = await Orders.findOne().sort({ createdAt: -1 }); // Assuming you have a `createdAt` field

    // Generate the next order ID
    const lastOrderId = lastOrder?.id || "der4999"; // Default to der4999 if no orders exist
    const nextOrderId = "der" + (parseInt(lastOrderId.slice(3)) + 1);
    // Create the Order
    const order = await Orders.create({
        id: nextOrderId,
        name,
        price,
        status,
        userId,
        paymentOption,
        chosenAddress,
        orderDelivery,
        selectedItems,
        images, // Array of image URLs
    });

    res.status(201).json({ message: "Order created successfully", data: order });
});

// Get all Orders
const getAllOrders = AsyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    // Convert to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Validate page and limit
    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
        return res.status(400).json({ message: "Invalid page or limit value" });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const totalOrders = await Orders.countDocuments();
    const orders = await Orders.find({})
        .populate("userId")
        .sort({ createdAt: -1 }) 
        .skip(skip)
        .limit(limitNumber);

    res.status(200).json({
        message: "Orders retrieved successfully",
        data: orders,
        pagination: {
            totalOrders,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalOrders / limitNumber),
            pageSize: limitNumber,
        },
    });
});


// Get Order by Id 
const getOrderById = AsyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Orders.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order retrieved successfully", data: order });
});

// Update a Order
const updateOrder = AsyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { name, price, status, userId, chosenAddress, images, paymentOption, orderDelivery, } = req.body;

    // Find the Order by ID
    const order = await Orders.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    // Update fields if they exist in the request body
    if (name) order.name = name;
    if (price) order.price = price;
    if (status) order.status = status;
    if (userId) order.userId = userId;
    if (paymentOption) order.paymentOption = paymentOption;
    if (orderDelivery) order.orderDelivery = orderDelivery;

    
    // Update chosenAddress if provided
    if (chosenAddress) {
        order.chosenAddress = {
            address: chosenAddress.address || order.chosenAddress.address,
            addressDetails: chosenAddress.addressDetails || order.chosenAddress.addressDetails,
            city: chosenAddress.city || order.chosenAddress.city,
            postalCode: chosenAddress.postalCode || order.chosenAddress.postalCode,
            userName: chosenAddress.userName || order.chosenAddress.userName,
            userEmail: chosenAddress.userEmail || order.chosenAddress.userEmail,
            userPhone: chosenAddress.userPhone || order.chosenAddress.userPhone,
        };
    }

    // Update images if provided
    if (images && Array.isArray(images)) {
        order.images = images.map((img) => ({
            image: img.image || '',
            status: img.status || '',
        }));
    }

    // Save the updated order
    const updatedOrder = await order.save();

    res.status(200).json({ message: "Order updated successfully", data: updatedOrder });
});


// Delete an Order
const deleteOrder = AsyncHandler(async (req, res) => {
    const { orderId } = req.params;

    // Find and delete the Order
    const order = await Orders.findByIdAndDelete(orderId);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
        message: "Order deleted successfully",
        data: order,
    });
});

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
