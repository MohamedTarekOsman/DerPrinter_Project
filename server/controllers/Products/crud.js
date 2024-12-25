const AsyncHandler = require("express-async-handler");
const Products = require("../../models/Products");

// Create a new product
const createProduct = AsyncHandler(async (req, res) => {
    const { name, properties,options,categoryId,bestSeller,SalePercent } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    // The image URL is provided by Cloudinary through multer
    const image = req.file ? req.file.path : null;

    // Create the product
    const product = await Products.create({
        name,
        categoryId,
        properties: properties ? JSON.parse(properties) : [],
        options: options ? JSON.parse(options) :[],
        image,
        bestSeller,
        SalePercent
    });

    res.status(201).json({ message: "Product created successfully", data: product });
});


// Get all products
const getAllProducts = AsyncHandler(async (req, res) => {
    const products = await Products.find({});
    res.status(200).json({ message: "Products retrieved successfully", data: products });
});

// Get product by Id 
const getProductById = AsyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Products.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product retrieved successfully", data: product });
});

// Update a product
const updateProduct = AsyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { name, properties, options,categoryId,bestSeller,SalePercent } = req.body;

    // Find the product by ID
    const product = await Products.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Update fields
    if (name) product.name = name;
    if (categoryId) product.categoryId = categoryId;
    if (bestSeller !== undefined) product.bestSeller = bestSeller;
    if (SalePercent) product.SalePercent = SalePercent;
    if (properties) product.properties = properties; // Parse properties if sent as JSON
    if (options) product.options = options; // Parse properties if sent as JSON
    if (req.file) product.image = req.file.path; // Update the image if a new file is uploaded

    const updatedProduct = await product.save();

    res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
});

// Delete a product
const deleteProduct = AsyncHandler(async (req, res) => {
    const { productId } = req.params;

    // Find and delete the product
    const product = await Products.findByIdAndDelete(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
        message: "Product deleted successfully",
        data: product,
    });
});

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
