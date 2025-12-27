const Product = require("../../../models/Product");

// @desc    Create a new product
// @route   POST /api/admin/products
// @access  Private (Admin)
const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      price,
      currency,
      stock,
      description,
      status,
      // specifications comes as JSON string if sent via FormData
      specifications,
    } = req.body;

    const crypto = require("crypto");

    // Auto-generate SKU
    const generatedSku = `PROD-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;
    const productSku = sku || generatedSku;

    // Check if SKU already exists
    const productExists = await Product.findOne({ sku: productSku });
    if (productExists) {
      return res
        .status(400)
        .json({ message: "Product with this SKU already exists" });
    }

    // Process uploaded files
    let media = [];
    if (req.files) {
      req.files.forEach((file) => {
        const fileType = file.mimetype.startsWith("video") ? "video" : "image";
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
          file.filename
        }`;
        media.push({ type: fileType, url: fileUrl });
      });
    }

    // Parse specifications if it's a string
    let parsedSpecs = [];
    if (specifications) {
      try {
        parsedSpecs = JSON.parse(specifications);
      } catch (e) {
        parsedSpecs = specifications;
      }
    }

    const product = await Product.create({
      name,
      sku: productSku,
      category,
      price,
      currency,
      stock,
      description,
      status,
      media,
      specifications: parsedSpecs,
    });

    if (product) {
      res.status(201).json(product);
    } else {
      res.status(400).json({ message: "Invalid product data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createProduct;
