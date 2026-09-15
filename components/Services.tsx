'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Language, siteContent, ServiceItem } from '@/data/content';

interface ServicesProps {
  lang: Language;
  onSelectService: (serviceName: string) => void;
}

const serviceUrlMap: Record<string, string> = {
  'gas-boilers': '/remont-gazovyh-kotlov-v-tashkente',
  'refrigerators': '/remont-holodilnikov-v-tashkente',
  'air-conditioners': '/remont-kondiczionerov-v-tashkente',
  'washing-machines': '/remont-stiralnyh-mashin-v-tashkente',
};

export const Services: React.FC<ServicesProps> = ({ lang, onSelectService }) => {
  const content = siteContent[lang].services;

  return (
    <section id="uslugi" className="py-14 sm:py-20 lg:py-28 bg-[#132739] text-white relative overflow-hidden">
      {/* Subtle backdrop pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="inline-flex items-center space-x-2 mb-2 sm:mb-3"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFC107]" />
            <span className="text-[11px] sm:text-sm font-semibold tracking-wider uppercase text-[#FFC107]">
              {content.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            {content.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="mt-2.5 sm:mt-4 text-sm sm:text-lg text-slate-300 font-normal"
          >
            {content.subtitle}
          </motion.p>
        </div>

        {/* 4 Primary Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {content.items.map((service: ServiceItem, idx: number) => {
            const pageUrl = serviceUrlMap[service.id] || '#uslugi';
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group bg-[#193247] rounded-2xl overflow-hidden border border-white/10 hover:border-[#1390FC] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#1390FC]/20 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Circular 'Открыть' Hover Button */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900/50">
                    <Link href={pageUrl} className="block w-full h-full">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#193247] via-transparent to-transparent opacity-80" />

                      {/* Circular White 'Открыть' Button on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-16 h-16 rounded-full bg-white text-slate-900 font-extrabold text-xs uppercase tracking-wider shadow-2xl flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 hover:bg-[#FFC107] hover:scale-105 border border-white/40">
                          {lang === 'ru' ? 'Открыть' : 'Ochish'}
                        </div>
                      </div>
                    </Link>

                    {/* Badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-[#FFC107] text-slate-900 shadow-sm pointer-events-none z-10">
                      {service.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#1390FC] transition-colors mb-2 sm:mb-3">
                      <Link href={pageUrl} className="hover:underline">
                        {service.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-3 sm:mb-4">
                      {service.desc}
                    </p>

                    <div className="flex items-center space-x-2 text-xs text-[#FFC107] font-semibold">
                      <Check className="w-3.5 h-3.5 text-[#FFC107]" />
                      <span>{service.priceNote}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-[#1390FC] text-white font-semibold text-xs sm:text-sm transition-all border border-white/10 hover:border-[#1390FC] cursor-pointer group/btn active:scale-98"
                  >
                    <span>{content.orderBtn}</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Yellow Active Pagination Dots */}
        <div className="flex items-center justify-center space-x-2 mt-10">
          <span className="w-8 h-2.5 rounded-full bg-[#FFC107]" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
      </div>
    </section>
  );
};
