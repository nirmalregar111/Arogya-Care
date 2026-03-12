const ChatMessage = require('../models/ChatMessage');
const crypto = require('crypto');

// ============================================================
// AI Chatbot Engine — Rule-based healthcare assistant
// Can be upgraded to OpenAI GPT integration
// ============================================================

const healthKnowledge = {
  headache: {
    reply: 'Headaches can be caused by dehydration, stress, poor sleep, eye strain, or tension. Try drinking water, resting in a dark room, and applying a cold compress. If headaches are severe, recurring, or accompanied by vision changes, please consult a doctor immediately.',
    severity: 'low',
    suggestions: ['Stay hydrated', 'Rest in a quiet, dark room', 'Try OTC pain relief', 'Track headache triggers'],
  },
  fever: {
    reply: 'Fever is your body\'s natural response to infection. Stay hydrated, rest well, and monitor your temperature. If fever exceeds 103°F (39.4°C), persists beyond 3 days, or is accompanied by severe symptoms, seek medical attention immediately.',
    severity: 'medium',
    suggestions: ['Drink plenty of fluids', 'Rest adequately', 'Monitor temperature regularly', 'Use light clothing'],
  },
  cough: {
    reply: 'Coughs can be caused by viral infections, allergies, asthma, or irritants. A dry cough might indicate allergies or viral infection, while a productive cough could suggest a bacterial infection. If cough persists beyond 2 weeks or produces blood, consult a doctor.',
    severity: 'low',
    suggestions: ['Stay hydrated', 'Use honey and warm water', 'Avoid irritants', 'Steam inhalation can help'],
  },
  chest_pain: {
    reply: '⚠️ Chest pain can be serious. It may indicate heart issues, muscle strain, acid reflux, or anxiety. If the pain is sudden, severe, radiates to arm/jaw, or comes with shortness of breath — CALL EMERGENCY SERVICES IMMEDIATELY (112 in India). Do not ignore chest pain.',
    severity: 'high',
    suggestions: ['Seek immediate medical attention', 'Call emergency services if severe', 'Do not exert yourself', 'Chew an aspirin if heart attack suspected'],
  },
  stomach_pain: {
    reply: 'Stomach pain can result from indigestion, gas, acidity, food poisoning, or more serious conditions. Try eating light foods, avoid spicy/oily food, and stay hydrated. If pain is severe, persistent, or accompanied by vomiting blood, seek medical care.',
    severity: 'medium',
    suggestions: ['Eat light, bland foods', 'Avoid spicy and oily food', 'Try antacids for acidity', 'Consult a doctor if persistent'],
  },
  fatigue: {
    reply: 'Chronic fatigue can be caused by poor sleep, stress, nutritional deficiencies (iron, B12, vitamin D), thyroid issues, or diabetes. Ensure 7-8 hours of quality sleep, maintain a balanced diet, and exercise regularly. If fatigue persists, get blood work done.',
    severity: 'low',
    suggestions: ['Improve sleep quality', 'Check for nutritional deficiencies', 'Exercise regularly', 'Manage stress levels'],
  },
  diabetes: {
    reply: 'Diabetes management involves regular blood sugar monitoring, a balanced diet low in refined carbs, regular exercise, and medication adherence. Key symptoms include excessive thirst, frequent urination, blurred vision, and slow wound healing. Regular HbA1c tests every 3 months are recommended.',
    severity: 'medium',
    suggestions: ['Monitor blood sugar regularly', 'Follow a low-glycemic diet', 'Exercise 30 min daily', 'Never skip medication'],
  },
  blood_pressure: {
    reply: 'Normal blood pressure is around 120/80 mmHg. High BP (hypertension) above 140/90 requires attention. Manage it through reduced salt intake, regular exercise, stress management, and prescribed medication. Monitor BP at home regularly.',
    severity: 'medium',
    suggestions: ['Reduce salt intake', 'Exercise regularly', 'Manage stress', 'Take prescribed medication consistently'],
  },
  anxiety: {
    reply: 'Anxiety is common and manageable. Practice deep breathing exercises (4-7-8 technique), regular physical activity, adequate sleep, and mindfulness meditation. If anxiety significantly impacts your daily life, consider speaking with a mental health professional.',
    severity: 'low',
    suggestions: ['Practice deep breathing', 'Regular exercise', 'Mindfulness meditation', 'Consider professional counseling'],
  },
  back_pain: {
    reply: 'Back pain is often caused by poor posture, muscle strain, or sedentary lifestyle. Try gentle stretching, maintain good posture, use ergonomic furniture, and apply hot/cold compresses. If pain radiates to legs, causes numbness, or persists beyond 6 weeks, consult an orthopedist.',
    severity: 'low',
    suggestions: ['Maintain good posture', 'Do gentle stretches', 'Use ergonomic seating', 'Apply hot/cold compress'],
  },
  weight_loss: {
    reply: 'Healthy weight loss involves a caloric deficit through balanced diet and exercise. Aim to lose 0.5-1 kg per week. Focus on whole foods, protein-rich meals, and regular physical activity. Avoid crash diets — they are unsustainable and unhealthy.',
    severity: 'low',
    suggestions: ['Create moderate caloric deficit', 'Eat more protein and fiber', 'Exercise 30-60 min daily', 'Track your progress'],
  },
  sleep: {
    reply: 'Good sleep hygiene includes: fixed sleep/wake times, avoiding screens 1 hour before bed, keeping the room dark and cool, avoiding caffeine after 2 PM, and regular exercise (but not close to bedtime). Adults need 7-9 hours per night.',
    severity: 'low',
    suggestions: ['Maintain consistent sleep schedule', 'Limit screen time before bed', 'Keep bedroom cool and dark', 'Avoid late caffeine'],
  },
  diet: {
    reply: 'A balanced Indian diet should include whole grains (roti, brown rice), lentils/dal for protein, seasonal vegetables, fruits, dairy, and healthy fats (ghee, nuts). Minimize processed foods, excess sugar, and refined carbs. Eat at regular times and don\'t skip meals.',
    severity: 'low',
    suggestions: ['Include all food groups', 'Eat seasonal fruits and vegetables', 'Limit processed foods', 'Stay hydrated'],
  },
};

function findBestResponse(message) {
  const lower = message.toLowerCase();

  // Check for keyword matches
  for (const [key, data] of Object.entries(healthKnowledge)) {
    if (lower.includes(key) || lower.includes(key.replace('_', ' '))) {
      return data;
    }
  }

  // Symptom-keyword mapping for fuzzy matching  
  const symptomMap = {
    'head hurts': 'headache', 'migraine': 'headache', 'head ache': 'headache',
    'temperature': 'fever', 'burning up': 'fever', 'feeling hot': 'fever',
    'coughing': 'cough', 'cold': 'cough', 'flu': 'cough',
    'heart pain': 'chest_pain', 'chest hurt': 'chest_pain', 'heart attack': 'chest_pain',
    'tummy pain': 'stomach_pain', 'belly ache': 'stomach_pain', 'acidity': 'stomach_pain', 'gas': 'stomach_pain',
    'tired': 'fatigue', 'exhausted': 'fatigue', 'no energy': 'fatigue', 'weakness': 'fatigue',
    'sugar': 'diabetes', 'insulin': 'diabetes', 'blood sugar': 'diabetes',
    'bp': 'blood_pressure', 'hypertension': 'blood_pressure', 'high bp': 'blood_pressure',
    'stressed': 'anxiety', 'panic': 'anxiety', 'worried': 'anxiety', 'depression': 'anxiety',
    'spine': 'back_pain', 'lower back': 'back_pain', 'backache': 'back_pain',
    'lose weight': 'weight_loss', 'overweight': 'weight_loss', 'obesity': 'weight_loss', 'fat': 'weight_loss',
    'insomnia': 'sleep', 'can\'t sleep': 'sleep', 'sleeping': 'sleep',
    'food': 'diet', 'eating': 'diet', 'nutrition': 'diet', 'healthy food': 'diet',
  };

  for (const [phrase, key] of Object.entries(symptomMap)) {
    if (lower.includes(phrase)) {
      return healthKnowledge[key];
    }
  }

  // Greeting responses
  if (lower.match(/^(hi|hello|hey|namaste|good morning|good evening)/)) {
    return {
      reply: 'Hello! I\'m your Arogya Care AI health assistant. I can help you understand symptoms, provide health tips, and offer preventive care guidance. How can I help you today?',
      severity: 'none',
      suggestions: ['Ask about any symptom', 'Get diet tips', 'Learn about disease prevention', 'Get fitness advice'],
    };
  }

  // Thank you responses
  if (lower.match(/(thank|thanks|dhanyavaad)/)) {
    return {
      reply: 'You\'re welcome! Remember, I\'m here 24/7 for your health queries. Stay healthy! 🏥',
      severity: 'none',
      suggestions: [],
    };
  }

  // Default fallback
  return {
    reply: 'I understand your concern. While I can provide general health guidance, I recommend consulting a qualified healthcare professional for a proper diagnosis. Could you describe your symptoms in more detail? For example: headache, fever, fatigue, chest pain, etc.',
    severity: 'none',
    suggestions: ['Describe your symptoms', 'Ask about a specific condition', 'Get lifestyle tips', 'Learn about prevention'],
  };
}

// @desc    Send message to chatbot
// @route   POST /api/chatbot/message
exports.sendMessage = async (req, res, next) => {
  try {
    const { message, session_id } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const sessionId = session_id || crypto.randomBytes(16).toString('hex');

    // Save user message
    await ChatMessage.create({
      user: req.user._id,
      session_id: sessionId,
      role: 'user',
      message: message.trim(),
    });

    // Generate AI response
    const response = findBestResponse(message);

    // Save assistant reply
    await ChatMessage.create({
      user: req.user._id,
      session_id: sessionId,
      role: 'assistant',
      message: response.reply,
    });

    res.json({
      success: true,
      data: {
        session_id: sessionId,
        reply: response.reply,
        severity: response.severity,
        suggestions: response.suggestions,
        disclaimer: 'This is AI-generated health guidance, not a medical diagnosis. Always consult a qualified healthcare professional.',
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get chat history
// @route   GET /api/chatbot/history
exports.getChatHistory = async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.session_id) filter.session_id = req.query.session_id;

    const messages = await ChatMessage.find(filter).sort('createdAt').limit(100);

    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

// @desc    Get chat sessions
// @route   GET /api/chatbot/sessions
exports.getChatSessions = async (req, res, next) => {
  try {
    const sessions = await ChatMessage.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$session_id', lastMessage: { $last: '$message' }, updatedAt: { $max: '$createdAt' }, messageCount: { $sum: 1 } } },
      { $sort: { updatedAt: -1 } },
      { $limit: 20 },
    ]);

    res.json({ success: true, count: sessions.length, data: sessions });
  } catch (error) {
    next(error);
  }
};
