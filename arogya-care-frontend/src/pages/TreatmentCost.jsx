import { Card, CardBody, CardHeader } from '../components/Card';
import { BarChart } from '../components/Charts';
import { dummyCostComparison } from '../utils/dummyData';
import { motion } from 'framer-motion';
import { IndianRupee, Star, BadgeCheck, TrendingDown, ShieldCheck, Sparkles } from 'lucide-react';

export default function TreatmentCost() {
  const costChart = {
    labels: dummyCostComparison.map((t) => t.treatment.split(' - ')[0]),
    datasets: [
      {
        label: 'Total Cost (₹)',
        data: dummyCostComparison.map((t) => t.totalCost),
        backgroundColor: dummyCostComparison.map((t) =>
          t.isRecommended ? 'rgba(34, 197, 94, 0.7)' : 'rgba(37, 99, 235, 0.6)'
        ),
        borderRadius: 8,
      },
      {
        label: 'Out of Pocket (₹)',
        data: dummyCostComparison.map((t) => t.outOfPocket),
        backgroundColor: dummyCostComparison.map((t) =>
          t.isRecommended ? 'rgba(34, 197, 94, 0.3)' : 'rgba(37, 99, 235, 0.25)'
        ),
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">Treatment Cost Optimizer</h1>
        <p className="text-sm text-gray-500 mt-1">
          AI compares treatment options by cost and effectiveness to find the best value.
        </p>
      </motion.div>

      {/* AI Recommendation */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="relative bg-gradient-to-br from-secondary/10 via-secondary/5 to-emerald-50 border border-secondary/20 rounded-2xl p-7 flex flex-col sm:flex-row items-start gap-4 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="w-14 h-14 bg-gradient-to-br from-secondary to-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-secondary/25">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">AI Cost Optimization</h3>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-semibold text-secondary">Treatment B</span> offers similar effectiveness at{' '}
            <span className="font-bold text-secondary">67% lower cost</span>. Recommended as the best value option
            with ₹12,000 total out-of-pocket expense.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-4 py-2 bg-secondary/15 rounded-xl text-secondary shrink-0 font-bold">
          <TrendingDown className="w-4 h-4" />
          <span className="text-sm">Save ₹24,000</span>
        </div>
      </motion.div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <h3 className="text-base font-semibold text-gray-900">Treatment Comparison</h3>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Treatment</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Monthly Cost</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Duration</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Total Cost</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Effectiveness</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Insurance</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Your Cost</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {dummyCostComparison.map((item, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    item.isRecommended ? 'bg-secondary/5' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{item.treatment}</span>
                      {item.isRecommended && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-secondary/20 text-secondary rounded-full font-semibold">
                          <BadgeCheck className="w-3 h-3" /> Best Value
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 font-medium">₹{item.monthlyCost.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.duration}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">₹{item.totalCost.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      item.effectiveness === 'Highest' ? 'bg-primary/10 text-primary' :
                      item.effectiveness === 'High' ? 'bg-blue-50 text-blue-600' :
                      'bg-secondary/10 text-secondary'
                    }`}>
                      {item.effectiveness}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.insuranceCoverage}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${item.isRecommended ? 'text-secondary' : 'text-gray-900'}`}>
                      ₹{item.outOfPocket.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${star <= Math.floor(item.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{item.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Cost Chart */}
      <Card>
        <CardHeader>
          <h3 className="text-base font-semibold text-gray-900">Cost Comparison Chart</h3>
        </CardHeader>
        <CardBody>
          <BarChart data={costChart} height={300} />
        </CardBody>
      </Card>

      {/* Savings Summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: IndianRupee, label: 'Potential Savings', value: '₹24,000', sub: 'vs Treatment A', color: 'text-primary', gradient: 'from-blue-500 to-blue-600' },
          { icon: ShieldCheck, label: 'Effectiveness Match', value: '95%', sub: 'similar outcome at lower cost', color: 'text-secondary', gradient: 'from-emerald-500 to-green-600' },
          { icon: Star, label: 'Patient Rating', value: '4.5/5', sub: 'highest rated option', color: 'text-warning', gradient: 'from-amber-500 to-orange-500' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + idx * 0.1 }}>
              <Card hover>
                <CardBody className="text-center">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} mx-auto flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-500 mt-3">{item.label}</p>
                  <p className={`text-2xl font-extrabold ${item.color} mt-1`}>{item.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
