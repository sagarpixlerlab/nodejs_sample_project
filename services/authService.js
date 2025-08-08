// const User = require('../models/User');
// const Token = require('../models/Token');
const {User, Token} = require('../models');
const { jwtSecret, jwtExpiration } = require('../config/config');
const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiration
  });
};

exports.register = async (userData) => {
  const { name, email, password, role } = userData;
  
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user'
  });

  // Generate token
  const token = signToken(user._id);

  return { user, token };
};

exports.login = async (email, password, deviceType = 'web') => {
  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Incorrect email or password');
  }

  // Generate token
  const token = signToken(user._id);
  const decoded = jwt.verify(token, jwtSecret);

  // Store token in database
  // const EToken = Token.find({
  //   type : deviceType,
  // });

  await Token.create({
    token,
    userId: user._id,
    type: deviceType,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    isValid: true
  });

  return { user, token };
};

exports.logout = async (token) => {
  await Token.findOneAndUpdate(
    { token },
    { isValid: false }
  );
};

exports.getMe = async (userId) => {
  return await User.findById(userId);
};