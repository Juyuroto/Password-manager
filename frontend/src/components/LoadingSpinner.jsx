import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <motion.div
      style={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        border: '6px solid var(--color-light)',
        borderTop: '6px solid var(--color-dark)',
      }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  </div>
);

export default LoadingSpinner;