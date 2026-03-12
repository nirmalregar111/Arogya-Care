import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../components/Card';
import { Button, Input } from '../components/FormElements';
import Modal from '../components/Modal';
import { dummyPatient, dummyHealthScore } from '../utils/dummyData';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, Calendar, Droplets, Edit3, Download, LogOut,
  Heart, Shield, FileText, Activity,
} from 'lucide-react';

export default function Profile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profile, setProfile] = useState(dummyPatient);

  const infoItems = [
    { icon: User, label: 'Full Name', value: profile.name },
    { icon: Mail, label: 'Email', value: profile.email },
    { icon: Phone, label: 'Phone', value: profile.phone },
    { icon: Calendar, label: 'Age', value: `${profile.age} years` },
    { icon: User, label: 'Gender', value: profile.gender },
    { icon: Droplets, label: 'Blood Group', value: profile.bloodGroup },
  ];

  const healthReports = [
    { name: 'Complete Health Analysis', date: 'Mar 10, 2026', size: '2.4 MB' },
    { name: 'Disease Prediction Report', date: 'Mar 8, 2026', size: '1.1 MB' },
    { name: 'Lifestyle Impact Assessment', date: 'Mar 5, 2026', size: '890 KB' },
    { name: 'Treatment Cost Analysis', date: 'Feb 28, 2026', size: '1.5 MB' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account and health reports.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardBody className="text-center py-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-primary/25 ring-4 ring-primary/10">
              <span className="text-3xl font-bold text-white">
                {profile.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-4">{profile.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{profile.email}</p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{dummyHealthScore.overall}</p>
                <p className="text-xs text-gray-500">Health Score</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{dummyHealthScore.riskLevel}</p>
                <p className="text-xs text-gray-500">Risk Level</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button variant="outline" className="w-full" onClick={() => setIsEditOpen(true)}>
                <Edit3 className="w-4 h-4" /> Edit Profile
              </Button>
              <Button variant="ghost" className="w-full text-danger hover:bg-red-50 hover:text-danger">
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Info & Reports */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-gray-900">Personal Information</h3>
            </CardHeader>
            <CardBody>
              <div className="grid sm:grid-cols-2 gap-4">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{item.label}</p>
                        <p className="text-sm font-medium text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* Medical Summary */}
          <Card>
            <CardHeader>
              <h3 className="text-base font-semibold text-gray-900">Medical Summary</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Medical History</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{profile.medicalHistory}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Current Symptoms</p>
                <div className="flex flex-wrap gap-2">
                  {profile.symptoms.map((s) => (
                    <span key={s} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Lifestyle</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <Activity className="w-4 h-4 text-primary mx-auto" />
                    <p className="text-xs text-gray-500 mt-1">Exercise</p>
                    <p className="text-sm font-semibold">{profile.lifestyle.exercise} days/wk</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <Heart className="w-4 h-4 text-danger mx-auto" />
                    <p className="text-xs text-gray-500 mt-1">Smoking</p>
                    <p className="text-sm font-semibold">{profile.lifestyle.smoking ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <Shield className="w-4 h-4 text-secondary mx-auto" />
                    <p className="text-xs text-gray-500 mt-1">Diet</p>
                    <p className="text-sm font-semibold">{profile.lifestyle.diet}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <FileText className="w-4 h-4 text-accent mx-auto" />
                    <p className="text-xs text-gray-500 mt-1">Sleep</p>
                    <p className="text-sm font-semibold">{profile.lifestyle.sleepHours} hrs</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Health Reports */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Health Reports</h3>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-50">
                {healthReports.map((report) => (
                  <div key={report.name} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{report.name}</p>
                        <p className="text-xs text-gray-500">{report.date} · {report.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" /> Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Profile" size="md">
        <div className="space-y-4">
          <Input label="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Age" type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
            <Input label="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </div>
          <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="ghost" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditOpen(false)}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
