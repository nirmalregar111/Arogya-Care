const Patient = require('../models/Patient');
const Report = require('../models/Report');

// @desc    Create patient profile
// @route   POST /api/patients
exports.createPatient = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const patient = await Patient.create(req.body);
    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all patients (for current user, or all for doctors)
// @route   GET /api/patients
exports.getPatients = async (req, res, next) => {
  try {
    const filter = req.user.role === 'doctor' ? {} : { user: req.user._id };
    const patients = await Patient.find(filter)
      .populate('user', 'name email')
      .populate('lab_reports')
      .sort('-createdAt');
    res.json({ success: true, count: patients.length, data: patients });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single patient
// @route   GET /api/patients/:id
exports.getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('user', 'name email')
      .populate('lab_reports');

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Authorization check
    if (req.user.role !== 'doctor' && patient.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this patient' });
    }

    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
exports.updatePatient = async (req, res, next) => {
  try {
    let patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role !== 'doctor' && patient.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this patient' });
    }

    patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete patient
// @route   DELETE /api/patients/:id
exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (req.user.role !== 'doctor' && patient.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this patient' });
    }

    await Patient.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Patient deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload lab report
// @route   POST /api/patients/:id/reports
exports.uploadReport = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    const report = await Report.create({
      patient: patient._id,
      user: req.user._id,
      title: req.body.title || req.file.originalname,
      type: req.body.type || 'other',
      file_path: req.file.path,
      file_name: req.file.originalname,
      file_size: req.file.size,
      mime_type: req.file.mimetype,
      notes: req.body.notes || '',
    });

    patient.lab_reports.push(report._id);
    await patient.save();

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient reports
// @route   GET /api/patients/:id/reports
exports.getReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ patient: req.params.id }).sort('-createdAt');
    res.json({ success: true, count: reports.length, data: reports });
  } catch (error) {
    next(error);
  }
};
