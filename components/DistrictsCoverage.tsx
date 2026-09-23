'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Shield, PhoneCall } from 'lucide-react';
import { Language } from '@/data/content';

interface DistrictsCoverageProps {
  lang: Language;
  onOpenModal?: () => void;
}

const districts = [
  { ru: 'Юнусабадский район', uz: 'Yunusobod tumani', time: '30-45 мин' },
  { ru: 'Чиланзарский район', uz: 'Chilonzor tumani', time: '30-45 мин' },
  { ru: 'Мирзо-Улугбекский район', uz: 'Mirzo Ulug\'bek tumani', time: '35-50 мин' },
  { ru: 'Сергелийский район', uz: 'Sergeli tumani', time: '40-60 мин' },
  { ru: 'Яккасарайский район', uz: 'Yakkasaroy tumani', time: '30-45 мин' },
  { ru: 'Шайхантахурский район', uz: 'Shayxontohur tumani', time: '30-45 мин' },
  { ru: 'Алмазарский район', uz: 'Olmazor tumani', time: '35-50 мин' },
  { ru: 'Мирабадский район', uz: 'Mirobod tumani', time: '30-45 мин' },
  { ru: 'Яшнабадский район', uz: 'Yashnobod tumani', time: '30-45 мин' },
  { ru: 'Учтепинский район', uz: 'Uchtepa tumani', time: '35-50 мин' },
  { ru: 'Бектемирский район', uz: 'Bektemir tumani', time: '45-60 мин' },
  { ru: 'Янгихаётский район', uz: 'Yangihayot tumani', time: '40-60 мин' },
];

export const DistrictsCoverage: React.FC<DistrictsCoverageProps> = ({ lang, onOpenModal }) => {
  const isRu = lang === 'ru';

  return (
    <section id="districts" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden border-t border-slate-100">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1390FC] text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isRu ? 'География обслуживания' : 'Xizmat ko\'rsatish hududi'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] tracking-tight mb-4 leading-tight">
            {isRu ? (
              <>
                Ремонт бытовой техники{' '}
                <span className="text-[#1390FC]">во всех районах Ташкента</span>
              </>
            ) : (
              <>
                Toshkentning{' '}
                <span className="text-[#1390FC]">barcha tumanlarida</span> tezkor ta&apos;mirlash
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {isRu
              ? 'Наши дежурные мастера находятся во всех 12 районах столицы. Выезд специалиста на дом с необходимым оборудованием и запчастями от 45 минут.'
              : 'Navbatchi ustalarimiz poytaxtning barcha 12 ta tumanida mavjud. Usta barcha zarur ehtiyot qismlari va jihozlar bilan 45 daqiqa ichida yetib boradi.'}
          </p>
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {districts.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className="group p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#1390FC] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start space-x-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1390FC] group-hover:bg-[#1390FC] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A] group-hover:text-[#1390FC] transition-colors line-clamp-1">
                    {isRu ? item.ru : item.uz}
                  </h3>
                  <div className="flex items-center space-x-1 text-[11px] text-slate-500 mt-0.5">
                    <Clock className="w-3 h-3 text-[#FFC107]" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-emerald-600 font-semibold">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{isRu ? 'Мастер на дежурстве' : 'Usta navbatchilikda'}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner inside Districts */}
        <div className="bg-[#1A1A1A] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4 text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1390FC]/20 text-[#1390FC] flex items-center justify-center flex-shrink-0 border border-[#1390FC]/30">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">
                {isRu ? 'Нужен срочный выезд мастера?' : 'Ustaning zudlik bilan chiqishi kerakmi?'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                {isRu
                  ? 'Позвоните прямо сейчас или оставьте заявку онлайн — диспетчер сразу направит ближайшего мастера в вашем районе.'
                  : 'Hoziroq qo\'ng\'iroq qiling yoki ariza qoldiring — dispetcher darhol sizga eng yaqin tumandagi ustani yuboradi.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="tel:+998770026776"
              className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-[#1390FC] hover:bg-blue-600 text-white font-semibold text-sm transition-colors shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>+998 (77) 002-67-76</span>
            </a>
            {onOpenModal && (
              <button
                type="button"
                onClick={onOpenModal}
                className="flex-1 md:flex-initial px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/20 cursor-pointer text-center"
              >
                {isRu ? 'Вызвать мастера' : 'Usta chaqirish'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
