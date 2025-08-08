const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const { user, token } = await authService.register(req.body);
    
    res.status(201).json({
      success: true,
      token,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, deviceType = 'web' } = req.body;
    const { user, token } = await authService.login(email, password, deviceType);
    
    res.status(200).json({
      success: true,
      token,
      data: user
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await authService.logout(token);
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message
    });
  }
};