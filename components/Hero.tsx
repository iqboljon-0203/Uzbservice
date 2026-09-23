'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Wrench, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { Language, siteContent } from '@/data/content';
import { FloatingShapes } from '@/components/FloatingShapes';

interface HeroProps {
  lang: Language;
  onOpenModal: () => void;
  content?: any;
}

const pillIcons = [Wrench, CheckCircle2, ShieldCheck, Award];

export const Hero: React.FC<HeroProps> = ({ lang, onOpenModal, content: propContent }) => {
  const content = propContent || siteContent[lang].hero;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative pt-24 sm:pt-36 pb-12 sm:pb-20 lg:pb-24 overflow-hidden bg-[#F5F7F8]">
      {/* Floating Ambient Shapes with subtle infinite bobbing */}
      <FloatingShapes />

      {/* Background Decorative Blob Gradients */}
      <div className="absolute top-10 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-10 right-5 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Pill Header Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center self-start mb-3 sm:mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide bg-blue-50 text-[#1390FC] border border-blue-200/60 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#1390FC] animate-pulse mr-2" />
                {content.badge || (lang === 'ru' ? 'TOSHKENT SERVICE — Сервисный центр №1' : 'TOSHKENT SERVICE — №1 Servis markazi')}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] leading-[1.15] tracking-tight mb-3 sm:mb-5"
            >
              {content.title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mb-6 sm:mb-8"
            >
              {content.subtitle}
            </motion.p>

            {/* 4 Feature Badges / Pills */}
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {(content.pills || []).map((pill: any, idx: number) => {
                  const Icon = pillIcons[idx % pillIcons.length];
                  return (
                    <motion.li
                      key={idx}
                      whileHover={{ scale: 1.01, x: 3 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center space-x-3 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200/80 shadow-xs hover:border-[#1390FC]/40 transition-colors"
                    >
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-[#1390FC] flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-800">
                        {pill.title}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Urgency caption */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-medium mb-5"
            >
              <Clock className="w-4 h-4 text-[#FFC107] flex-shrink-0 animate-pulse" />
              <span>{content.urgency}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onOpenModal}
                className="btn-uzb-blue w-full sm:w-auto text-center justify-center group cursor-pointer text-base font-semibold tracking-wide py-3.5 sm:py-4 flex items-center space-x-2"
              >
                <span>{content.ctaBtn}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href="tel:+998770026776"
                className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 sm:py-4 rounded-xl border-2 border-slate-300 hover:border-[#1390FC] text-[#1A1A1A] hover:text-[#1390FC] font-semibold text-base transition-all bg-white shadow-xs"
              >
                <span>+998 77 002 67 76</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Graphic with Responsive Ambient Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex items-center justify-center mt-4 lg:mt-0"
          >
            {/* Ambient circular frame */}
            <div className="relative w-full max-w-[340px] sm:max-w-[480px] aspect-square flex items-center justify-center">
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#1390FC]/20 via-[#FFC107]/20 to-transparent blur-2xl -z-10" />

              {/* Floating Badge 1: 24/7 */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1 left-1 sm:-top-3 sm:-left-3 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/80 flex items-center space-x-2 z-20"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[11px] sm:text-xs">
                  24/7
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-none">Режим работы</p>
                  <p className="text-xs sm:text-xs font-bold text-slate-800 mt-0.5">Круглосуточно</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Rating */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-1 right-1 sm:-bottom-4 sm:-right-2 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/80 flex items-center space-x-2 z-20"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 text-[#FFC107] flex items-center justify-center font-bold text-xs sm:text-sm">
                  ★
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-none">Рейтинг</p>
                  <p className="text-xs sm:text-xs font-bold text-slate-800 mt-0.5">5.0 (6900+ заказов)</p>
                </div>
              </motion.div>

              {/* Hero Image */}
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                  src={(content?.image && typeof content.image === 'string' && content.image.trim().length > 3) ? content.image : "/images/hero-img.png"}
                  alt="Ремонт бытовой техники в Ташкенте"
                  width={520}
                  height={520}
                  className="w-full h-auto object-contain drop-shadow-2xl animate-float max-h-[320px] sm:max-h-none"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
