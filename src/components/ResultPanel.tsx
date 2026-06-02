import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import GlassCard from './GlassCard';
import { apiService } from '../services/apiService';

interface PredictionResult {
  disease: string;
  probability: number;
  risk_level: 'High' | 'Medium' | 'Low';
}

interface ResultPanelProps {
  predictions: PredictionResult[];
  healthScore: number;
  confidence: number;
  onReset: () => void;
}

const ResultPanel = ({ predictions, healthScore, confidence, onReset }: ResultPanelProps) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!predictions || predictions.length === 0) {
        setRecommendations([]);
        return;
      }

      try {
        const resp = await apiService.getRecommendations({ predictions });
        setRecommendations(resp.recommendations || []);
      } catch (err) {
        console.error('Failed to fetch recommendations', err);
        setRecommendations([]);
      }
    };

    fetchRecommendations();
  }, [predictions]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-500/20 border-red-500/50';
      case 'Medium':
        return 'bg-yellow-500/20 border-yellow-500/50';
      case 'Low':
        return 'bg-green-500/20 border-green-500/50';
      default:
        return 'bg-gray-500/20 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard className="text-center">
        <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-gray-400 mb-2">Health Score</p>
            <p className="text-5xl font-bold gradient-text">{healthScore}/100</p>
          </div>
          <div>
            <p className="text-gray-400 mb-2">Prediction Confidence</p>
            <p className="text-5xl font-bold text-accent-500">{confidence}%</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-xl font-bold mb-6">Disease Predictions</h3>
        <div className="space-y-4">
          {predictions.map((pred, i) => (
            <motion.div
              key={pred.disease}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">
                  {pred.disease.includes('Heart') && '❤️'}
                  {pred.disease.includes('Diabetes') && '🩸'}
                  {pred.disease.includes('Kidney') && '🫘'}
                  {pred.disease.includes('Liver') && '🫁'}
                  {pred.disease.includes('Stroke') && '🧠'}
                  {pred.disease.includes('Breast') && '🎗️'}
                  {pred.disease.includes('Parkinson') && '⚡'}
                </div>
                <div>
                  <p className="font-semibold">{pred.disease}</p>
                  <p className="text-gray-400 text-sm">
                    Probability: {(pred.probability * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full border ${getRiskBadgeColor(pred.risk_level)} ${getRiskColor(pred.risk_level)} font-semibold`}>
                {pred.risk_level}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-xl font-bold mb-4">Recommendations</h3>
        {predictions.every(p => p.risk_level === 'Low') ? (
          <div className="p-4 rounded-xl bg-green-600/10 border border-green-600/30">
            <p className="font-semibold text-green-400">✅ You appear healthy! Keep maintaining your lifestyle.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {predictions.filter(p => p.risk_level === 'High' || p.risk_level === 'Medium').map((p, idx) => {
              const isHigh = p.risk_level === 'High';
              const boxClass = isHigh ? 'bg-gradient-to-r from-red-600/20 to-orange-400/10 border-red-600/40' : 'bg-yellow-400/10 border-yellow-400/30';
              const dot = isHigh ? '🔴' : '🟡';

              const keywords: Record<string, string[]> = {
                'Heart': ['cardiologist', 'blood pressure', 'ecg', 'echo'],
                'Diabetes': ['sugar', 'glucose', 'carbohydrate'],
                'Kidney': ['water', 'salt'],
                'Liver': ['alcohol', 'fatty', 'hepatologist'],
                'Stroke': ['emergency']
              };

              const ks = Object.keys(keywords).find(k => p.disease.includes(k));
              const filtered = ks
                ? recommendations.filter(r => keywords[ks].some(k => r.toLowerCase().includes(k)))
                : recommendations;

              const itemsToShow = filtered.length > 0 ? filtered : recommendations;

              return (
                <div key={p.disease + idx} className={`p-4 rounded-xl border ${boxClass}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🏥</div>
                      <div>
                        <p className="font-bold">[{p.disease} - {p.risk_level} Risk {dot}]</p>
                        <p className="text-sm text-gray-400 mt-1">⚠️ Recommendations:</p>
                      </div>
                    </div>
                    <button className="px-3 py-2 bg-primary-500 text-white rounded-lg">Consult Doctor</button>
                  </div>

                  <ul className="mt-3 list-disc list-inside">
                    {itemsToShow.map((rec, i) => (
                      <li key={i} className="text-gray-200">{rec}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </GlassCard>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onReset}
        className="w-full glass-card px-8 py-4 rounded-xl font-semibold text-lg"
      >
        New Prediction
      </motion.button>
    </div>
  );
};

export default ResultPanel;
