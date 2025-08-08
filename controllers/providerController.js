exports.getDashboard = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: 'Provider Dashboard Data'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};