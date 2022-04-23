const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getProducts).post(addProduct);
router.route("/:uuid").put(updateProduct).get(getProduct).delete(deleteProduct);

module.exports = router;
