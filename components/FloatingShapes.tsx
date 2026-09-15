'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Yellow Circle 1 - Top Left */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          x: [-4, 4, -4],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-[10%] w-6 h-6 rounded-full border-2 border-[#FFC107] opacity-60"
      />

      {/* Solid Yellow Dot - Center Left */}
      <motion.div
        animate={{
          y: [6, -6, 6],
          x: [3, -3, 3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-[5%] w-3 h-3 rounded-full bg-[#FFC107] opacity-75 shadow-xs"
      />

      {/* Muted Gray Plus (+) Cross 1 */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-28 left-[45%] text-slate-300 font-bold text-xl select-none"
      >
        +
      </motion.div>

      {/* Muted Gray Plus (+) Cross 2 */}
      <motion.div
        animate={{
          y: [8, -8, 8],
          rotate: [180, 90, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-24 left-[15%] text-slate-300 font-bold text-2xl select-none"
      >
        +
      </motion.div>

      {/* Blue Triangle Shape - Top Right */}
      <motion.div
        animate={{
          y: [-7, 7, -7],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-16 right-[15%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-[#1390FC]/30"
      />

      {/* Hollow Triangle - Center Right */}
      <motion.div
        animate={{
          y: [9, -9, 9],
          rotate: [15, -15, 15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-2/3 right-[8%] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-[#FFC107]/40"
      />

      {/* Solid Small Blue Dot - Bottom Center */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-16 right-[40%] w-3 h-3 rounded-full bg-[#1390FC]/50"
      />
    </div>
  );
};
