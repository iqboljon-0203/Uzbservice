'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Phone, User, Wrench, MessageSquare } from 'lucide-react';
import { Language, siteContent } from '@/data/content';
import confetti from 'canvas-confetti';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialService?: string;
  content?: any;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialService,
  content: propContent,
}) => {
  const content = propContent || siteContent[lang].modal;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [service, setService] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    } else if (content.servicesList.length > 0) {
      setService(content.servicesList[0]);
    }
  }, [initialService, content.servicesList]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
          name: name.trim() || (lang === 'ru' ? 'Клиент с сайта' : 'Saytdan mijoz'),
          phone: phone.trim(),
          service: service || content.servicesList[0],
          comment: comment.trim(),
          lang,
          hp_website: honeypot,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } else {
        setErrorMessage(data.error || 'Ошибка отправки');
      }
    } catch {
      setErrorMessage(
        lang === 'ru' ? 'Ошибка сети. Попробуйте снова.' : 'Tarmoq xatosi. Qayta urinib ko\'ring.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('+998 ');
    setComment('');
    setErrorMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Dialog Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
            className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#132739] to-[#1a3a54] p-5 sm:p-8 text-white relative flex-shrink-0">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#FFC107] text-slate-900 mb-1.5 sm:mb-2">
                TOSHKENT SERVICE
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold">{content.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 sm:mt-1">{content.subtitle}</p>
            </div>

            {/* Form or Success State (Scrollable if small phone) */}
            <div className="p-5 sm:p-8 overflow-y-auto">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2">
                    {content.success}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mb-5 sm:mb-6">
                    {content.successSub}
                  </p>
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="btn-uzb-blue w-full py-3 sm:py-3.5 font-semibold text-sm"
                  >
                    {content.close}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
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

                  {errorMessage && (
                    <div className="p-2.5 sm:p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {content.name}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder={content.namePlaceholder}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm focus:bg-white focus:outline-none focus:border-[#1390FC] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {content.phone} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        placeholder={content.phonePlaceholder}
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm font-mono focus:bg-white focus:outline-none focus:border-[#1390FC] transition-all"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {content.service}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm focus:bg-white focus:outline-none focus:border-[#1390FC] transition-all cursor-pointer appearance-none"
                      >
                        {(content.servicesList || []).map((item: any, idx: number) => (
                          <option key={idx} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {content.comment}
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea
                        rows={2}
                        placeholder={content.commentPlaceholder}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm focus:bg-white focus:outline-none focus:border-[#1390FC] transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-uzb-blue w-full py-3.5 mt-1 sm:mt-2 font-bold text-sm tracking-wide shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2 active:scale-98"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{content.submitting}</span>
                      </>
                    ) : (
                      <span>{content.submit}</span>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-[11px] text-slate-400 text-center leading-tight pt-1">
                    {content.privacy}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
