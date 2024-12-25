const express = require("express");
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require("../controllers/Orders/crud");
const upload = require("../controllers/upload");
const updateOrderImage = require("../controllers/Orders/updateOrderImageController");


const router = express.Router();

router.post("/",upload.single("image"),createOrder);
router.get("/", getAllOrders);
router.get("/:orderId", getOrderById);
router.patch("/:orderId",upload.single("image"), updateOrder); 
router.delete("/:orderId", deleteOrder);
router.patch('/:orderId/images/:imageId',upload.single("image"), updateOrderImage);
module.exports = router;
