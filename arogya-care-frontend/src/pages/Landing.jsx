import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { HeroDNA } from '../components/Scene3D';
import {
  Activity,
  Brain,
  HeartPulse,
  ShieldCheck,
  TrendingUp,
  Stethoscope,
  Zap,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Sparkles,
  ChevronRight,
  Play,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
};

const features = [
  {
    icon: Brain,
    title: 'AI Disease Prediction',
    description: 'Advanced ML models analyze your health data to predict potential diseases years in advance.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: HeartPulse,
    title: 'Digital Health Twin',
    description: 'Create a virtual model of your health to simulate treatment outcomes before committing.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: TrendingUp,
    title: 'Lifestyle Impact Simulator',
    description: 'See how exercise, diet, and habits affect your health risks in real-time simulations.',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    icon: ShieldCheck,
    title: 'Preventive Healthcare',
    description: 'Move from reactive to preventive care with personalized health improvement plans.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Stethoscope,
    title: 'Treatment Optimization',
    description: 'Compare treatment costs and effectiveness to make informed healthcare decisions.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Zap,
    title: 'Habit Builder',
    description: 'AI-generated daily health goals that gradually improve your wellness over time.',
    gradient: 'from-cyan-500 to-teal-600',
  },
];

const steps = [
  { step: '01', title: 'Enter Health Data', description: 'Provide your medical history, symptoms, and lifestyle information securely.', icon: '🔬' },
  { step: '02', title: 'AI Analysis', description: 'Our AI processes your data using advanced machine learning models.', icon: '🧠' },
  { step: '03', title: 'Get Insights', description: 'Receive personalized disease predictions, treatment plans, and lifestyle recommendations.', icon: '📊' },
  { step: '04', title: 'Track Progress', description: 'Monitor your health improvements with interactive dashboards and habit tracking.', icon: '🎯' },
];

const stats = [
  { value: '50K+', label: 'Patients Analyzed', icon: Activity },
  { value: '95%', label: 'Prediction Accuracy', icon: Brain },
  { value: '40%', label: 'Avg Risk Reduction', icon: TrendingUp },
  { value: '200+', label: 'Health Metrics', icon: BarChart3 },
];

const testimonials = [
  { name: 'Dr. Priya Mehta', role: 'Cardiologist, AIIMS', quote: 'Arogya Care has transformed how I approach preventive healthcare. The AI predictions are remarkably accurate.', avatar: 'PM' },
  { name: 'Amit Singh', role: 'Patient', quote: 'The lifestyle simulator helped me understand exactly what changes I needed. My health score improved 30% in 3 months.', avatar: 'AS' },
  { name: 'Dr. Raj Patel', role: 'General Physician', quote: 'The digital twin feature is revolutionary. It helps patients visualize treatment outcomes before starting therapy.', avatar: 'RP' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-primary text-sm font-semibold mb-8 border border-primary/20"
              >
                <Sparkles className="w-4 h-4" />
                Next-Generation AI Healthcare
                <ChevronRight className="w-3 h-3" />
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight"
              >
                AI Powered{' '}
                <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent animate-gradient">
                  Preventive
                </span>
                <br />
                Healthcare
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
                className="mt-6 text-lg text-gray-600 max-w-lg leading-relaxed"
              >
                Predict diseases before they occur. Simulate treatments virtually.
                Transform your health journey with AI-powered insights and personalized care.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link
                  to="/patient-info"
                  className="group inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white rounded-2xl text-base font-semibold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Start Health Analysis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center gap-2 px-8 py-4 glass-card rounded-2xl text-gray-700 text-base font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Play className="w-4 h-4 text-primary" />
                  View Live Demo
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
                className="mt-12 flex items-center gap-6 pt-8 border-t border-gray-100"
              >
                <div className="flex -space-x-2">
                  {['RS', 'PM', 'AS', 'RP'].map((initials, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                    <span className="text-sm font-semibold text-gray-800 ml-1">4.9</span>
                  </div>
                  <p className="text-xs text-gray-500">Trusted by 50,000+ users</p>
                </div>
              </motion.div>
            </div>

            {/* Right 3D Scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="relative h-[500px] lg:h-[600px] hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl" />
              <HeroDNA className="relative z-10" />
              {/* Floating stat cards */}
              <div className="absolute top-10 -left-4 glass-card rounded-2xl p-4 shadow-xl animate-float z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <HeartPulse className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Health Score</p>
                    <p className="text-lg font-bold text-gray-900">92 / 100</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-16 -right-4 glass-card rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AI Accuracy</p>
                    <p className="text-lg font-bold text-primary">95.8%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center hover:glow-primary hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary mx-auto flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-surface">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Comprehensive AI Health Suite
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to take control of your health with cutting-edge artificial intelligence.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="group glass-card rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 card-premium"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mt-5">{feature.title}</h3>
                  <p className="text-gray-500 mt-2 text-sm leading-relaxed">{feature.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
              <Zap className="w-3.5 h-3.5" /> Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Four simple steps to transform your healthcare journey with AI.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative text-center group"
              >
                <div className="relative z-10">
                  <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-primary/20 group-hover:shadow-2xl group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-300">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5">
                    <div className="w-full h-full bg-gradient-to-r from-primary/30 to-transparent rounded-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary/30 rounded-full" />
                  </div>
                )}
                <p className="text-xs font-bold text-primary mt-5 tracking-widest uppercase">Step {item.step}</p>
                <h3 className="text-lg font-bold text-gray-900 mt-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark */}
      <section className="py-24 gradient-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-secondary-light text-sm font-semibold mb-6">
                <ShieldCheck className="w-3.5 h-3.5" /> Why Arogya Care
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                  AI-Powered
                </span>{' '}
                Healthcare?
              </h2>
              <p className="mt-5 text-gray-400 text-lg leading-relaxed">
                Traditional healthcare is reactive. Arogya Care makes it proactive by predicting health risks and
                optimizing treatments before problems arise.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Predict diseases up to 10 years in advance',
                  'Reduce treatment costs by up to 60%',
                  'Personalized lifestyle recommendations',
                  'Virtual treatment simulation before commitment',
                  'Continuous health monitoring and tracking',
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-secondary-light" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-5"
            >
              {[
                { icon: Brain, label: 'AI Models', value: '15+', color: 'from-blue-500 to-violet-500' },
                { icon: BarChart3, label: 'Health Metrics', value: '200+', color: 'from-emerald-500 to-teal-500' },
                { icon: Activity, label: 'Accuracy', value: '95%', color: 'from-amber-500 to-orange-500' },
                { icon: HeartPulse, label: 'Lives Improved', value: '50K+', color: 'from-rose-500 to-pink-500' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="glass-dark rounded-2xl p-6 text-center hover:bg-white/10 transition-all hover:-translate-y-1 duration-300">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} mx-auto flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-3xl font-extrabold mt-4">{item.value}</p>
                    <p className="text-gray-400 text-sm mt-1">{item.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface relative">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Trusted by Professionals</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from doctors and patients who transformed their healthcare with Arogya Care.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-7 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto px-4 text-center"
        >
          <div className="gradient-primary rounded-3xl p-12 sm:p-16 shadow-2xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Ready to Transform Your Health?
              </h2>
              <p className="mt-4 text-blue-100 max-w-xl mx-auto text-lg">
                Start your AI-powered health analysis. Get predictions, insights, and treatment recommendations in minutes.
              </p>
              <Link
                to="/patient-info"
                className="group inline-flex items-center gap-2 mt-8 px-10 py-4 bg-white text-primary rounded-2xl text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start Health Analysis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="gradient-dark text-gray-400 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="Arogya Care" className="w-10 h-10 object-contain drop-shadow-lg" />
                <span className="text-xl font-bold text-white">Arogya Care</span>
              </div>
              <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                AI-powered preventive healthcare platform. Predict diseases, simulate treatments,
                and optimize your health journey with advanced artificial intelligence.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <div className="space-y-2.5">
                {['Dashboard', 'Disease Prediction', 'Digital Twin', 'Lifestyle Simulator'].map((item) => (
                  <p key={item} className="text-sm hover:text-white transition-colors cursor-pointer">{item}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-2.5">
                {['About Us', 'Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
                  <p key={item} className="text-sm hover:text-white transition-colors cursor-pointer">{item}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">&copy; 2026 Arogya Care. All rights reserved.</p>
            <p className="text-sm">Powered by AI &middot; Built for healthcare</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

