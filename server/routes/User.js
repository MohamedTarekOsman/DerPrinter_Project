const express = require('express');
const { signIn, signUp, facebookLogin } = require('../controllers/User/authController');
const { addRating } = require('../controllers/User/addRatingController');
const { getAllUsers, deleteUser, getUserById } = require('../controllers/User/crud');
const { addToCart } = require('../controllers/User/addToCartController');
const upload = require('../controllers/upload');
const { deleteFromCart } = require('../controllers/User/deleteFromCartController');
const { addAddress, deleteAddress } = require('../controllers/User/addAddressController');
const { updateCartOptions } = require('../controllers/User/addCartOptions');
const { clearCartAndResetUser } = require('../controllers/User/clearCartController');
const router = express.Router();


// Routes
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.delete("/:userId", deleteUser);
router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/facebook', facebookLogin);
router.post("/cart/:userId",upload.single("image"), addToCart); 
router.delete("/cart/:userId", deleteFromCart); 
router.patch('/rating/:userId', addRating);
router.patch('/addAddress/:userId', addAddress);
router.patch('/cartOptions/:userId', updateCartOptions);
router.post('/clear-cart/:id', clearCartAndResetUser);
router.delete("/:userId/address/:addressId", deleteAddress);

module.exports = router;