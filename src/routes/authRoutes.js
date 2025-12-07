const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getMe,
} = require("../controllers/authController");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Placeholder for protected route
// router.get('/me', protect, getMe);

module.exports = router;
