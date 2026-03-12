const express = require('express');
const {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
  uploadReport,
  getReports,
} = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getPatients).post(createPatient);
router.route('/:id').get(getPatient).put(updatePatient).delete(deletePatient);
router.route('/:id/reports').get(getReports).post(upload.single('file'), uploadReport);

module.exports = router;
