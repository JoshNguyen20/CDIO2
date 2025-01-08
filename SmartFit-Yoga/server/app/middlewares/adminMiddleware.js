const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== 'Admin') {
      return res
        .status(403)
        .json({ message: 'Forbidden: Admin access required.' });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Unable to process request.' });
  }
};

module.exports = adminMiddleware;
