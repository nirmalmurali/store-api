const Product = require("../../../models/Product");

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private (Admin)
const getProducts = async (req, res) => {
  try {
    const { keyword, status, minPrice, maxPrice, minStock, maxStock } =
      req.query;

    let query = {};

    // Search by product name (case-insensitive)
    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    // Filter by status
    if (status && status !== "all") {
      query.status = status;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by stock range
    if (minStock || maxStock) {
      query.stock = {};
      if (minStock) query.stock.$gte = Number(minStock);
      if (maxStock) query.stock.$lte = Number(maxStock);
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getProducts;
