const mongoose = require('mongoose');

const lifestyleSchema = new mongoose.Schema(
  {
    exercise: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
      default: 'sedentary',
    },
    smoking: {
      type: String,
      enum: ['never', 'former', 'occasional', 'regular', 'heavy'],
      default: 'never',
    },
    alcohol: {
      type: String,
      enum: ['never', 'occasional', 'moderate', 'heavy'],
      default: 'never',
    },
    sleep: {
      type: Number,
      min: 0,
      max: 24,
      default: 7,
    },
    diet: {
      type: String,
      enum: ['poor', 'average', 'good', 'excellent'],
      default: 'average',
    },
  },
  { _id: false }
);

const patientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    patient_id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [0, 'Age must be positive'],
      max: [150, 'Age seems invalid'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required'],
    },
    phone: {
      type: String,
      trim: true,
    },
    blood_group: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''],
      default: '',
    },
    height: Number,
    weight: Number,
    symptoms: [String],
    medical_history: [String],
    allergies: [String],
    current_medications: [String],
    lifestyle_data: {
      type: lifestyleSchema,
      default: () => ({}),
    },
    lab_reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report',
      },
    ],
    vitals: {
      blood_pressure_systolic: Number,
      blood_pressure_diastolic: Number,
      heart_rate: Number,
      blood_sugar: Number,
      cholesterol: Number,
      bmi: Number,
    },
  },
  { timestamps: true }
);

// Auto-generate patient_id before saving
patientSchema.pre('save', async function (next) {
  if (!this.patient_id) {
    const count = await mongoose.model('Patient').countDocuments();
    this.patient_id = `PAT-${String(count + 1).padStart(6, '0')}`;
  }
  // Auto-calculate BMI
  if (this.height && this.weight) {
    const heightInM = this.height / 100;
    this.vitals = this.vitals || {};
    this.vitals.bmi = parseFloat((this.weight / (heightInM * heightInM)).toFixed(1));
  }
  next();
});

module.exports = mongoose.model('Patient', patientSchema);
