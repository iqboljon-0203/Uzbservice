'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Language, siteContent, CounterItem } from '@/data/content';

interface StatsProps {
  lang: Language;
  content?: any;
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export const Stats: React.FC<StatsProps> = ({ lang, content: propContent }) => {
  const content = propContent || siteContent[lang].facts;

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-[#132739] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Facts Banner Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16 lg:mb-24">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-3 sm:mb-5"
            >
              {content.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed mb-6 sm:mb-8"
            >
              {content.description}
            </motion.p>

            {/* List */}
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.15 }}
              className="space-y-3 sm:space-y-4"
            >
              {content.points.map((point: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2.5 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFC107] text-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xs sm:text-base text-slate-200 font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[340px] sm:max-w-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#193247]"
            >
              <Image
                src={content.image || "/images/facts-image.png"}
                alt="Сервисный центр TOSHKENT SERVICE"
                width={536}
                height={665}
                className="w-full h-auto object-contain block"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* 4 Counter Box Items */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {content.counters.map((item: CounterItem, idx: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-[#193247] border border-white/10 text-center flex flex-col items-center justify-center hover:border-[#1390FC] transition-all duration-300 shadow-md group"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 mb-2.5 sm:mb-4 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#1390FC]/20 transition-colors">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={32}
                  height={32}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                />
              </div>

              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFC107] mb-1 sm:mb-2 font-mono">
                <AnimatedCounter target={item.target} suffix={item.suffix} />
              </h3>

              <p className="text-xs sm:text-sm lg:text-base text-slate-300 font-medium">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
