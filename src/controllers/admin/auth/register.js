const Admin = require("../../../models/Admin");
const generateToken = require("../../../utils/generateToken");

// @desc    Register new admin
// @route   POST /api/admin/auth/register
// @access  Public
const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password,
    });

    if (admin) {
      res.status(201).json({
        _id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: "Invalid admin data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerAdmin;
