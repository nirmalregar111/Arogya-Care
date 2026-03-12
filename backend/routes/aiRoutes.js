const express = require('express');
const {
  predictDisease,
  treatmentSimulation,
  lifestyleImpact,
  treatmentCost,
  habitPlan,
  getPredictions,
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/predict-disease', predictDisease);
router.post('/treatment-simulation', treatmentSimulation);
router.post('/lifestyle-impact', lifestyleImpact);
router.post('/treatment-cost', treatmentCost);
router.get('/habit-plan', habitPlan);
router.get('/predictions', getPredictions);

module.exports = router;
