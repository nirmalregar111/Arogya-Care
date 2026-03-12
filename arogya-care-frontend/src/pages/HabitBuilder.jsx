import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../components/Card';
import { dummyHabitPlan } from '../utils/dummyData';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Dumbbell, Droplets, Brain, Apple, Moon, Stethoscope, Trophy, Target, Flame, Sparkles } from 'lucide-react';

const categoryConfig = {
  exercise: { icon: Dumbbell, color: 'text-primary', bg: 'bg-primary/10' },
  hydration: { icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
  mental: { icon: Brain, color: 'text-accent', bg: 'bg-purple-50' },
  diet: { icon: Apple, color: 'text-secondary', bg: 'bg-green-50' },
  sleep: { icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  checkup: { icon: Stethoscope, color: 'text-pink-500', bg: 'bg-pink-50' },
};

export default function HabitBuilder() {
  const [habits, setHabits] = useState(dummyHabitPlan);

  const toggleHabit = (day) => {
    setHabits((prev) =>
      prev.map((h) => (h.day === day ? { ...h, completed: !h.completed } : h))
    );
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const progress = Math.round((completedCount / habits.length) * 100);
  const currentStreak = habits.filter((h) => h.completed).length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Habit Builder</h1>
          <p className="text-sm text-gray-500 mt-1">
            AI-generated daily health goals to gradually improve your wellness.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-gray-600">AI Plan</span>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Target, label: 'Progress', value: `${progress}%`, color: 'text-primary', gradient: 'from-blue-500 to-blue-600' },
          { icon: Trophy, label: 'Completed', value: `${completedCount}/${habits.length}`, color: 'text-secondary', gradient: 'from-emerald-500 to-green-600' },
          { icon: Flame, label: 'Current Streak', value: `${currentStreak} days`, color: 'text-warning', gradient: 'from-amber-500 to-orange-500' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
              <Card hover>
                <CardBody className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className={`text-2xl font-extrabold ${item.color}`}>{item.value}</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Overall Progress Bar */}
      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">30-Day Health Plan Progress</span>
            <span className="text-sm font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 relative"
              style={{ width: `${progress}%` }}
            >
              {progress > 10 && (
                <span className="absolute right-2 top-0 h-full flex items-center text-[10px] font-bold text-white">
                  {progress}%
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400">Day 1</span>
            <span className="text-xs text-gray-400">Day 30</span>
          </div>
        </CardBody>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <h3 className="text-base font-semibold text-gray-900">Daily Health Goals Timeline</h3>
        </CardHeader>
        <CardBody className="p-0">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-10 top-0 w-0.5 h-full bg-gray-100 lg:left-16" />

            {habits.map((habit, idx) => {
              const config = categoryConfig[habit.category] || categoryConfig.exercise;
              const Icon = config.icon;

              return (
                <div
                  key={habit.day}
                  className={`relative flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    idx < habits.length - 1 ? 'border-b border-gray-50' : ''
                  }`}
                  onClick={() => toggleHabit(habit.day)}
                >
                  {/* Day marker */}
                  <div className="w-8 lg:w-14 shrink-0 text-center">
                    <span className="text-xs font-semibold text-gray-400">DAY</span>
                    <p className="text-lg font-bold text-gray-900">{habit.day}</p>
                  </div>

                  {/* Timeline dot */}
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    habit.completed ? 'bg-secondary' : 'bg-white border-2 border-gray-200'
                  }`}>
                    {habit.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${config.bg}`}>
                        <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                      </div>
                      <span className={`text-sm font-medium ${habit.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {habit.task}
                      </span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="shrink-0">
                    {habit.completed ? (
                      <span className="text-xs font-medium px-2.5 py-1 bg-secondary/10 text-secondary rounded-full">
                        Done
                      </span>
                    ) : (
                      <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
