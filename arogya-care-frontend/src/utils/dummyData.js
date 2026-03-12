export const dummyPatient = {
  name: 'Rahul Sharma',
  age: 42,
  gender: 'Male',
  email: 'rahul.sharma@email.com',
  phone: '+91 98765 43210',
  bloodGroup: 'B+',
  medicalHistory: 'Family history of diabetes, mild hypertension diagnosed 2 years ago',
  symptoms: ['Fatigue', 'Occasional headaches', 'Shortness of breath'],
  lifestyle: {
    exercise: 3,
    smoking: false,
    alcohol: 'Occasional',
    diet: 'Mixed',
    sleepHours: 6,
    stressLevel: 'Moderate',
  },
};

export const dummyHealthScore = {
  overall: 72,
  categories: {
    cardiovascular: 68,
    metabolic: 74,
    respiratory: 82,
    mental: 70,
    musculoskeletal: 78,
  },
  riskLevel: 'Moderate',
  trend: '+5% from last month',
};

export const dummyDashboardData = {
  healthScore: 72,
  riskLevel: 'Moderate',
  symptoms: ['Fatigue', 'Headaches', 'High BP'],
  recommendations: [
    { id: 1, text: 'Increase daily walking to 5000 steps', priority: 'high', icon: 'footprints' },
    { id: 2, text: 'Reduce sodium intake to under 2g/day', priority: 'high', icon: 'utensils' },
    { id: 3, text: 'Practice 10 min daily meditation', priority: 'medium', icon: 'brain' },
    { id: 4, text: 'Schedule blood pressure monitoring', priority: 'medium', icon: 'activity' },
    { id: 5, text: 'Get 7-8 hours of sleep nightly', priority: 'low', icon: 'moon' },
  ],
  healthProgressData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Health Score',
        data: [58, 62, 64, 68, 70, 72],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Risk Level',
        data: [75, 70, 68, 62, 58, 55],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  },
  weeklyActivity: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Steps (x1000)',
        data: [3.2, 4.5, 2.8, 5.1, 4.0, 6.2, 3.5],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
        borderRadius: 6,
      },
    ],
  },
  vitalStats: [
    { label: 'Heart Rate', value: '78 bpm', status: 'normal', icon: 'heart' },
    { label: 'Blood Pressure', value: '138/88', status: 'elevated', icon: 'activity' },
    { label: 'Blood Sugar', value: '110 mg/dL', status: 'normal', icon: 'droplets' },
    { label: 'BMI', value: '26.4', status: 'overweight', icon: 'scale' },
  ],
};

export const dummyTreatmentComparison = [
  {
    id: 'A',
    name: 'Treatment A - Medication Therapy',
    description: 'Standard pharmaceutical approach with ACE inhibitors and statins',
    improvement: 65,
    recoveryTime: '6 months',
    cost: 15000,
    sideEffects: ['Mild dizziness', 'Dry cough'],
    effectiveness: 'High',
    isRecommended: false,
  },
  {
    id: 'B',
    name: 'Treatment B - Integrated Therapy',
    description: 'Combined lifestyle modification with minimal medication and AI monitoring',
    improvement: 85,
    recoveryTime: '4 months',
    cost: 5000,
    sideEffects: ['None significant'],
    effectiveness: 'Very High',
    isRecommended: true,
  },
  {
    id: 'C',
    name: 'Treatment C - Surgical Intervention',
    description: 'Minimally invasive procedure with post-op rehabilitation',
    improvement: 90,
    recoveryTime: '3 months',
    cost: 50000,
    sideEffects: ['Post-surgical pain', 'Recovery downtime'],
    effectiveness: 'Highest',
    isRecommended: false,
  },
];

export const dummyDiseasePredictions = [
  { disease: 'Kidney Disease', risk: 40, onset: '8 years', trend: 'stable', color: '#F59E0B' },
  { disease: 'Hypertension', risk: 35, onset: '3 years', trend: 'increasing', color: '#EF4444' },
  { disease: 'Type 2 Diabetes', risk: 28, onset: '5 years', trend: 'decreasing', color: '#8B5CF6' },
  { disease: 'Coronary Artery Disease', risk: 22, onset: '10 years', trend: 'stable', color: '#2563EB' },
  { disease: 'Osteoporosis', risk: 15, onset: '12 years', trend: 'stable', color: '#22C55E' },
];

export const dummyLifestyleImpact = {
  baseline: {
    heartDiseaseRisk: 45,
    diabetesRisk: 38,
    hypertensionRisk: 55,
    overallHealth: 62,
  },
  exerciseImpact: {
    0: { heartDisease: 50, diabetes: 42, hypertension: 60, overall: 55 },
    1: { heartDisease: 45, diabetes: 38, hypertension: 55, overall: 62 },
    2: { heartDisease: 40, diabetes: 34, hypertension: 50, overall: 68 },
    3: { heartDisease: 35, diabetes: 30, hypertension: 45, overall: 73 },
    4: { heartDisease: 28, diabetes: 25, hypertension: 38, overall: 78 },
    5: { heartDisease: 22, diabetes: 20, hypertension: 32, overall: 83 },
  },
  smokingImpact: {
    true: { heartDisease: 15, diabetes: 8, hypertension: 12, overall: -15 },
    false: { heartDisease: 0, diabetes: 0, hypertension: 0, overall: 0 },
  },
  dietImpact: {
    'Poor': { heartDisease: 10, diabetes: 12, hypertension: 8, overall: -10 },
    'Average': { heartDisease: 0, diabetes: 0, hypertension: 0, overall: 0 },
    'Healthy': { heartDisease: -8, diabetes: -10, hypertension: -6, overall: 8 },
    'Excellent': { heartDisease: -15, diabetes: -18, hypertension: -12, overall: 15 },
  },
};

export const dummyCostComparison = [
  {
    treatment: 'Treatment A - ACE Inhibitors',
    monthlyCost: 15000,
    effectiveness: 'High',
    duration: '6 months',
    totalCost: 90000,
    insuranceCoverage: '60%',
    outOfPocket: 36000,
    rating: 3.5,
  },
  {
    treatment: 'Treatment B - Lifestyle + Minimal Meds',
    monthlyCost: 5000,
    effectiveness: 'Similar',
    duration: '4 months',
    totalCost: 20000,
    insuranceCoverage: '40%',
    outOfPocket: 12000,
    rating: 4.5,
    isRecommended: true,
  },
  {
    treatment: 'Treatment C - Advanced Therapy',
    monthlyCost: 25000,
    effectiveness: 'Highest',
    duration: '3 months',
    totalCost: 75000,
    insuranceCoverage: '70%',
    outOfPocket: 22500,
    rating: 4.0,
  },
];

export const dummyHabitPlan = [
  { day: 1, task: 'Walk 200 steps after each meal', category: 'exercise', completed: true },
  { day: 2, task: 'Drink 8 glasses of water', category: 'hydration', completed: true },
  { day: 3, task: 'Practice deep breathing for 5 minutes', category: 'mental', completed: true },
  { day: 4, task: 'Replace one snack with fruit', category: 'diet', completed: true },
  { day: 5, task: 'Walk 500 steps after dinner', category: 'exercise', completed: false },
  { day: 7, task: 'Reduce sugar intake by 50%', category: 'diet', completed: false },
  { day: 10, task: 'Start 10-minute morning yoga', category: 'exercise', completed: false },
  { day: 14, task: 'Begin strength training (light)', category: 'exercise', completed: false },
  { day: 18, task: 'Add leafy greens to every meal', category: 'diet', completed: false },
  { day: 21, task: 'Maintain 7 hours sleep routine', category: 'sleep', completed: false },
  { day: 25, task: 'Walk 2000 steps daily', category: 'exercise', completed: false },
  { day: 30, task: 'Complete monthly health check-in', category: 'checkup', completed: false },
];
