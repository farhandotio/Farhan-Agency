import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  // 1. Geography (Location)
  country: { type: String, default: 'Unknown' },
  city: { type: String, default: 'Unknown' },
  region: { type: String, default: 'Unknown' },
  timezone: { type: String },

  // 2. Device & System Information
  device: { type: String },
  os: { type: String },
  browser: { type: String },
  screenResolution: { type: String },

  // 3. User Behavior & Session
  pageVisited: { type: String },
  referrer: { type: String },
  sessionDuration: { type: Number },
  isNewVisitor: { type: Boolean, default: true },

  // 4. Identity (Optional/Safe)
  ipAddress: { type: String },
  language: { type: String },

  count: { type: Number, default: 1 },

  // 5. Timestamps
  timestamp: { type: Date, default: Date.now },
});

const visitorModel = mongoose.model('visitor', visitorSchema);
export default visitorModel;
