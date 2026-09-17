'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Power, RotateCw, Droplets, Lock, Thermometer, Snowflake, Zap, Volume2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { BreakdownItem } from '@/data/servicesData';
import { Language } from '@/data/content';

interface BreakdownGridProps {
  breakdowns: BreakdownItem[];
  lang: Language;
  onSelectBreakdown: (title: string) => void;
}

const getFaultIcon = (type: string) => {
  switch (type) {
    case 'heater':
      return <Flame className="w-5 h-5 text-amber-500" />;
    case 'power':
      return <Power className="w-5 h-5 text-red-500" />;
    case 'spin':
      return <RotateCw className="w-5 h-5 text-blue-500" />;
    case 'drain':
    case 'water':
      return <Droplets className="w-5 h-5 text-cyan-500" />;
    case 'lock':
      return <Lock className="w-5 h-5 text-purple-500" />;
    case 'temp':
      return <Thermometer className="w-5 h-5 text-rose-500" />;
    case 'ice':
      return <Snowflake className="w-5 h-5 text-sky-400" />;
    case 'motor':
      return <Zap className="w-5 h-5 text-yellow-500" />;
    case 'noise':
      return <Volume2 className="w-5 h-5 text-orange-500" />;
    case 'sensor':
      return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    default:
      return <ShieldAlert className="w-5 h-5 text-[#1390FC]" />;
  }
};

export const BreakdownGrid: React.FC<BreakdownGridProps> = ({
  breakdowns,
  lang,
  onSelectBreakdown,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 mb-2 sm:mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1390FC]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#1390FC]">
              {lang === 'ru' ? 'Частые неисправности' : 'Keng tarqalgan nosozliklar'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
            {lang === 'ru' ? 'Популярные поломки и решения' : 'Ommabop nosozliklar va ularning yechimi'}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-600">
            {lang === 'ru'
              ? 'Выберите вашу проблему — мастер приедет с необходимыми деталями и инструментом'
              : 'Texnikangizdagi muammoni tanlang — usta barcha kerakli ehtiyot qismlar bilan yetib boradi'}
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {breakdowns.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#1390FC]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Image Header with Badge */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title[lang]}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Price pill */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-[#FFC107] text-slate-900 shadow-sm">
                    {item.price[lang]}
                  </span>

                  {/* Icon badge */}
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center">
                    {getFaultIcon(item.iconType)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1390FC] transition-colors mb-2">
                    {item.title[lang]}
                  </h3>

                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    {item.description[lang].split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('-') ? 'flex items-start gap-2 mb-1.5' : 'mb-2'}>
                        {line.startsWith('-') ? (
                          <>
                            <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                            <span>{line.substring(1).trim()}</span>
                          </>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>

                  {item.symptoms[lang] && (
                    <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100/80 text-[11px] sm:text-xs text-slate-700">
                      <span className="font-semibold text-[#1390FC]">{lang === 'ru' ? 'Причина: ' : 'Alomati: '}</span>
                      {item.symptoms[lang]}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectBreakdown(item.title[lang])}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#1390FC] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-98 cursor-pointer group/btn"
                >
                  <span>{lang === 'ru' ? 'Заказать Услугу' : 'Xizmatga buyurtma'}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
