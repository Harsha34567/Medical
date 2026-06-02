import { motion } from 'framer-motion';

const Sidebar = () => {
  const menuItems = [
    { icon: '🏠', label: 'Dashboard' },
    { icon: '📊', label: 'Analytics' },
    { icon: '📝', label: 'Records' },
    { icon: '👥', label: 'Patients' },
    { icon: '🔬', label: 'Tests' },
    { icon: '💬', label: 'Messages' },
    { icon: '⚙️', label: 'Settings' },
  ];

  return (
    <motion.div
      className="glass-card w-64 h-full p-6 flex flex-col"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-10">
        <h1 className="text-2xl font-bold gradient-text">MedAI</h1>
      </div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <motion.a
            key={item.label}
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
            whileHover={{ x: 5 }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-gray-300">{item.label}</span>
          </motion.a>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;