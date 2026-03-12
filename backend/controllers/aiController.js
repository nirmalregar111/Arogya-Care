const Prediction = require('../models/Prediction');
const Patient = require('../models/Patient');

// ============================================================
// AI ENGINE — Rule-based medical prediction system
// Can be swapped for OpenAI API or Python ML model later
// ============================================================

function calculateDiseaseRisks(patient) {
  const { age, gender, symptoms, medical_history, lifestyle_data, vitals } = patient;
  const risks = [];

  // --- Diabetes Risk ---
  let diabetesRisk = 5;
  if (age > 45) diabetesRisk += 15;
  else if (age > 35) diabetesRisk += 8;
  if (medical_history?.includes('diabetes') || medical_history?.includes('family_diabetes')) diabetesRisk += 20;
  if (vitals?.blood_sugar > 140) diabetesRisk += 25;
  else if (vitals?.blood_sugar > 100) diabetesRisk += 12;
  if (vitals?.bmi > 30) diabetesRisk += 15;
  else if (vitals?.bmi > 25) diabetesRisk += 8;
  if (lifestyle_data?.exercise === 'sedentary') diabetesRisk += 10;
  if (lifestyle_data?.diet === 'poor') diabetesRisk += 8;
  if (symptoms?.includes('frequent_urination') || symptoms?.includes('excessive_thirst')) diabetesRisk += 15;
  risks.push({ name: 'Type 2 Diabetes', risk: `${Math.min(diabetesRisk, 95)}%`, severity: diabetesRisk > 50 ? 'high' : diabetesRisk > 25 ? 'medium' : 'low' });

  // --- Hypertension Risk ---
  let hyperRisk = 5;
  if (age > 50) hyperRisk += 15;
  else if (age > 40) hyperRisk += 8;
  if (vitals?.blood_pressure_systolic > 140) hyperRisk += 30;
  else if (vitals?.blood_pressure_systolic > 120) hyperRisk += 15;
  if (vitals?.blood_pressure_diastolic > 90) hyperRisk += 20;
  if (lifestyle_data?.smoking === 'regular' || lifestyle_data?.smoking === 'heavy') hyperRisk += 15;
  if (lifestyle_data?.alcohol === 'heavy') hyperRisk += 10;
  if (lifestyle_data?.exercise === 'sedentary') hyperRisk += 8;
  if (medical_history?.includes('hypertension')) hyperRisk += 20;
  if (symptoms?.includes('headache') || symptoms?.includes('dizziness')) hyperRisk += 8;
  risks.push({ name: 'Hypertension', risk: `${Math.min(hyperRisk, 95)}%`, severity: hyperRisk > 50 ? 'high' : hyperRisk > 25 ? 'medium' : 'low' });

  // --- Heart Disease Risk ---
  let heartRisk = 3;
  if (age > 55) heartRisk += 15;
  else if (age > 45) heartRisk += 8;
  if (gender === 'male') heartRisk += 5;
  if (vitals?.cholesterol > 240) heartRisk += 25;
  else if (vitals?.cholesterol > 200) heartRisk += 12;
  if (vitals?.blood_pressure_systolic > 140) heartRisk += 15;
  if (lifestyle_data?.smoking !== 'never') heartRisk += 15;
  if (lifestyle_data?.exercise === 'sedentary') heartRisk += 10;
  if (medical_history?.includes('heart_disease')) heartRisk += 25;
  if (symptoms?.includes('chest_pain') || symptoms?.includes('shortness_of_breath')) heartRisk += 20;
  risks.push({ name: 'Heart Disease', risk: `${Math.min(heartRisk, 95)}%`, severity: heartRisk > 50 ? 'high' : heartRisk > 25 ? 'medium' : 'low' });

  // --- Kidney Disease Risk ---
  let kidneyRisk = 3;
  if (age > 60) kidneyRisk += 12;
  if (vitals?.blood_pressure_systolic > 140) kidneyRisk += 10;
  if (vitals?.blood_sugar > 140) kidneyRisk += 15;
  if (medical_history?.includes('kidney_disease')) kidneyRisk += 25;
  if (symptoms?.includes('swelling') || symptoms?.includes('fatigue')) kidneyRisk += 10;
  if (lifestyle_data?.alcohol === 'heavy') kidneyRisk += 12;
  risks.push({ name: 'Kidney Disease', risk: `${Math.min(kidneyRisk, 95)}%`, severity: kidneyRisk > 50 ? 'high' : kidneyRisk > 25 ? 'medium' : 'low' });

  // --- Liver Disease Risk ---
  let liverRisk = 2;
  if (lifestyle_data?.alcohol === 'heavy') liverRisk += 30;
  else if (lifestyle_data?.alcohol === 'moderate') liverRisk += 10;
  if (vitals?.bmi > 30) liverRisk += 12;
  if (medical_history?.includes('liver_disease')) liverRisk += 20;
  if (symptoms?.includes('jaundice') || symptoms?.includes('abdominal_pain')) liverRisk += 15;
  risks.push({ name: 'Liver Disease', risk: `${Math.min(liverRisk, 95)}%`, severity: liverRisk > 50 ? 'high' : liverRisk > 25 ? 'medium' : 'low' });

  // --- Respiratory Disease Risk ---
  let respRisk = 3;
  if (lifestyle_data?.smoking === 'heavy') respRisk += 35;
  else if (lifestyle_data?.smoking === 'regular') respRisk += 20;
  else if (lifestyle_data?.smoking === 'former') respRisk += 8;
  if (symptoms?.includes('cough') || symptoms?.includes('shortness_of_breath') || symptoms?.includes('wheezing')) respRisk += 15;
  if (medical_history?.includes('asthma') || medical_history?.includes('copd')) respRisk += 20;
  risks.push({ name: 'Respiratory Disease', risk: `${Math.min(respRisk, 95)}%`, severity: respRisk > 50 ? 'high' : respRisk > 25 ? 'medium' : 'low' });

  return risks.sort((a, b) => parseInt(b.risk) - parseInt(a.risk));
}

function simulateTreatment(patient, treatments) {
  const results = {};
  const baseHealth = 50;

  treatments.forEach((treatment, idx) => {
    let improvement = baseHealth;
    const name = treatment.name || `Treatment ${String.fromCharCode(65 + idx)}`;

    // Treatment-specific boosts
    if (treatment.type === 'medication') improvement += 20;
    if (treatment.type === 'surgery') improvement += 35;
    if (treatment.type === 'lifestyle') improvement += 15;
    if (treatment.type === 'therapy') improvement += 18;

    // Patient factors
    if (patient.age < 40) improvement += 10;
    else if (patient.age > 60) improvement -= 10;

    if (patient.lifestyle_data?.exercise === 'active' || patient.lifestyle_data?.exercise === 'very_active') improvement += 8;
    if (patient.lifestyle_data?.smoking === 'never') improvement += 5;

    // Effectiveness factor
    if (treatment.effectiveness) improvement = Math.round(improvement * (treatment.effectiveness / 100));

    improvement = Math.min(Math.max(improvement, 10), 95);

    results[name] = {
      improvement: `${improvement}%`,
      duration: treatment.duration || '3-6 months',
      side_effects: treatment.side_effects || 'Minimal',
      cost_estimate: treatment.cost || 'Varies',
    };
  });

  // Determine recommended treatment
  const recommended = Object.entries(results).reduce((best, [name, data]) =>
    parseInt(data.improvement) > parseInt(best.improvement) ? { name, improvement: data.improvement } : best,
    { name: '', improvement: '0%' }
  );

  return { treatments: results, recommended: recommended.name };
}

function calculateLifestyleImpact(currentLifestyle, proposedChanges) {
  const impacts = [];

  // Exercise impact
  const exerciseLevels = { sedentary: 0, light: 1, moderate: 2, active: 3, very_active: 4 };
  const currentEx = exerciseLevels[currentLifestyle.exercise] || 0;
  const proposedEx = exerciseLevels[proposedChanges.exercise] || currentEx;
  if (proposedEx > currentEx) {
    const diff = proposedEx - currentEx;
    impacts.push({ factor: 'Exercise Increase', heart_disease: `-${diff * 10}%`, diabetes: `-${diff * 8}%`, overall_health: `+${diff * 12}%` });
  }

  // Smoking cessation impact
  const smokingLevels = { never: 0, former: 1, occasional: 2, regular: 3, heavy: 4 };
  const currentSmk = smokingLevels[currentLifestyle.smoking] || 0;
  const proposedSmk = smokingLevels[proposedChanges.smoking] || currentSmk;
  if (proposedSmk < currentSmk) {
    const diff = currentSmk - proposedSmk;
    impacts.push({ factor: 'Smoking Reduction', lung_disease: `-${diff * 15}%`, heart_disease: `-${diff * 10}%`, cancer_risk: `-${diff * 12}%` });
  }

  // Diet improvement
  const dietLevels = { poor: 0, average: 1, good: 2, excellent: 3 };
  const currentDiet = dietLevels[currentLifestyle.diet] || 0;
  const proposedDiet = dietLevels[proposedChanges.diet] || currentDiet;
  if (proposedDiet > currentDiet) {
    const diff = proposedDiet - currentDiet;
    impacts.push({ factor: 'Diet Improvement', diabetes: `-${diff * 12}%`, heart_disease: `-${diff * 8}%`, energy_level: `+${diff * 15}%` });
  }

  // Sleep improvement
  const currentSleep = currentLifestyle.sleep || 6;
  const proposedSleep = proposedChanges.sleep || currentSleep;
  if (proposedSleep > currentSleep && proposedSleep <= 9) {
    impacts.push({ factor: 'Better Sleep', mental_health: '+20%', immune_system: '+15%', stress_level: '-25%' });
  }

  // Alcohol reduction
  const alcoholLevels = { never: 0, occasional: 1, moderate: 2, heavy: 3 };
  const currentAlc = alcoholLevels[currentLifestyle.alcohol] || 0;
  const proposedAlc = alcoholLevels[proposedChanges.alcohol] || currentAlc;
  if (proposedAlc < currentAlc) {
    const diff = currentAlc - proposedAlc;
    impacts.push({ factor: 'Alcohol Reduction', liver_disease: `-${diff * 18}%`, heart_health: `+${diff * 8}%`, mental_clarity: `+${diff * 10}%` });
  }

  // Summary
  const totalHeartReduction = impacts.reduce((sum, i) => sum + (parseInt(i.heart_disease) || 0), 0);
  const totalDiabetesReduction = impacts.reduce((sum, i) => sum + (parseInt(i.diabetes) || 0), 0);

  return {
    changes: impacts,
    summary: {
      heart_disease_risk_change: `${totalHeartReduction}%`,
      diabetes_risk_change: `${totalDiabetesReduction}%`,
      overall_improvement: impacts.length > 0 ? 'Positive' : 'No significant changes',
    },
  };
}

function optimizeTreatmentCost(treatments) {
  const scored = treatments.map((t) => {
    const effectiveness = t.effectiveness || 50;
    const cost = t.cost || 10000;
    const score = (effectiveness / cost) * 10000;
    return {
      name: t.name,
      cost: `₹${cost.toLocaleString('en-IN')}`,
      effectiveness: `${effectiveness}%`,
      value_score: Math.round(score * 100) / 100,
      duration: t.duration || 'Varies',
    };
  });

  scored.sort((a, b) => b.value_score - a.value_score);

  return {
    treatments: scored,
    recommended: scored[0]?.name || 'N/A',
    recommendation_reason: `Best cost-effectiveness ratio with a value score of ${scored[0]?.value_score}`,
    savings: scored.length > 1
      ? `Up to ₹${Math.abs(parseInt(scored[scored.length - 1].cost.replace(/[₹,]/g, '')) - parseInt(scored[0].cost.replace(/[₹,]/g, ''))).toLocaleString('en-IN')} savings compared to most expensive option`
      : 'N/A',
  };
}

function generateHabitPlan(patient) {
  const plan = [];
  const lifestyle = patient?.lifestyle_data || {};

  // Week 1 — Foundation
  plan.push({ day: 1, habit: 'Walk 2000 steps after dinner', category: 'exercise', difficulty: 'easy' });
  plan.push({ day: 2, habit: 'Drink 8 glasses of water', category: 'nutrition', difficulty: 'easy' });
  plan.push({ day: 3, habit: 'Sleep by 10:30 PM', category: 'sleep', difficulty: 'easy' });
  plan.push({ day: 4, habit: 'Eat a fruit with breakfast', category: 'nutrition', difficulty: 'easy' });
  plan.push({ day: 5, habit: '5-minute morning stretching', category: 'exercise', difficulty: 'easy' });
  plan.push({ day: 6, habit: 'Track your meals today', category: 'mindfulness', difficulty: 'easy' });
  plan.push({ day: 7, habit: 'Reduce sugar in tea/coffee', category: 'nutrition', difficulty: 'medium' });

  // Week 2 — Building
  plan.push({ day: 8, habit: 'Walk 4000 steps', category: 'exercise', difficulty: 'easy' });
  plan.push({ day: 9, habit: 'Add salad to one meal', category: 'nutrition', difficulty: 'easy' });
  plan.push({ day: 10, habit: '10-minute meditation', category: 'mental_health', difficulty: 'medium' });
  plan.push({ day: 11, habit: 'Avoid fried food today', category: 'nutrition', difficulty: 'medium' });
  plan.push({ day: 12, habit: '15-minute brisk walk', category: 'exercise', difficulty: 'medium' });
  plan.push({ day: 13, habit: 'No screen time 1 hour before bed', category: 'sleep', difficulty: 'medium' });
  plan.push({ day: 14, habit: 'Strength training — basic bodyweight exercises', category: 'exercise', difficulty: 'medium' });

  // Week 3 — Intensifying
  plan.push({ day: 15, habit: 'Walk 6000 steps', category: 'exercise', difficulty: 'medium' });
  plan.push({ day: 16, habit: 'Cook a healthy meal from scratch', category: 'nutrition', difficulty: 'medium' });
  plan.push({ day: 17, habit: '20-minute yoga session', category: 'exercise', difficulty: 'medium' });
  plan.push({ day: 18, habit: 'Practice deep breathing (4-7-8 technique)', category: 'mental_health', difficulty: 'easy' });
  plan.push({ day: 19, habit: 'Replace one snack with nuts/seeds', category: 'nutrition', difficulty: 'easy' });
  plan.push({ day: 20, habit: '30-minute walk or cycling', category: 'exercise', difficulty: 'hard' });
  plan.push({ day: 21, habit: 'Full day of healthy eating', category: 'nutrition', difficulty: 'hard' });

  // Week 4 — Sustaining
  plan.push({ day: 22, habit: 'Walk 8000 steps', category: 'exercise', difficulty: 'hard' });
  plan.push({ day: 23, habit: 'Meal prep for the week', category: 'nutrition', difficulty: 'hard' });
  plan.push({ day: 24, habit: 'Join an online fitness class', category: 'exercise', difficulty: 'medium' });
  plan.push({ day: 25, habit: 'Journal your health progress', category: 'mindfulness', difficulty: 'easy' });
  plan.push({ day: 26, habit: 'Try a new healthy recipe', category: 'nutrition', difficulty: 'medium' });
  plan.push({ day: 27, habit: '30-minute workout', category: 'exercise', difficulty: 'hard' });
  plan.push({ day: 28, habit: 'Maintain all habits — full healthy day challenge!', category: 'all', difficulty: 'hard' });

  // Add personalized tips
  const tips = [];
  if (lifestyle.smoking !== 'never') tips.push('Consider reducing smoking gradually — even cutting 1 cigarette/day helps');
  if (lifestyle.exercise === 'sedentary') tips.push('Start slow! Even 10 minutes of walking daily reduces heart risk by 20%');
  if (lifestyle.diet === 'poor') tips.push('Focus on adding healthy foods rather than restricting — crowding out works better');
  if (lifestyle.sleep < 6) tips.push('Prioritize sleep — aim for 7-8 hours for optimal recovery and immunity');
  if (lifestyle.alcohol === 'heavy') tips.push('Try alcohol-free days — start with 2 days per week');

  return { plan, tips, total_days: 28, difficulty_progression: 'easy → medium → hard' };
}

// ============================================================
// CONTROLLER ENDPOINTS
// ============================================================

// @desc    Predict disease risks
// @route   POST /api/ai/predict-disease
exports.predictDisease = async (req, res, next) => {
  try {
    const { patient_id } = req.body;
    let patientData = req.body;

    // If patient_id provided, fetch from DB
    if (patient_id) {
      const patient = await Patient.findById(patient_id);
      if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
      patientData = patient;
    }

    const diseases = calculateDiseaseRisks(patientData);

    // Save prediction
    if (patient_id) {
      await Prediction.create({
        patient: patient_id,
        user: req.user._id,
        type: 'disease_prediction',
        input_data: patientData,
        result: { diseases },
      });
    }

    res.json({
      success: true,
      data: {
        diseases,
        analyzed_at: new Date().toISOString(),
        model: 'Arogya Care AI v2.0 — Rule-Based Medical Risk Engine',
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Simulate treatment outcomes
// @route   POST /api/ai/treatment-simulation
exports.treatmentSimulation = async (req, res, next) => {
  try {
    const { patient_id, treatments } = req.body;

    if (!treatments || !Array.isArray(treatments) || treatments.length === 0) {
      return res.status(400).json({ success: false, message: 'Treatments array is required' });
    }

    let patientData = req.body;
    if (patient_id) {
      const patient = await Patient.findById(patient_id);
      if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
      patientData = patient;
    }

    const result = simulateTreatment(patientData, treatments);

    if (patient_id) {
      await Prediction.create({
        patient: patient_id,
        user: req.user._id,
        type: 'treatment_simulation',
        input_data: { patient: patientData, treatments },
        result,
      });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Simulate lifestyle impact
// @route   POST /api/ai/lifestyle-impact
exports.lifestyleImpact = async (req, res, next) => {
  try {
    const { current_lifestyle, proposed_changes } = req.body;

    if (!current_lifestyle || !proposed_changes) {
      return res.status(400).json({ success: false, message: 'current_lifestyle and proposed_changes are required' });
    }

    const result = calculateLifestyleImpact(current_lifestyle, proposed_changes);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Optimize treatment costs
// @route   POST /api/ai/treatment-cost
exports.treatmentCost = async (req, res, next) => {
  try {
    const { treatments } = req.body;

    if (!treatments || !Array.isArray(treatments) || treatments.length === 0) {
      return res.status(400).json({ success: false, message: 'Treatments array is required' });
    }

    const result = optimizeTreatmentCost(treatments);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate habit plan
// @route   GET /api/ai/habit-plan
exports.habitPlan = async (req, res, next) => {
  try {
    let patientData = null;

    // Try to get patient data for personalized plan
    if (req.query.patient_id) {
      patientData = await Patient.findById(req.query.patient_id);
    }

    const result = generateHabitPlan(patientData);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Get prediction history
// @route   GET /api/ai/predictions
exports.getPredictions = async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.type) filter.type = req.query.type;
    if (req.query.patient_id) filter.patient = req.query.patient_id;

    const predictions = await Prediction.find(filter)
      .populate('patient', 'name patient_id')
      .sort('-createdAt')
      .limit(50);

    res.json({ success: true, count: predictions.length, data: predictions });
  } catch (error) {
    next(error);
  }
};
