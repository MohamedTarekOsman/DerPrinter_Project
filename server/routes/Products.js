const express = require("express");
const upload = require("../controllers/upload");
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductById } = require("../controllers/Products/crud");



const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.patch("/:productId", upload.single("image"), updateProduct); 
router.delete("/:productId", deleteProduct);
module.exports = router;
