const AsyncHandler = require("express-async-handler");
const Categories = require("../../models/Categories");
const Products = require("../../models/Products");

// Create a category
const createCategory = AsyncHandler(async (req, res) => {
    const { name, headLine,prop1,prop2,prop3,products,title,description1,description2 } = req.body;
    const image = req.file ? req.file.path : null;

    // Validate and check product IDs
    const productIds = products ? JSON.parse(products) : [];
    const validProducts = await Products.find({ _id: { $in: productIds } });
    if (validProducts.length !== productIds.length) {
        return res.status(400).json({ message: "One or more product IDs are invalid." });
    }

    const newCategory = await Categories.create({
        name,
        headLine,
        prop1,
        prop2,
        prop3,
        image,
        title,
        description1,
        description2,
        products: productIds,
    });

    res.status(201).json({
        message: "Category created successfully",
        data: newCategory,
    });
});

// Get all categories
const getAllCategories = AsyncHandler(async (req, res) => {
    const categories = await Categories.find().populate("products");
    res.status(200).json({
        message: "Categories fetched successfully",
        data: categories,
    });
});

// Get product by Id 
const getCategoryById = AsyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const category = await Categories.findById(categoryId);
    if (!category) {
        return res.status(404).json({ message: "category not found" });
    }

    res.status(200).json({ message: "category retrieved successfully", data: category });
});
// update category
const updateCategory = AsyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { name, headLine,prop1,prop2,prop3,products,title,description1,description2 } = req.body;

    const category = await Categories.findById(categoryId);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    // Validate and check product IDs if provided
    const productIds = products ? JSON.parse(products) : [];
    if (productIds.length > 0) {
        const validProducts = await Products.find({ _id: { $in: productIds } });
        if (validProducts.length !== productIds.length) {
            return res.status(400).json({ message: "One or more product IDs are invalid." });
        }
        category.products = productIds;
    }

    // Update fields
    if (name) category.name = name;
    if (title) category.title = title;
    if (headLine) category.headLine = headLine;
    if (prop1) category.prop1 = prop1;
    if (prop2) category.prop2 = prop2;
    if (prop3) category.prop3 = prop3;
    if (description1) category.description1 = description1;
    if (description2) category.description2 = description2;
    if (req.file) category.image = req.file.path; // Update image if a new file is uploaded

    const updatedCategory = await category.save();

    res.status(200).json({
        message: "Category updated successfully",
        data: updatedCategory,
    });
});

//delete category
const deleteCategory = AsyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const category = await Categories.findByIdAndDelete(categoryId);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
        message: "Category deleted successfully",
        data: category,
    });
});

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};