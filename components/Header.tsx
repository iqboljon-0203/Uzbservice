'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Globe, Wrench, Shield, Users, MessageSquare, MapPin, ChevronRight, ChevronDown } from 'lucide-react';
import { Language, siteContent } from '@/data/content';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenModal: (serviceName?: string) => void;
}

const CustomLangSelect = ({ lang, onChange, variant }: { lang: Language, onChange: (l: Language) => void, variant: 'desktop' | 'mobile' | 'drawer' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = [
    { code: 'ru', label: variant === 'mobile' ? 'RU' : 'Русский', fullLabel: 'Русский', icon: 'https://flagcdn.com/w20/ru.png' },
    { code: 'uz', label: variant === 'mobile' ? 'UZ' : 'Oʻzbekcha', fullLabel: 'Oʻzbekcha', icon: 'https://flagcdn.com/w20/uz.png' }
  ];
  
  const current = options.find(o => o.code === lang) || options[0];

  return (
    <div className={`relative ${variant === 'drawer' ? 'w-full' : ''}`} onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false);
    }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between border border-slate-200 bg-slate-50/80 text-slate-700 outline-none transition-colors cursor-pointer ${
          variant === 'drawer' ? 'w-full py-2.5 px-4 rounded-xl text-sm font-semibold' :
          variant === 'mobile' ? 'py-1 pl-2 pr-1.5 rounded-lg text-xs font-bold' :
          'py-1.5 pl-3 pr-2.5 rounded-xl text-xs font-semibold hover:border-[#1390FC] focus:border-[#1390FC]'
        }`}
      >
        <div className="flex items-center space-x-1.5">
          <img src={current.icon} alt={lang} className="w-4 h-auto rounded-[2px] shadow-sm" />
          <span>{current.label}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 ml-1.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1.5 w-max min-w-[130px] bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 py-1">
          {options.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => {
                onChange(opt.code as Language);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-left text-[13px] transition-colors ${lang === opt.code ? 'bg-blue-50/50 text-[#1390FC] font-bold' : 'text-slate-700 hover:bg-slate-50 font-medium'}`}
            >
              <img src={opt.icon} alt={opt.code} className="w-4 h-auto rounded-[2px] shadow-sm" />
              <span>{opt.fullLabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const content = siteContent[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#uslugi', label: content.nav.services, icon: Wrench },
    { href: '#o_nas', label: content.nav.about, icon: Shield },
    { href: '#why_us', label: content.nav.whyUs, icon: Users },
    { href: '#reviews', label: content.nav.reviews, icon: MessageSquare },
    { href: '#contacts', label: content.nav.contacts, icon: MapPin },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5 sm:py-3.5'
            : 'bg-white/90 backdrop-blur-sm py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative flex items-center transition-transform active:scale-95">
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden shrink-0 flex items-center">
                  <img
                    src="/images/logo.png"
                    alt="Toshkent Service Icon"
                    className="absolute left-0 h-full w-auto max-w-none"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[15px] sm:text-[19px] font-black leading-none tracking-wide text-[#0B1B3D] uppercase">Toshkent</span>
                  <span className="text-[11px] sm:text-[13px] font-bold leading-tight tracking-[0.1em] text-[#0B1B3D] uppercase">Service</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-[15px] font-medium text-slate-800 hover:text-[#1390FC] transition-colors rounded-lg hover:bg-slate-50"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Right Side: Phone + CTA + Lang */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Language Selector */}
              <CustomLangSelect lang={lang} onChange={onLanguageChange} variant="desktop" />

              {/* Phone Link */}
              <a
                href="tel:+998991231373"
                className="flex items-center space-x-2 text-[15px] font-semibold text-slate-900 hover:text-[#1390FC] transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1390FC] group-hover:bg-[#1390FC] group-hover:text-white transition-all shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+998 99 123 13 73</span>
              </a>

              {/* Order Button */}
              <button
                type="button"
                onClick={() => onOpenModal()}
                className="btn-uzb-primary text-sm uppercase tracking-wide cursor-pointer"
              >
                {content.nav.orderBtn}
              </button>
            </div>

            {/* Mobile Actions: Clean & Touch Friendly */}
            <div className="flex sm:hidden items-center space-x-2">
              {/* Language toggle pill */}
              <CustomLangSelect lang={lang} onChange={onLanguageChange} variant="mobile" />

              {/* Quick call button */}
              <a
                href="tel:+998991231373"
                className="w-9 h-9 rounded-xl bg-blue-50 text-[#1390FC] flex items-center justify-center active:scale-95 transition-transform border border-blue-100"
                aria-label="Call UZBService"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Hamburger Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 rounded-xl bg-[#FFC107] text-[#1390FC] flex items-center justify-center active:scale-95 transition-transform shadow-xs cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 sm:hidden backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-white z-50 shadow-2xl p-5 flex flex-col justify-between sm:hidden overflow-y-auto"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <div className="relative w-8 h-8 overflow-hidden shrink-0 flex items-center">
                      <img
                        src="/images/logo.png"
                        alt="Toshkent Service Icon"
                        className="absolute left-0 h-full w-auto max-w-none"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[15px] font-black leading-none tracking-wide text-[#0B1B3D] uppercase">Toshkent</span>
                      <span className="text-[11px] font-bold leading-tight tracking-[0.1em] text-[#0B1B3D] uppercase">Service</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 active:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 24/7 Status Badge */}
                <div className="mt-4 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-[#1390FC]">
                    {lang === 'ru' ? '24/7 Дежурный выезд мастеров' : '24/7 Ustalarning tezkor chiqishi'}
                  </span>
                </div>

                {/* Nav Links with Icons */}
                <div className="mt-4 flex flex-col space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-3 rounded-xl text-slate-800 hover:text-[#1390FC] hover:bg-slate-50 transition-colors font-medium text-[15px]"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#1390FC]">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{link.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                {/* Language Switcher in Drawer */}
                <CustomLangSelect lang={lang} onChange={onLanguageChange} variant="drawer" />

                {/* Direct Call Button */}
                <a
                  href="tel:+998991231373"
                  className="flex items-center justify-center space-x-2.5 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold shadow-sm active:scale-98"
                >
                  <Phone className="w-4 h-4 text-[#FFC107]" />
                  <span>+998 99 123 13 73</span>
                </a>

                {/* Order Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal();
                  }}
                  className="w-full btn-uzb-primary py-3.5 text-center uppercase tracking-wide text-sm font-bold shadow-md cursor-pointer"
                >
                  {content.nav.orderBtn}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
