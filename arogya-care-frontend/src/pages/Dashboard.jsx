import { Card, CardBody, CardHeader, StatCard } from '../components/Card';
import { LineChart, BarChart, DoughnutChart, RadarChart } from '../components/Charts';
import { dummyDashboardData, dummyHealthScore } from '../utils/dummyData';
import { HealthOrb3D } from '../components/Scene3D';
import { motion } from 'framer-motion';
import {
  Heart, Activity, Droplets, Scale, AlertTriangle, CheckCircle2,
  TrendingUp, ArrowRight, Footprints, UtensilsCrossed, Brain, Moon,
  Sparkles, Shield, Zap,
} from 'lucide-react';

const iconMap = {
  heart: Heart, activity: Activity, droplets: Droplets, scale: Scale,
  footprints: Footprints, utensils: UtensilsCrossed, brain: Brain, moon: Moon,
};

const statGradients = [
  'from-blue-500 to-blue-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-green-600',
];

export default function Dashboard() {
  const { healthScore, riskLevel, symptoms, recommendations, healthProgressData, weeklyActivity, vitalStats } = dummyDashboardData;

  const riskColors = { Low: 'text-secondary', Moderate: 'text-warning', High: 'text-danger' };
  const riskBg = { Low: 'bg-secondary/10', Moderate: 'bg-warning/10', High: 'bg-danger/10' };

  const healthScoreDoughnut = {
    labels: ['Health Score', 'Remaining'],
    datasets: [{
      data: [healthScore, 100 - healthScore],
      backgroundColor: ['#2563EB', '#F1F5F9'],
      borderWidth: 0,
    }],
  };

  const categoryRadar = {
    labels: Object.keys(dummyHealthScore.categories).map((k) => k.charAt(0).toUpperCase() + k.slice(1)),
    datasets: [{
      label: 'Health Score',
      data: Object.values(dummyHealthScore.categories),
      backgroundColor: 'rgba(37, 99, 235, 0.15)',
      borderColor: '#2563EB',
      borderWidth: 2,
      pointBackgroundColor: '#2563EB',
    }],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Your AI-powered health insights and analysis overview.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-gray-600">AI Analysis Active</span>
          <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
        </div>
      </motion.div>

      {/* Vital Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {vitalStats.map((stat, idx) => {
          const Icon = iconMap[stat.icon];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <StatCard icon={Icon} label={stat.label} value={stat.value} status={stat.status} gradient={statGradients[idx]} />
            </motion.div>
          );
        })}
      </div>

      {/* Health Score + 3D Orb + Risk Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Health Score with 3D Orb */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-secondary/3" />
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <h3 className="text-base font-semibold text-gray-900">Overall Health Score</h3>
              </div>
            </CardHeader>
            <CardBody className="relative z-10">
              {/* 3D Health Orb */}
              <div className="h-48 -mx-2 -mt-2 mb-3">
                <HealthOrb3D />
              </div>
              <div className="text-center">
                <span className="text-5xl font-extrabold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">{healthScore}</span>
                <span className="text-lg text-gray-400 ml-1">/ 100</span>
                <p className="text-sm text-secondary font-semibold mt-1">{dummyHealthScore.trend}</p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Risk Level + Symptoms */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <h3 className="text-base font-semibold text-gray-900">Risk Assessment</h3>
              </div>
            </CardHeader>
            <CardBody>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${riskColors[riskLevel]} ${riskBg[riskLevel]}`}>
                <AlertTriangle className="w-4 h-4" />
                {riskLevel} Risk
              </div>
              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-700 mb-3">Current Symptoms</p>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom) => (
                    <span key={symptom} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-xs font-semibold border border-red-100">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Category Radar */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <h3 className="text-base font-semibold text-gray-900">Health Categories</h3>
              </div>
            </CardHeader>
            <CardBody>
              <RadarChart data={categoryRadar} height={230} />
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                  <h3 className="text-base font-semibold text-gray-900">Health Progress</h3>
                </div>
                <span className="text-xs font-medium text-gray-400 px-2 py-1 bg-gray-50 rounded-lg">Last 6 months</span>
              </div>
            </CardHeader>
            <CardBody>
              <LineChart data={healthProgressData} height={280} />
            </CardBody>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <h3 className="text-base font-semibold text-gray-900">Weekly Activity</h3>
                </div>
                <span className="text-xs font-medium text-gray-400 px-2 py-1 bg-gray-50 rounded-lg">This week</span>
              </div>
            </CardHeader>
            <CardBody>
              <BarChart data={weeklyActivity} height={280} />
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">AI Recommended Actions</h3>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-50">
              {recommendations.map((rec, idx) => {
                const Icon = iconMap[rec.icon] || CheckCircle2;
                const priorityColors = { high: 'text-danger bg-danger/10', medium: 'text-warning bg-warning/10', low: 'text-secondary bg-secondary/10' };
                return (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.05 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-primary/3 transition-colors group cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{rec.text}</p>
                    </div>
                    <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-lg ${priorityColors[rec.priority]}`}>
                      {rec.priority}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </motion.div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
