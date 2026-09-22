'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, CheckCircle2, Loader2 } from 'lucide-react';
import { Language, siteContent } from '@/data/content';
import confetti from 'canvas-confetti';

interface UrgencyBannerProps {
  lang: Language;
  onOpenModal: () => void;
  content?: any;
}

export const UrgencyBanner: React.FC<UrgencyBannerProps> = ({ lang, onOpenModal, content: propContent }) => {
  const content = propContent || siteContent[lang].urgencyBanner;
  const modalContent = siteContent[lang].modal;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [service, setService] = useState(modalContent.servicesList[0]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [honeypot, setHoneypot] = useState('');

  const formatUzPhone = (value: string): string => {
    let digits = value.replace(/\D/g, '');
    if (digits.startsWith('998')) {
      digits = digits.substring(3);
    }
    digits = digits.substring(0, 9);
    
    let formatted = '+998';
    if (digits.length > 0) {
      formatted += ' (' + digits.substring(0, 2);
    }
    if (digits.length >= 2) {
      formatted += ') ';
    }
    if (digits.length > 2) {
      formatted += digits.substring(2, 5);
    }
    if (digits.length >= 5) {
      formatted += '-';
    }
    if (digits.length > 5) {
      formatted += digits.substring(5, 7);
    }
    if (digits.length >= 7) {
      formatted += '-';
    }
    if (digits.length > 7) {
      formatted += digits.substring(7, 9);
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUzPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digitsOnly = phone.replace(/[^\d]/g, '');
    if (digitsOnly.length < 12) {
      setErrorMessage(
        lang === 'ru'
          ? 'Пожалуйста, укажите полный номер телефона (+998 ...)'
          : 'Iltimos, to\'liq telefon raqamini kiriting (+998 ...)'
      );
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || (lang === 'ru' ? 'Клиент с сайта (CTA форма)' : 'Saytdan mijoz (CTA forma)'),
          phone: phone.trim(),
          service,
          lang,
          hp_website: honeypot,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setErrorMessage(data.error || 'Ошибка отправки');
      }
    } catch {
      setErrorMessage(lang === 'ru' ? 'Ошибка сети. Попробуйте снова.' : 'Tarmoq xatosi. Qayta urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-14 sm:py-20 lg:py-28 bg-[#132739] text-white overflow-hidden">
      {/* Background Graphic with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.bg_image || "/images/cta-box-bg.jpg"}
          alt="CTA Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#132739] via-[#132739]/95 to-[#132739]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Callout & Quick Form */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3 sm:mb-5"
            >
              {content.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl"
            >
              {content.desc}
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 mb-8 sm:mb-10"
            >
              <button
                type="button"
                onClick={onOpenModal}
                className="btn-uzb-primary w-full sm:w-auto text-center justify-center cursor-pointer text-sm sm:text-base uppercase font-semibold py-3.5 sm:py-4"
              >
                {content.btn}
              </button>

              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <span className="text-slate-400 text-xs sm:text-sm font-semibold">{content.or}</span>

                {/* Call Now Box */}
                <a
                  href="tel:+998958484040"
                  className="flex items-center space-x-2.5 group text-white hover:text-[#FFC107] transition-colors py-2"
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/10 group-hover:bg-[#FFC107] group-hover:text-slate-900 text-[#FFC107] flex items-center justify-center transition-all shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-slate-400">{content.callLabel}</span>
                    <span className="block text-sm sm:text-base font-bold tracking-tight">
                      +998 95 848 40 40
                    </span>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Inline Fast Lead Capture Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-8 border border-white/15 max-w-xl shadow-xl"
            >
              {submitted ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{content.successTitle}</h3>
                  <p className="text-xs sm:text-sm text-slate-300">{content.successDesc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {/* Honeypot hidden input */}
                  <input
                    type="text"
                    name="hp_website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white">{content.formTitle}</h3>
                    <p className="text-xs text-slate-300">{content.formSubtitle}</p>
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-red-500/20 border border-red-500/40 text-xs text-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={content.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#1390FC] focus:bg-white/15 transition-all"
                    />

                    <input
                      type="tel"
                      placeholder={content.phonePlaceholder}
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#1390FC] focus:bg-white/15 transition-all font-mono"
                    />
                  </div>

                  <div>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#193247] border border-white/20 text-white text-base sm:text-sm focus:outline-none focus:border-[#1390FC] transition-all cursor-pointer"
                    >
                      {modalContent.servicesList.map((item, i) => (
                        <option key={i} value={item} className="bg-[#132739] text-white">
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#1390FC] hover:bg-blue-600 text-white font-bold text-sm sm:text-base transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 active:scale-98"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{content.sending}</span>
                      </>
                    ) : (
                      <span>{content.submitBtn}</span>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right Column: CTA Image */}
          <div className="lg:col-span-5 flex justify-center self-end lg:-mb-28 sm:-mb-20 -mb-14 mt-8 lg:mt-0 relative z-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-none lg:w-[125%] flex justify-center"
            >
              <Image
                src="/images/cta-box-img.png"
                alt="Вызов мастера по ремонту бытовой техники"
                width={800}
                height={800}
                className="w-full h-auto object-contain drop-shadow-2xl scale-110 lg:scale-[1.6] origin-bottom"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
