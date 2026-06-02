import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard = ({ children, className = '' }: GlassCardProps) => {
  return (
    <motion.div
      className={`glass-card rounded-2xl p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 0 40px rgba(0,153,255,0.25)' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;