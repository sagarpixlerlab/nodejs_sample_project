const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['web', 'android', 'ios'],
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isValid: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-delete expired tokens after 30 days
TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model('Token', TokenSchema);