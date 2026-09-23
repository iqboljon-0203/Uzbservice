'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckCircle2, PhoneCall } from 'lucide-react';
import { Language } from '@/data/content';

interface FaqItem {
  q: { ru: string; uz: string };
  a: { ru: string; uz: string };
}

export const defaultFaqItems: FaqItem[] = [
  {
    q: {
      ru: 'Сколько стоит выезд мастера и диагностика техники?',
      uz: 'Ustaning uyga chiqishi va diagnostika narxi qancha?',
    },
    a: {
      ru: 'При согласии на ремонт выезд мастера по Ташкенту — бесплатный. Диагностика неисправности начинается от 80 000 сум и учитывается в итоговой стоимости работы. Вы заранее знаете точную цену до начала работ.',
      uz: 'Ta\'mirlashga rozi bo\'linganda ustaning Toshkent bo\'ylab chiqishi bepul. Diagnostika 80 000 so\'mdan boshlanadi va ishning umumiy narxida hisobga olinadi. Siz ish boshlanishidan oldin aniq narxni bilasiz.',
    },
  },
  {
    q: {
      ru: 'Как быстро мастер приезжает по Ташкенту?',
      uz: 'Usta Toshkent bo\'ylab qancha vaqtda yetib keladi?',
    },
    a: {
      ru: 'В каждом из 12 районов Ташкента дежурят наши специалисты. В среднем мастер приезжает по адресу в течение 45–60 минут после подтверждения заявки или в любое удобное для вас время.',
      uz: 'Toshkentning barcha 12 ta tumanida navbatchi ustalarimiz mavjud. O\'rtacha hisobda mutaxassis buyurtma tasdiqlangandan so\'ng 45-60 daqiqa ichida yoki sizga qulay bo\'lgan vaqtda yetib boradi.',
    },
  },
  {
    q: {
      ru: 'Предоставляется ли официальная гарантия на ремонт?',
      uz: 'Bajarilgan ta\'mir va ehtiyot qismlarga kafolat beriladimi?',
    },
    a: {
      ru: 'Да, после завершения ремонта мастер выписывает официальный гарантийный талон сроком от 1 месяца до 1 года (в зависимости от вида услуги и установленных деталей). Если проблема повторится, устраним бесплатно.',
      uz: 'Ha, albatta! Ish yakunlangach usta 1 oydan 1 yilgacha rasmiy kafolat talonini taqdim etadi. Agar kafolat davrida nosozlik qaytarilsa, bepul bartaraf qilib beriladi.',
    },
  },
  {
    q: {
      ru: 'Какую технику вы ремонтируете?',
      uz: 'Qanday maishiy texnikalarni ta\'mirlaysizlar?',
    },
    a: {
      ru: 'Мы профессионально ремонтируем 4 основных вида техники: газовые и двухконтурные котлы, бытовые кондиционеры (чистка, заправка фреоном R410/R22), холодильники (замена компрессора, утечка) и автоматические стиральные машины всех брендов (LG, Samsung, Artel, Bosch, Midea, Immergas, Navien и др.).',
      uz: 'Biz 4 ta asosiy yo\'nalishda ixtisoslashganmiz: gaz qozonlari va ikki konturli kotellar, konditsionerlar (yuvish, freon quyish), xolodilniklar hamda barcha rusumdagi kir yuvish mashinalari (LG, Samsung, Artel, Bosch, Midea, Immergas, Navien va boshqalar).',
    },
  },
  {
    q: {
      ru: 'Какие запчасти используются при ремонте?',
      uz: 'Ta\'mirlashda qanday ehtiyot qismlardan foydalaniladi?',
    },
    a: {
      ru: 'Мастера используют только сертифицированные оригинальные запчасти или проверенные качественные аналоги от официальных поставщиков, что гарантирует долгую службу вашей техники.',
      uz: 'Ustalarimiz faqat sertifikatlangan original yoki rasmiy yetkazib beruvchilarning sifatli ehtiyot qismlaridan foydalanishadi, bu esa texnikangizning uzoq muddat xizmat qilishini ta\'minlaydi.',
    },
  },
  {
    q: {
      ru: 'Какие способы оплаты принимаются?',
      uz: 'To\'lov qanday usullarda qabul qilinadi?',
    },
    a: {
      ru: 'Оплата производится строго после завершения и проверки работы. Принимаем наличные, а также безналичные переводы через Payme, Click и Uzum Bank.',
      uz: 'To\'lov faqat ish to\'liq bajarilib, texnika mijoz tomonidan tekshirilgandan so\'ng amalga oshiriladi. Naqd pul, shuningdek Payme, Click va Uzum Bank orqali to\'lash mumkin.',
    },
  },
];

interface FaqSectionProps {
  lang: Language;
  items?: FaqItem[];
  onOpenModal?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  lang,
  items = defaultFaqItems,
  onOpenModal,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isRu = lang === 'ru';

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-slate-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1390FC] text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ / {isRu ? 'Вопросы и ответы' : 'Savol-javoblar'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-4">
            {isRu ? (
              <>
                Часто задаваемые вопросы о{' '}
                <span className="text-[#1390FC]">Toshkent Service</span>
              </>
            ) : (
              <>
                Ko&apos;p beriladigan savollar va{' '}
                <span className="text-[#1390FC]">aniq javoblar</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {isRu
              ? 'Собрали подробные ответы на самые важные вопросы о вызове мастера, ценах, гарантии и сроках ремонта.'
              : 'Usta chaqirish, narxlar, kafolat va ta\'mirlash muddatlari bo\'yicha eng muhim savollarga javoblar.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#1390FC] bg-blue-50/20 shadow-sm'
                    : 'border-slate-200/90 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#1A1A1A] leading-snug">
                    {isRu ? item.q.ru : item.q.uz}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-[#1390FC] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {isRu ? item.a.ru : item.a.uz}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help */}
        <div className="mt-10 sm:mt-12 p-6 rounded-2xl bg-[#F5F7F8] border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
              {isRu ? 'Остались вопросы по ремонту?' : 'Savolingizga javob topmadingizmi?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isRu
                ? 'Наш мастер проконсультирует вас бесплатно прямо по телефону.'
                : 'Ustalarimiz sizga telefon orqali bepul maslahat berishadi.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="tel:+998770026776"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#1390FC] text-white text-xs sm:text-sm font-semibold hover:bg-blue-600 transition-colors shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+998 (77) 002-67-76</span>
            </a>
            {onOpenModal && (
              <button
                type="button"
                onClick={onOpenModal}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:border-[#1390FC] hover:text-[#1390FC] transition-colors cursor-pointer"
              >
                {isRu ? 'Консультация' : 'Maslahat olish'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
