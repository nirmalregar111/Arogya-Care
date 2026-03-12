import { Card, CardBody, CardHeader } from '../components/Card';
import { BarChart } from '../components/Charts';
import { dummyTreatmentComparison } from '../utils/dummyData';
import { BodyScanner3D } from '../components/Scene3D';
import { motion } from 'framer-motion';
import { HeartPulse, Star, Clock, BadgeCheck, AlertCircle, Sparkles, Zap, Shield } from 'lucide-react';

export default function DigitalTwin() {
  const comparisonChart = {
    labels: dummyTreatmentComparison.map((t) => `Treatment ${t.id}`),
    datasets: [
      {
        label: 'Improvement %',
        data: dummyTreatmentComparison.map((t) => t.improvement),
        backgroundColor: dummyTreatmentComparison.map((t) =>
          t.isRecommended ? 'rgba(34, 197, 94, 0.8)' : 'rgba(37, 99, 235, 0.6)'
        ),
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Health Twin</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your AI-generated virtual health model simulates treatment outcomes.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
          <Zap className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-gray-600">Twin Synced</span>
          <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
        </div>
      </motion.div>

      {/* 3D Body Scanner + AI Recommendation */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <h3 className="text-base font-semibold text-gray-900">3D Health Model</h3>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="h-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
                <BodyScanner3D />
                <div className="absolute bottom-3 left-3 glass-dark rounded-xl px-3 py-1.5 text-xs text-gray-300">
                  <span className="text-secondary font-semibold">●</span> Live scanning active
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <div className="relative bg-gradient-to-br from-secondary/10 via-secondary/5 to-emerald-50 border border-secondary/20 rounded-2xl p-7 overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/25 mb-4">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">AI Recommendation</h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Based on your Digital Health Twin analysis, <span className="font-bold text-secondary">Treatment B - Integrated Therapy</span> offers
                the best improvement rate of <span className="font-extrabold text-secondary">85%</span> with the fastest recovery time.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-4 py-2 bg-secondary/15 rounded-xl text-secondary font-semibold text-sm">
                  <BadgeCheck className="w-4 h-4" /> Best Match
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 rounded-xl text-primary font-semibold text-sm">
                  <HeartPulse className="w-4 h-4" /> 85% Improvement
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Treatment Comparison Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {dummyTreatmentComparison.map((treatment, idx) => (
          <motion.div
            key={treatment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
          >
            <Card
              hover
              className={`relative overflow-hidden ${
                treatment.isRecommended ? 'ring-2 ring-secondary shadow-md shadow-secondary/10' : ''
              }`}
            >
              {treatment.isRecommended && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-secondary to-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5">
                  <Star className="w-3 h-3" />
                  RECOMMENDED
                </div>
              )}
              <CardBody className="space-y-4 pt-6">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${
                    treatment.isRecommended
                      ? 'bg-gradient-to-br from-secondary to-emerald-600 shadow-secondary/20'
                      : 'bg-gradient-to-br from-primary to-blue-600 shadow-primary/20'
                  }`}>
                    <HeartPulse className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{treatment.name}</h3>
                </div>

                <p className="text-sm text-gray-500">{treatment.description}</p>

                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-500 font-medium">Improvement</span>
                    <span className={`font-extrabold ${treatment.isRecommended ? 'text-secondary' : 'text-primary'}`}>
                      {treatment.improvement}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-700 ${
                        treatment.isRecommended
                          ? 'bg-gradient-to-r from-secondary to-emerald-400'
                          : 'bg-gradient-to-r from-primary to-blue-400'
                      }`}
                      style={{ width: `${treatment.improvement}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {treatment.recoveryTime}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    ₹{treatment.cost.toLocaleString()}/mo
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2">Side Effects</p>
                  <div className="flex flex-wrap gap-1.5">
                    {treatment.sideEffects.map((effect) => (
                      <span key={effect} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-orange-50 text-orange-600 rounded-lg border border-orange-100">
                        <AlertCircle className="w-3 h-3" />
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Comparison Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Treatment Outcome Comparison</h3>
            </div>
          </CardHeader>
          <CardBody>
            <BarChart data={comparisonChart} height={300} />
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
