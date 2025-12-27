// @desc    Get admin data
// @route   GET /api/admin/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = getMe;
