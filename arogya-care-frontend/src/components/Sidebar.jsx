import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  HeartPulse,
  FlaskConical,
  TrendingUp,
  IndianRupee,
  CalendarCheck,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Digital Health Twin', path: '/digital-twin', icon: HeartPulse },
  { name: 'Lifestyle Simulator', path: '/lifestyle-simulator', icon: TrendingUp },
  { name: 'Disease Prediction', path: '/disease-prediction', icon: FlaskConical },
  { name: 'Treatment Cost', path: '/treatment-cost', icon: IndianRupee },
  { name: 'Habit Builder', path: '/habit-builder', icon: CalendarCheck },
  { name: 'Profile', path: '/profile', icon: User },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`${
        collapsed ? 'w-[72px]' : 'w-[264px]'
      } bg-white/80 backdrop-blur-xl border-r border-gray-100/50 min-h-screen flex flex-col transition-all duration-300 relative hidden lg:flex`}
    >
      <div className="p-4 border-b border-gray-100/50 flex items-center gap-2.5">
        <img src="/logo.svg" alt="Arogya Care" className="w-9 h-9 object-contain shrink-0 drop-shadow-md" />
        {!collapsed && (
          <span className="text-lg font-bold text-gray-900">
            Arogya <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Care</span>
          </span>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <NavLink
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'gradient-primary text-white shadow-md shadow-primary/20'
                    : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                }`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 glass-card rounded-full flex items-center justify-center shadow-md hover:shadow-lg z-10 transition-shadow"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-gray-500" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-gray-500" />
        )}
      </button>

      {!collapsed && (
        <div className="p-4 border-t border-gray-100/50">
          <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-4 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <p className="text-xs font-semibold text-gray-600">Health Score</p>
              </div>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">72</p>
              <div className="w-full bg-gray-200/60 rounded-full h-2 mt-3">
                <div className="gradient-primary rounded-full h-2 transition-all duration-700 shadow-sm shadow-primary/30" style={{ width: '72%' }} />
              </div>
              <p className="text-xs text-secondary font-semibold mt-2">↑ 5% from last month</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
