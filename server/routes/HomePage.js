const express = require("express");
const upload = require("../controllers/upload");
const HomePage = require("../models/HomePage");
const router = express.Router();


// Create a new HomePage entry
router.post("/", upload.fields([
    { name: "slider1.image" },
    { name: "slider2.image" },
    { name: "slider3.image" },
    { name: "slider4.image" },
    { name: "AboutSection.image" },
    { name: "HintSection.image" }
]), async (req, res) => {
    try {
        const data = req.body;

        // Initialize nested objects if they don't exist
        data.slider1 = data.slider1 || {};
        data.slider2 = data.slider2 || {};
        data.slider3 = data.slider3 || {};
        data.slider4 = data.slider4 || {};
        data.AboutSection = data.AboutSection || {};
        data.HintSection= data.HintSection || {};

        // Handle file uploads
        if (req.files["slider1.image"]) data.slider1.image = req.files["slider1.image"][0].path;
        if (req.files["slider2.image"]) data.slider2.image = req.files["slider2.image"][0].path;
        if (req.files["slider3.image"]) data.slider3.image = req.files["slider3.image"][0].path;
        if (req.files["slider4.image"]) data.slider4.image = req.files["slider4.image"][0].path;
        if (req.files["AboutSection.image"]) data.AboutSection.image = req.files["AboutSection.image"][0].path;
        if (req.files["HintSection.image"]) data.HintSection.image = req.files["HintSection.image"][0].path;

        const homePage = new HomePage(data);
        const savedHomePage = await homePage.save();
        res.status(201).json(savedHomePage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get all HomePage entries
router.get("/", async (req, res) => {
    try {
        const homePages = await HomePage.find();
        res.status(200).json(homePages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a HomePage entry by ID
router.patch(
    "/:id",
    upload.fields([
      { name: "slider1.image" },
      { name: "slider2.image" },
      { name: "slider3.image" },
      { name: "slider4.image" },
      { name: "AboutSection.image" },
      { name: "HintSection.image" }
    ]),
    async (req, res) => {
      try {
        const { id } = req.params;
  
        // Fetch files and data from the request
        const updates = {};
  
        if (req.files["slider1.image"]) {
          updates["slider1.image"] = req.files["slider1.image"][0].path;
        }
        if (req.files["slider2.image"]) {
          updates["slider2.image"] = req.files["slider2.image"][0].path;
        }
        if (req.files["slider3.image"]) {
          updates["slider3.image"] = req.files["slider3.image"][0].path;
        }
        if (req.files["slider4.image"]) {
          updates["slider4.image"] = req.files["slider4.image"][0].path;
        }
        if (req.files["AboutSection.image"]) {
          updates["AboutSection.image"] = req.files["AboutSection.image"][0].path;
        }
        if (req.files["HintSection.image"]) {
          updates["HintSection.image"] = req.files["HintSection.image"][0].path;
        }
  
        // Handle updates for string values
        Object.keys(req.body).forEach((key) => {
          if (key.startsWith("slider1.") || key.startsWith("slider2.") || key.startsWith("slider3.") || key.startsWith("slider4.") || key.startsWith("AboutSection.")|| key.startsWith("HintSection.")) {
            updates[key] = req.body[key];
          }
        });
  
        // Perform the update
        const updatedHomePage = await HomePage.findByIdAndUpdate(
          id,
          { $set: updates }, // Use $set to update specific fields
          { new: true } // Return the updated document
        );
  
        if (!updatedHomePage) {
          return res.status(404).json({ error: "HomePage entry not found" });
        }
  
        res.status(200).json(updatedHomePage);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  );
  
  



router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const homePage = await HomePage.findByIdAndDelete(id);
        res.status(200).json({message :"home page Deleted Successfully", data : homePage});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
