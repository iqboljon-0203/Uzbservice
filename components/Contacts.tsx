'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Language, siteContent } from '@/data/content';

interface ContactsProps {
  lang: Language;
  content?: any;
}

export const Contacts: React.FC<ContactsProps> = ({ lang, content: propContent }) => {
  const content = propContent || siteContent[lang].contacts;

  return (
    <section id="contacts" className="py-14 sm:py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
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
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] tracking-tight"
          >
            {content.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-stretch">
          {/* Left Column: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-6"
          >
            {/* Card 1: Address */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#F5F7F8] border border-slate-200/80 hover:border-[#1390FC]/40 transition-all flex items-start space-x-3.5 sm:space-x-4 shadow-2xs">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-[#1390FC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-0.5 sm:mb-1">
                  {content.addressLabel}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {content.addressVal}
                </p>
              </div>
            </div>

            {/* Card 2: Phone */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#F5F7F8] border border-slate-200/80 hover:border-[#1390FC]/40 transition-all flex items-start space-x-3.5 sm:space-x-4 shadow-2xs">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-[#1390FC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-0.5 sm:mb-1">
                  {content.phoneLabel}
                </h3>
                <a
                  href={`tel:${content.phoneVal ? content.phoneVal.replace(/[^\d+]/g, '') : '+998770026776'}`}
                  className="text-base sm:text-lg font-bold text-[#1390FC] hover:underline"
                >
                  {content.phoneVal || '+998 77 002 67 76'}
                </a>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                  {content.scheduleEmergency}
                </p>
              </div>
            </div>

            {/* Card 3: Schedule */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#F5F7F8] border border-slate-200/80 hover:border-[#1390FC]/40 transition-all flex items-start space-x-3.5 sm:space-x-4 shadow-2xs">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-[#1390FC] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-0.5 sm:mb-1">
                  {content.scheduleLabel}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {content.scheduleWeekdays}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {content.scheduleWeekend}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Google Maps Iframe */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 h-64 sm:h-80 lg:h-auto min-h-[260px] sm:min-h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11994.957251687036!2d69.2917831531877!3d41.27101159382915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5576856ee19%3A0x8915f51ff79f3778!2z0YPQu9C40YbQsCDQotCw0LvQuNC80LDRgNC20L7QvSwg0KLQsNGI0LrQtdC90YIsIFRhc2hrZW50LCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e0!3m2!1sru!2s!4v1744056369875!5m2!1sru!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TOSHKENT SERVICE Location Map - Talimarjan 15, Tashkent"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
