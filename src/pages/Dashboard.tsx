import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import GlassCard from '../components/GlassCard';
import Sidebar from '../components/Sidebar';
import PatientForm from '../components/PatientForm';
import ResultPanel from '../components/ResultPanel';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

type Section = 'dashboard' | 'form' | 'results';

interface PredictionResult {
  disease: string;
  probability: number;
  risk_level: 'High' | 'Medium' | 'Low';
}

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [healthScore, setHealthScore] = useState(0);
  const [confidence, setConfidence] = useState(0);

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Patients',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 2,
      },
    ],
  };

  const radarData = {
    labels: ['Heart', 'Lungs', 'Liver', 'Kidneys', 'Brain', 'Blood'],
    datasets: [
      {
        label: 'Health Score',
        data: [85, 90, 78, 88, 92, 80],
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 2,
      },
    ],
  };

  const metrics = [
    { icon: '❤️', label: 'Heart Rate', value: '72 bpm', color: 'text-red-500' },
    { icon: '💊', label: 'Medications', value: '3 Active', color: 'text-green-500' },
    { icon: '📈', label: 'Health Score', value: '87%', color: 'text-primary-500' },
    { icon: '⏰', label: 'Next Checkup', value: 'In 5 Days', color: 'text-accent-500' },
  ];

  const handleFormSubmit = (result: any) => {
    setPredictions(result.predictions);
    setHealthScore(result.health_score);
    setConfidence(result.prediction_confidence);
    setActiveSection('results');
  };

  const handleReset = () => {
    setActiveSection('form');
    setPredictions([]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {activeSection === 'dashboard' && 'Dashboard'}
            {activeSection === 'form' && 'Patient Prediction'}
            {activeSection === 'results' && 'Analysis Results'}
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`glass-card px-6 py-2 rounded-xl ${activeSection === 'dashboard' ? 'bg-primary-500/20 border-primary-500/50' : ''}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection('form')}
              className={`glass-card px-6 py-2 rounded-xl ${activeSection === 'form' ? 'bg-primary-500/20 border-primary-500/50' : ''}`}
            >
              Predict
            </button>
            <button className="glass-card px-6 py-2 rounded-xl">🔔</button>
            <button className="glass-card px-6 py-2 rounded-xl">👤</button>
          </div>
        </div>

        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'dashboard' && (
            <>
              <div className="grid grid-cols-4 gap-6 mb-8">
                {metrics.map((metric, i) => (
                  <GlassCard key={i}>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{metric.icon}</div>
                      <div>
                        <p className="text-gray-400">{metric.label}</p>
                        <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <GlassCard>
                  <h3 className="text-xl font-bold mb-4">Patient Analytics</h3>
                  <Bar data={barData} options={{ responsive: true, plugins: { legend: { labels: { color: '#fff' } } }, scales: { y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }, x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } } } }} />
                </GlassCard>
                <GlassCard>
                  <h3 className="text-xl font-bold mb-4">Organ Health</h3>
                  <Radar data={radarData} options={{ responsive: true, plugins: { legend: { labels: { color: '#fff' } } }, scales: { r: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' }, pointLabels: { color: '#fff' } } } }} />
                </GlassCard>
              </div>

              <div className="mt-8">
                <GlassCard>
                  <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {['Blood test completed', 'Medication updated', 'Appointment scheduled', 'Health report generated'].map((item, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                        <span className="text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </>
          )}

          {activeSection === 'form' && (
            <PatientForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          )}

          {activeSection === 'results' && (
            <ResultPanel
              predictions={predictions}
              healthScore={healthScore}
              confidence={confidence}
              onReset={handleReset}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;