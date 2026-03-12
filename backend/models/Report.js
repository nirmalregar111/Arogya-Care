const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Report title is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['blood_test', 'urine_test', 'imaging', 'ecg', 'other'],
      default: 'other',
    },
    file_path: {
      type: String,
      required: [true, 'File path is required'],
    },
    file_name: {
      type: String,
      required: true,
    },
    file_size: Number,
    mime_type: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
