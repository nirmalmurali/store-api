const express = require("express");
const router = express.Router();
const registerAdmin = require("../../controllers/admin/auth/register");
const loginAdmin = require("../../controllers/admin/auth/login");
const getMe = require("../../controllers/admin/auth/getMe");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Placeholder for protected route
// router.get('/me', protect, getMe);

module.exports = router;
