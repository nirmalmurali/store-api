const Product = require("../../../models/Product");

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private (Admin)
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      currency,
      stock,
      description,
      status,
      specifications,
      existingMedia, // JSON string of existing media to keep
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Process new uploaded files
    let newMedia = [];
    if (req.files) {
      req.files.forEach((file) => {
        const fileType = file.mimetype.startsWith("video") ? "video" : "image";
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
          file.filename
        }`;
        newMedia.push({ type: fileType, url: fileUrl });
      });
    }

    // Process existing media
    let currentMedia = [];
    if (existingMedia) {
      try {
        currentMedia = JSON.parse(existingMedia);
      } catch (e) {
        currentMedia = [];
      }
    }

    // Combine media (Existing + New)
    const updatedMedia = [...currentMedia, ...newMedia];

    // Parse specifications
    let parsedSpecs = [];
    if (specifications) {
      try {
        parsedSpecs = JSON.parse(specifications);
      } catch (e) {
        parsedSpecs = specifications;
      }
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price || product.price;
    product.currency = currency || product.currency;
    product.stock = stock || product.stock;
    product.description = description || product.description;
    product.status = status || product.status;
    product.media = updatedMedia;
    product.specifications = parsedSpecs;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateProduct;
