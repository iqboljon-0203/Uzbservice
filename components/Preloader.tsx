'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power } from 'lucide-react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Brief smooth display before revealing page content
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1390FC]"
        >
          <div className="relative flex items-center justify-center">
            {/* Outer Spinning Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              className="w-20 h-20 rounded-full border-4 border-white/20 border-t-white border-r-[#FFC107]"
            />

            {/* Centered White Power Icon */}
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <Power className="w-8 h-8 stroke-[2.5]" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
