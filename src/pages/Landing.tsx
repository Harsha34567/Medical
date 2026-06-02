import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DNAModel from '../components/DNAModel';
import GlassCard from '../components/GlassCard';

const Landing = () => {
  const stats = [
    { number: 98, label: 'Accuracy %' },
    { number: 24, label: 'Support 24/7' },
  ];

  return (
    <div className="min-h-screen">
      <nav className="glass-card mx-10 mt-6 px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold gradient-text">MedAI</div>
        <div className="flex gap-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <Link to="/dashboard" className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all">
            Launch App
          </Link>
        </div>
      </nav>

      <section className="px-10 py-16 flex items-center gap-16">
        <motion.div 
          className="flex-1"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-6">
            The Future of <span className="gradient-text">Healthcare</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            AI-powered diagnostics, predictive analytics, and personalized treatment plans. 
            Experience healthcare reimagined.
          </p>
          <div className="flex gap-4 mb-12">
            <Link to="/dashboard" className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/30 transition-all">
              Get Started Free
            </Link>
            <button className="glass-card px-8 py-4 rounded-2xl font-semibold text-lg">
              Watch Demo
            </button>
          </div>
          <div className="flex gap-12">
            {stats.map((stat, i) => (
              <div key={i}>
                <motion.div 
                  className="text-4xl font-bold gradient-text"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.2, type: 'spring' }}
                >
                  {stat.number}+
                </motion.div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="flex-1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <DNAModel />
        </motion.div>
      </section>

      <section className="px-10 py-16">
        <div className="grid grid-cols-3 gap-8">
          <GlassCard>
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-2xl font-bold mb-2">AI Diagnostics</h3>
            <p className="text-gray-400">Advanced machine learning for accurate disease detection</p>
          </GlassCard>
          <GlassCard>
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-2">Real-time Analytics</h3>
            <p className="text-gray-400">Comprehensive health insights and trend analysis</p>
          </GlassCard>
          <GlassCard>
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-2xl font-bold mb-2">Smart Assistant</h3>
            <p className="text-gray-400">Voice-enabled AI for instant medical guidance</p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Landing;