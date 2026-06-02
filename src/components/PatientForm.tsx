import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { predictionService, PredictionInput, PredictionResponse } from '../services/apiService';

interface PatientFormProps {
  onSubmit: (result: PredictionResponse) => void;
  isLoading: boolean;
}

const PatientForm = ({ onSubmit, isLoading }: PatientFormProps) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    blood_pressure: '',
    cholesterol: '',
    glucose: '',
    heart_rate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: PredictionInput = {
      age: parseInt(formData.age),
      gender: formData.gender,
      height: formData.height ? parseFloat(formData.height) : null,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      blood_pressure: formData.blood_pressure ? parseInt(formData.blood_pressure) : null,
      cholesterol: formData.cholesterol ? parseInt(formData.cholesterol) : null,
      glucose: formData.glucose ? parseInt(formData.glucose) : null,
      heart_rate: formData.heart_rate ? parseInt(formData.heart_rate) : null,
      symptoms: [],
    };

    try {
      const result = await predictionService.predict(submitData);
      onSubmit(result);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Failed to get prediction. Please try again.');
    }
  };

  return (
    <GlassCard className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Patient Information</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-500"
              placeholder="Enter age"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-2">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-500"
              placeholder="170"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-500"
              placeholder="70"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-2">Blood Pressure (mmHg)</label>
            <input
              type="number"
              name="blood_pressure"
              value={formData.blood_pressure}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-500"
              placeholder="120"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Cholesterol (mg/dL)</label>
            <input
              type="number"
              name="cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-500"
              placeholder="200"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-2">Glucose (mg/dL)</label>
            <input
              type="number"
              name="glucose"
              value={formData.glucose}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-500"
              placeholder="100"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Heart Rate (bpm)</label>
            <input
              type="number"
              name="heart_rate"
              value={formData.heart_rate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-500"
              placeholder="75"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/30 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Predict Diseases'}
        </motion.button>
      </form>
    </GlassCard>
  );
};

export default PatientForm;
