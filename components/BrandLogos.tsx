'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '@/data/content';

interface BrandLogosProps {
  brands: string[];
  lang: Language;
}

export const BrandLogos: React.FC<BrandLogosProps> = ({ brands, lang }) => {
  return (
    <section className="py-14 sm:py-20 bg-[#F5F7F8] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1390FC] block mb-1">
            {lang === 'ru' ? 'Обслуживаем все бренды' : 'Barcha brendlarga xizmat ko\'rsatamiz'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
            {lang === 'ru' ? 'Ремонтируем технику любых производителей' : 'Har qanday ishlab chiqaruvchi texnikasini ta\'mirlaymiz'}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            {lang === 'ru'
              ? 'Используем сертифицированные заводские запчасти и схемы от официальных поставщиков'
              : 'Rasmiy yetkazib beruvchilardan sertifikatlangan original qismlardan foydalanamiz'}
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {brands.map((brand, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#1390FC] flex items-center justify-center text-center transition-all group"
            >
              <span className="font-extrabold text-sm sm:text-base text-slate-700 group-hover:text-[#1390FC] transition-colors tracking-tight">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
