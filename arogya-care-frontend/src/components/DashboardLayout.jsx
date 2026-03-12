import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, Search, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  HeartPulse,
  TrendingUp,
  FlaskConical,
  IndianRupee,
  CalendarCheck,
  User,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Digital Twin', path: '/digital-twin', icon: HeartPulse },
  { name: 'Lifestyle', path: '/lifestyle-simulator', icon: TrendingUp },
  { name: 'Predictions', path: '/disease-prediction', icon: FlaskConical },
  { name: 'Costs', path: '/treatment-cost', icon: IndianRupee },
  { name: 'Habits', path: '/habit-builder', icon: CalendarCheck },
  { name: 'Profile', path: '/profile', icon: User },
];

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white/95 backdrop-blur-xl shadow-2xl z-50"
            >
              <div className="p-4 border-b border-gray-100/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src="/logo.svg" alt="Arogya Care" className="w-9 h-9 object-contain drop-shadow-md" />
                  <span className="text-lg font-bold text-gray-900">Arogya <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Care</span></span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <nav className="py-4 px-3 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive ? 'gradient-primary text-white shadow-md shadow-primary/20' : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header bar */}
        <header className="glass border-b border-gray-100/50 h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search insights, patients..."
                className="pl-10 pr-4 py-2 glass-card rounded-xl text-sm w-72 focus:outline-none focus:ring-2 focus:ring-primary/20 border-0 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white animate-pulse" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200/50">
              <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-sm shadow-primary/20">
                <span className="text-sm font-bold text-white">RS</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Rahul Sharma</p>
                <p className="text-xs text-gray-500">Patient</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
