import React from 'react';
import { motion } from 'framer-motion';

interface SlideProps {
  children: React.ReactNode;
  key?: string;
}

export const Slide: React.FC<SlideProps> = ({ children, key }) => {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

export default Slide;
