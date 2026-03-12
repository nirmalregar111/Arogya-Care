import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyleWidth: 8,
        font: { size: 12, family: 'Inter' },
      },
    },
    tooltip: {
      backgroundColor: '#1E293B',
      titleFont: { family: 'Inter', size: 13 },
      bodyFont: { family: 'Inter', size: 12 },
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11, family: 'Inter' }, color: '#94A3B8' },
    },
    y: {
      grid: { color: '#F1F5F9' },
      ticks: { font: { size: 11, family: 'Inter' }, color: '#94A3B8' },
    },
  },
};

export function LineChart({ data, options = {}, height = 300 }) {
  return (
    <div style={{ height }}>
      <Line data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
}

export function BarChart({ data, options = {}, height = 300 }) {
  return (
    <div style={{ height }}>
      <Bar data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
}

export function DoughnutChart({ data, options = {}, height = 280 }) {
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      ...defaultOptions.plugins,
    },
    cutout: '70%',
    ...options,
  };

  return (
    <div style={{ height }}>
      <Doughnut data={data} options={doughnutOptions} />
    </div>
  );
}

export function RadarChart({ data, options = {}, height = 300 }) {
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { ...defaultOptions.plugins },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        grid: { color: '#F1F5F9' },
        ticks: { font: { size: 10 }, stepSize: 20, display: false },
        pointLabels: { font: { size: 11, family: 'Inter' }, color: '#64748B' },
      },
    },
    ...options,
  };

  return (
    <div style={{ height }}>
      <Radar data={data} options={radarOptions} />
    </div>
  );
}
