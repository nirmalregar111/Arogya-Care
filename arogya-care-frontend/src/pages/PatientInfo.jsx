import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button, Input, Select, Textarea, Toggle } from '../components/FormElements';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Upload, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';

const symptomOptions = [
  'Fatigue', 'Headache', 'Chest Pain', 'Shortness of Breath', 'Dizziness',
  'Nausea', 'Joint Pain', 'Back Pain', 'Insomnia', 'Anxiety',
  'High Blood Pressure', 'Frequent Urination', 'Weight Gain', 'Blurred Vision',
];

export default function PatientInfo() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', age: '', gender: '', email: '', phone: '',
    medicalHistory: '', symptoms: [],
    labReport: null,
    exercise: 2, smoking: false, alcohol: false,
    diet: 'Mixed', sleepHours: 7,
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleSymptom = (symptom) => {
    setForm((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would call patientService.create(form)
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface relative">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="relative">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-primary text-sm font-semibold mb-4 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Patient Health Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Enter Your Health Information</h1>
          <p className="text-gray-600 mt-2">This data will be analyzed by our AI to generate personalized health insights.</p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= s ? 'gradient-primary text-white shadow-md shadow-primary/20' : 'bg-gray-100 text-gray-400'
              }`}>
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-0.5 rounded-full transition-colors ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input label="Full Name" placeholder="Enter your name" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
                  <Input label="Age" type="number" placeholder="Age" min="1" max="120" value={form.age} onChange={(e) => updateField('age', e.target.value)} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Select label="Gender" value={form.gender} onChange={(e) => updateField('gender', e.target.value)}
                    options={[{ value: '', label: 'Select Gender' }, { value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }]}
                  />
                  <Input label="Email" type="email" placeholder="email@example.com" value={form.email} onChange={(e) => updateField('email', e.target.value)} />
                </div>
                <Input label="Phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
                <Textarea label="Medical History" placeholder="Describe any previous medical conditions, surgeries, family history..." value={form.medicalHistory} onChange={(e) => updateField('medicalHistory', e.target.value)} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Symptoms & Reports</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Current Symptoms</label>
                  <div className="flex flex-wrap gap-2">
                    {symptomOptions.map((symptom) => (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => toggleSymptom(symptom)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                          form.symptoms.includes(symptom)
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Lab Reports</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      {form.labReport ? form.labReport.name : 'Click to upload or drag and drop'}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 10MB)</span>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => updateField('labReport', e.target.files[0])} />
                  </label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exercise Level: <span className="text-primary font-semibold">{form.exercise} days/week</span>
                  </label>
                  <input
                    type="range" min="0" max="7" value={form.exercise}
                    onChange={(e) => updateField('exercise', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Sedentary</span><span>Very Active</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sleep Hours: <span className="text-primary font-semibold">{form.sleepHours} hrs/night</span>
                  </label>
                  <input
                    type="range" min="3" max="12" value={form.sleepHours}
                    onChange={(e) => updateField('sleepHours', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>3 hrs</span><span>12 hrs</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Toggle label="Smoking" checked={form.smoking} onChange={(e) => updateField('smoking', e.target.checked)} />
                  <Toggle label="Alcohol Consumption" checked={form.alcohol} onChange={(e) => updateField('alcohol', e.target.checked)} />
                </div>

                <Select
                  label="Diet Type"
                  value={form.diet}
                  onChange={(e) => updateField('diet', e.target.value)}
                  options={[
                    { value: 'Vegetarian', label: 'Vegetarian' },
                    { value: 'Non-Vegetarian', label: 'Non-Vegetarian' },
                    { value: 'Vegan', label: 'Vegan' },
                    { value: 'Mixed', label: 'Mixed / Balanced' },
                  ]}
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              ) : <div />}

              {step < 3 ? (
                <Button type="button" onClick={() => setStep(step + 1)}>
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button type="submit">
                  Submit & Analyze <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
