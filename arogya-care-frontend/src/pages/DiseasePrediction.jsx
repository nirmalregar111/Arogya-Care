import { Card, CardBody, CardHeader } from '../components/Card';
import { DoughnutChart, BarChart } from '../components/Charts';
import { dummyDiseasePredictions } from '../utils/dummyData';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, TrendingUp, TrendingDown, Minus, ShieldAlert, Sparkles, Brain } from 'lucide-react';

export default function DiseasePrediction() {
  const trendIcons = {
    increasing: <TrendingUp className="w-3.5 h-3.5 text-danger" />,
    decreasing: <TrendingDown className="w-3.5 h-3.5 text-secondary" />,
    stable: <Minus className="w-3.5 h-3.5 text-gray-400" />,
  };

  const riskChart = {
    labels: dummyDiseasePredictions.map((d) => d.disease),
    datasets: [
      {
        label: 'Risk %',
        data: dummyDiseasePredictions.map((d) => d.risk),
        backgroundColor: dummyDiseasePredictions.map((d) => d.color + 'CC'),
        borderColor: dummyDiseasePredictions.map((d) => d.color),
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: dummyDiseasePredictions.map((d) => d.disease),
    datasets: [
      {
        data: dummyDiseasePredictions.map((d) => d.risk),
        backgroundColor: dummyDiseasePredictions.map((d) => d.color + 'CC'),
        borderWidth: 0,
      },
    ],
  };

  const getRiskLevel = (risk) => {
    if (risk >= 50) return { label: 'High', color: 'text-danger bg-red-50' };
    if (risk >= 30) return { label: 'Moderate', color: 'text-warning bg-amber-50' };
    return { label: 'Low', color: 'text-secondary bg-green-50' };
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Disease Prediction</h1>
          <p className="text-sm text-gray-500 mt-1">
            AI-powered predictions of potential health risks based on your medical data and lifestyle.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
          <Brain className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-gray-600">ML Analysis</span>
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </motion.div>

      {/* Summary Banner */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20 rounded-2xl p-7 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/25">
            <ShieldAlert className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Predictive Health Analysis</h3>
            <p className="text-sm text-gray-600 mt-1">
              Based on your health profile, our AI has identified <span className="font-bold text-primary">{dummyDiseasePredictions.length} potential health risks</span>.
              Early intervention can significantly reduce these risks.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Disease Risk Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyDiseasePredictions.map((prediction, idx) => {
          const riskLevel = getRiskLevel(prediction.risk);
          return (
            <motion.div key={prediction.disease} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + idx * 0.08 }}>
            <Card hover>
              <CardBody className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">{prediction.disease}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${riskLevel.color}`}>
                    {riskLevel.label}
                  </span>
                </div>

                {/* Risk Meter */}
                <div className="relative">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-500">Risk Probability</span>
                    <span className="font-bold" style={{ color: prediction.color }}>{prediction.risk}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-4 rounded-full transition-all duration-700 relative"
                      style={{
                        width: `${prediction.risk}%`,
                        backgroundColor: prediction.color,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Onset: {prediction.onset}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {trendIcons[prediction.trend]}
                    <span className="text-gray-500 capitalize">{prediction.trend}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-gray-900">Risk Distribution</h3>
          </CardHeader>
          <CardBody>
            <BarChart
              data={riskChart}
              height={300}
              options={{
                indexAxis: 'y',
                scales: {
                  x: { max: 100, grid: { color: '#F1F5F9' }, ticks: { callback: (v) => v + '%' } },
                  y: { grid: { display: false } },
                },
              }}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-gray-900">Risk Proportions</h3>
          </CardHeader>
          <CardBody className="flex justify-center">
            <DoughnutChart data={doughnutData} height={300} />
          </CardBody>
        </Card>
      </div>

      {/* Prevention Tips */}
      <Card>
        <CardHeader>
          <h3 className="text-base font-semibold text-gray-900">Prevention Recommendations</h3>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-gray-50">
            {[
              { disease: 'Kidney Disease', tip: 'Stay hydrated, reduce sodium, monitor blood pressure regularly, and limit NSAID usage.' },
              { disease: 'Hypertension', tip: 'Regular exercise, DASH diet, stress management, and reduce alcohol consumption.' },
              { disease: 'Type 2 Diabetes', tip: 'Maintain healthy weight, increase fiber intake, regular blood sugar monitoring.' },
              { disease: 'Coronary Artery Disease', tip: 'Heart-healthy diet, quit smoking, manage cholesterol, regular cardiovascular exercise.' },
            ].map((item) => (
              <div key={item.disease} className="px-6 py-4 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.disease}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
