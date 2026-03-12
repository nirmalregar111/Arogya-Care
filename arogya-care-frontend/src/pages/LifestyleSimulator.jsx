import { useState, useMemo } from 'react';
import { Card, CardBody, CardHeader } from '../components/Card';
import { LineChart, BarChart } from '../components/Charts';
import { Toggle } from '../components/FormElements';
import { dummyLifestyleImpact } from '../utils/dummyData';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Cigarette, Apple, Moon, Sparkles, Zap } from 'lucide-react';

export default function LifestyleSimulator() {
  const [exercise, setExercise] = useState(2);
  const [smoking, setSmoking] = useState(false);
  const [diet, setDiet] = useState('Average');
  const [sleep, setSleep] = useState(7);

  const { baseline, exerciseImpact, smokingImpact, dietImpact } = dummyLifestyleImpact;

  const currentRisks = useMemo(() => {
    const ex = exerciseImpact[Math.min(exercise, 5)] || exerciseImpact[5];
    const sm = smokingImpact[smoking] || smokingImpact[false];
    const dt = dietImpact[diet] || dietImpact['Average'];

    return {
      heartDisease: Math.max(0, Math.min(100, ex.heartDisease + sm.heartDisease + dt.heartDisease)),
      diabetes: Math.max(0, Math.min(100, ex.diabetes + sm.diabetes + dt.diabetes)),
      hypertension: Math.max(0, Math.min(100, ex.hypertension + sm.hypertension + dt.hypertension)),
      overall: Math.max(0, Math.min(100, ex.overall + sm.overall + dt.overall)),
    };
  }, [exercise, smoking, diet, sleep, exerciseImpact, smokingImpact, dietImpact]);

  const comparisonChart = {
    labels: ['Heart Disease', 'Diabetes', 'Hypertension'],
    datasets: [
      {
        label: 'Baseline Risk %',
        data: [baseline.heartDiseaseRisk, baseline.diabetesRisk, baseline.hypertensionRisk],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderRadius: 6,
      },
      {
        label: 'Simulated Risk %',
        data: [currentRisks.heartDisease, currentRisks.diabetes, currentRisks.hypertension],
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderRadius: 6,
      },
    ],
  };

  const trendChart = {
    labels: ['Now', '3 months', '6 months', '9 months', '12 months'],
    datasets: [
      {
        label: 'Without Changes',
        data: [baseline.overallHealth, baseline.overallHealth - 2, baseline.overallHealth - 4, baseline.overallHealth - 5, baseline.overallHealth - 7],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'With Your Changes',
        data: [baseline.overallHealth, currentRisks.overall - 2, currentRisks.overall, currentRisks.overall + 3, currentRisks.overall + 5],
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const riskCards = [
    { label: 'Heart Disease Risk', baseline: baseline.heartDiseaseRisk, current: currentRisks.heartDisease, color: 'text-danger' },
    { label: 'Diabetes Risk', baseline: baseline.diabetesRisk, current: currentRisks.diabetes, color: 'text-warning' },
    { label: 'Hypertension Risk', baseline: baseline.hypertensionRisk, current: currentRisks.hypertension, color: 'text-accent' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lifestyle Impact Simulator</h1>
          <p className="text-sm text-gray-500 mt-1">
            Adjust lifestyle factors to see how they impact your health risk in real-time.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium text-gray-600">Real-time Sim</span>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h3 className="text-base font-semibold text-gray-900">Lifestyle Controls</h3>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium text-gray-700">
                  Exercise: <span className="text-primary font-bold">{exercise} days/week</span>
                </label>
              </div>
              <input
                type="range" min="0" max="7" value={exercise}
                onChange={(e) => setExercise(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>None</span><span>Daily</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cigarette className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Smoking</span>
              </div>
              <Toggle checked={smoking} onChange={(e) => setSmoking(e.target.checked)} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Apple className="w-4 h-4 text-secondary" />
                <label className="text-sm font-medium text-gray-700">Diet Quality</label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Poor', 'Average', 'Healthy', 'Excellent'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDiet(d)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      diet === d
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Moon className="w-4 h-4 text-accent" />
                <label className="text-sm font-medium text-gray-700">
                  Sleep: <span className="text-primary font-bold">{sleep} hours</span>
                </label>
              </div>
              <input
                type="range" min="3" max="10" value={sleep}
                onChange={(e) => setSleep(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3 hrs</span><span>10 hrs</span>
              </div>
            </div>

            {/* Overall Health Score */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-2">Overall Health Score</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-primary">{currentRisks.overall}</span>
                <span className="text-sm text-gray-400 mb-1">/ 100</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mt-2">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${currentRisks.overall}%` }}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Risk Change Cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            {riskCards.map((card) => {
              const change = card.current - card.baseline;
              const isReduction = change < 0;
              return (
                <Card key={card.label} hover>
                  <CardBody>
                    <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                    <div className="flex items-end gap-2 mt-2">
                      <span className="text-3xl font-bold text-gray-900">{card.current}%</span>
                      <span className={`text-sm font-semibold flex items-center gap-0.5 mb-1 ${isReduction ? 'text-secondary' : 'text-danger'}`}>
                        {isReduction ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                        {Math.abs(change)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          card.current > 50 ? 'bg-danger' : card.current > 30 ? 'bg-warning' : 'bg-secondary'
                        }`}
                        style={{ width: `${card.current}%` }}
                      />
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>

          {/* Charts */}
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-gray-900">Risk Comparison: Baseline vs Simulated</h3>
            </CardHeader>
            <CardBody>
              <BarChart data={comparisonChart} height={280} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-gray-900">Projected Health Trend (12 Months)</h3>
            </CardHeader>
            <CardBody>
              <LineChart data={trendChart} height={280} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
