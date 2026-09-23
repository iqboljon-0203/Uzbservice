'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CalendarCheck } from 'lucide-react';
import { Language, siteContent } from '@/data/content';

interface WhyUsProps {
  lang: Language;
  onOpenModal: () => void;
  aboutContent?: any;
}

export const WhyUs: React.FC<WhyUsProps> = ({ lang, onOpenModal, aboutContent }) => {
  const content = aboutContent || siteContent[lang].about;

  return (
    <section id="o_nas" className="py-14 sm:py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Composite Visuals & Guarantee Box */}
          <div className="lg:col-span-6 relative">
            {/* Experience Box Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 sm:p-7 rounded-2xl border border-blue-100 flex items-start space-x-3.5 sm:space-x-4 shadow-xs"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-[#1390FC] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-1">
                  {content.experienceBox.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {content.experienceBox.desc}
                </p>
              </div>
            </motion.div>

            {/* Composite Images Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="relative h-48 sm:h-72 rounded-2xl overflow-hidden shadow-md border border-slate-100 group"
              >
                <Image
                  src={content.image1 || "/images/about-1.png"}
                  alt="Мастер по ремонту TOSHKENT SERVICE"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-56 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-100 group translate-y-2 sm:translate-y-4"
              >
                <Image
                  src={content.image2 || "/images/about-2.png"}
                  alt="Инструменты и запчасти TOSHKENT SERVICE"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 sm:p-4">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FFC107] px-2.5 py-1 rounded-md text-slate-900 shadow-xs">
                    {lang === 'ru' ? '100% Результат' : '100% Natija'}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Why Us Content & Features */}
          <div id="why_us" className="lg:col-span-6 flex flex-col justify-center mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="inline-flex items-center space-x-2 mb-2 sm:mb-3"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#1390FC]" />
              <span className="text-[11px] sm:text-sm font-semibold tracking-wider uppercase text-[#1390FC]">
                {content.badge}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl font-extrabold text-[#1A1A1A] leading-tight mb-3 sm:mb-5"
            >
              {content.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.15 }}
              className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8"
            >
              {content.description}
            </motion.p>

            {/* Service Feature List */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {(content.features || []).map((feature: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.15 + idx * 0.1 }}
                  className="flex items-start space-x-3 sm:space-x-4 p-3.5 sm:p-4 rounded-xl border border-slate-100 hover:border-[#1390FC]/30 hover:bg-slate-50/50 transition-all shadow-2xs"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-[#1390FC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    {idx === 0 ? <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6" /> : <Clock className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-0.5 sm:mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <button
                type="button"
                onClick={onOpenModal}
                className="btn-uzb-primary w-full sm:w-auto text-center justify-center cursor-pointer text-sm uppercase tracking-wide py-3.5"
              >
                {lang === 'ru' ? 'Вызвать мастера' : 'Ustani chaqirish'}
              </button>

              <a
                href="tel:+998770026776"
                className="text-sm font-semibold text-[#1390FC] hover:text-blue-700 underline underline-offset-4 text-center sm:text-left py-2"
              >
                +998 77 002 67 76
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
