const express = require("express");
const router = express.Router();
const createProduct = require("../../controllers/admin/product/createProduct");
const getProducts = require("../../controllers/admin/product/getProducts");
const getProductById = require("../../controllers/admin/product/getProductById");
const updateProduct = require("../../controllers/admin/product/updateProduct");
const deleteProduct = require("../../controllers/admin/product/deleteProduct");
const { protect } = require("../../middleware/authMiddleware");

const upload = require("../../middleware/uploadMiddleware");

router
  .route("/")
  .post(protect, upload.array("mediaFiles"), createProduct)
  .get(protect, getProducts);
router
  .route("/:id")
  .get(protect, getProductById)
  .put(protect, upload.array("mediaFiles"), updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
