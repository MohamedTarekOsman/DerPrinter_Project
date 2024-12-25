const express = require("express");
const { getAllCategories, createCategory, updateCategory, deleteCategory, getCategoryById } = require("../controllers/Categories/crud");
const upload = require("../controllers/upload");


const router = express.Router();

router.get("/", getAllCategories); // Get all categories
router.get("/:categoryId",  getCategoryById);
router.post("/", upload.single("image"), createCategory); // Create a category
router.patch("/:categoryId", upload.single("image"), updateCategory); // Update a category
router.delete("/:categoryId", deleteCategory); // Delete a category

module.exports = router;
