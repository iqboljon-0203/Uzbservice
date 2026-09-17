'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language } from '@/data/content';

interface BrandLogosProps {
  brands: string[];
  lang: Language;
}

const brandDomains: Record<string, string> = {
  Samsung: 'samsung.com',
  LG: 'lg.com',
  Artel: 'artelgroup.org',
  Indesit: 'indesit.com',
  Beko: 'beko.com',
  Atlant: 'atlant.by',
  Bosch: 'bosch.com',
  Haier: 'haier.com',
  Midea: 'midea.com',
  Gree: 'gree.com',
  Daikin: 'daikin.com',
  Panasonic: 'panasonic.com',
  Navien: 'navien.com',
  Baxi: 'baxi.com',
  Ariston: 'ariston.com',
  Immergas: 'immergas.com',
  Ferroli: 'ferroli.com',
  Viessmann: 'viessmann.com',
  Vaillant: 'vaillant.com',
  Protherm: 'protherm.com',
  Rinnai: 'rinnai.com',
  Chaffoteaux: 'chaffoteaux.com',
  Fondital: 'fondital.com',
  Hydrosta: 'hydrosta.com',
  Zanussi: 'zanussi.com'
};

const BrandItem = ({ brand }: { brand: string }) => {
  const [imgError, setImgError] = useState(false);
  const domain = brandDomains[brand] || `${brand.toLowerCase()}.com`;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="bg-white px-3 py-4 sm:p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#1390FC] flex items-center justify-center gap-2 sm:gap-3 transition-all group h-16 sm:h-20"
    >
      {!imgError && (
        <img 
          src={faviconUrl} 
          alt={`${brand} icon`} 
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" 
          onError={() => setImgError(true)}
        />
      )}
      <span className="font-extrabold text-[13px] sm:text-base text-slate-700 group-hover:text-[#1390FC] transition-colors tracking-tight">
        {brand}
      </span>
    </motion.div>
  );
};

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {brands.map((brand, idx) => (
            <BrandItem key={idx} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};
