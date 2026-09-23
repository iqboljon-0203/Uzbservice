'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldAlert, PhoneCall } from 'lucide-react';
import { Language } from '@/data/content';

interface SymptomChecklistProps {
  data: {
    title: { ru: string; uz: string };
    desc: { ru: string; uz: string };
    items: { ru: string; uz: string }[];
  };
  lang: Language;
  onOpenModal: () => void;
}

export const SymptomChecklist: React.FC<SymptomChecklistProps> = ({
  data,
  lang,
  onOpenModal,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50/40 to-slate-50 p-6 sm:p-12 rounded-3xl border border-blue-100 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content & Checklist */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100/80 text-[#1390FC] text-xs font-bold mb-3">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{lang === 'ru' ? 'Диагностика и симптомы' : 'Diagnostika va alomatlar'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                {data.title[lang]}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-2xl">
                {data.desc[lang]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {data.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start space-x-3 p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800">
                      {item[lang]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Quick Call to Action Card */}
            <div className="lg:col-span-4 flex flex-col justify-center bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-[#FFC107] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <PhoneCall className="w-6 h-6 text-slate-900" />
              </div>

              <h4 className="text-lg font-bold text-slate-900 mb-1">
                {lang === 'ru' ? 'Нужна точная диагностика?' : 'Aniq diagnostika kerakmi?'}
              </h4>

              <p className="text-xs text-slate-500 mb-5">
                {lang === 'ru'
                  ? 'Мастер приедет с профессиональным тестером и бесплатно определит неисправность'
                  : 'Usta maxsus asboblar bilan kelib, nosozlikni aniqlaydi'}
              </p>

              <button
                type="button"
                onClick={onOpenModal}
                className="btn-uzb-blue w-full py-3.5 text-sm font-bold shadow-md cursor-pointer mb-3"
              >
                {lang === 'ru' ? 'Вызвать мастера' : 'Ustani chaqirish'}
              </button>

              <a
                href="tel:+998770026776"
                className="text-xs font-bold text-[#1390FC] hover:underline"
              >
                +998 77 002 67 76
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
