const express = require("express");
const upload = require("../controllers/upload"); // Assumes you have a middleware for file uploads
const Blog = require("../models/Blog");

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
    }
});


// get blog by id
router.get("/:blogId", async (req, res) => {
    try {
        const {blogId}=req.params;
        const blog = await Blog.findById(blogId);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
    }
});



// Create a new blog
router.post("/", upload.fields([{ name: "image1" }, { name: "image2" }]), async (req, res) => {
    try {
        const {
            name,
            title,
            description1,
            description2,
            description3,
            category,
            link,
        } = req.body;

        const image1 = req.files?.image1?.[0]?.path || null;
        const image2 = req.files?.image2?.[0]?.path || null;

        const newBlog = new Blog({
            image1,
            image2,
            name,
            title,
            description1,
            description2,
            description3,
            category,
            link,
        });

        await newBlog.save();
        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
});

// Update a blog
router.patch("/:id", upload.fields([{ name: "image1" }, { name: "image2" }]), async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            title,
            description1,
            description2,
            description3,
            category,
            link,
        } = req.body;

        const image1 = req.files?.image1?.[0]?.path;
        const image2 = req.files?.image2?.[0]?.path;

        const updatedData = {
            name,
            title,
            description1,
            description2,
            description3,
            category,
            link,
        };

        if (image1) updatedData.image1 = image1;
        if (image2) updatedData.image2 = image2;

        const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error });
    }
});

// Delete a blog
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error });
    }
});

module.exports = router;
