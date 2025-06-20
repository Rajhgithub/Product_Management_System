const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { isLoggedIn } = require("../controllers/userController");

router.get("/", productController.getAllProducts);
router.post("/", isLoggedIn, productController.addProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", isLoggedIn, productController.updateProduct);
router.delete("/:id", isLoggedIn, productController.deleteProduct);

module.exports = router;

