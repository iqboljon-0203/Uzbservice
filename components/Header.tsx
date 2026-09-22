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
  navContent?: any;
  contactsContent?: any;
}

const RuFlag = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-sm flex-shrink-0" viewBox="0 0 640 480">
    <g fillRule="evenodd" strokeWidth="1pt">
      <path fill="#fff" d="M0 0h640v160H0z" />
      <path fill="#0039a6" d="M0 160h640v160H0z" />
      <path fill="#d52b1e" d="M0 320h640v160H0z" />
    </g>
  </svg>
);

const UzFlag = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-sm flex-shrink-0" viewBox="0 0 640 480">
    <g fillRule="evenodd" strokeWidth="1pt">
      <path fill="#0099b5" d="M0 0h640v160H0z" />
      <path fill="#ce1126" d="M0 155h640v170H0z" />
      <path fill="#fff" d="M0 165h640v150H0z" />
      <path fill="#1eb53a" d="M0 320h640v160H0z" />
      <circle cx="90" cy="80" r="45" fill="#fff" />
      <circle cx="105" cy="80" r="42" fill="#0099b5" />
    </g>
  </svg>
);

const CustomLangSelect = ({ lang, onChange, variant }: { lang: Language, onChange: (l: Language) => void, variant: 'desktop' | 'mobile' | 'drawer' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = [
    { code: 'ru', label: 'RU', fullLabel: 'Русский', Flag: RuFlag },
    { code: 'uz', label: 'UZ', fullLabel: 'Oʻzbekcha', Flag: UzFlag }
  ];
  
  const current = options.find(o => o.code === lang) || options[0];
  const CurrentFlag = current.Flag;

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
          <CurrentFlag />
          <span>{current.label}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 ml-1.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1.5 w-max min-w-[130px] bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 py-1">
          {options.map((opt) => {
            const OptionFlag = opt.Flag;
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => {
                  onChange(opt.code as Language);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 text-left text-[13px] transition-colors ${lang === opt.code ? 'bg-blue-50/50 text-[#1390FC] font-bold' : 'text-slate-700 hover:bg-slate-50 font-medium'}`}
              >
                <OptionFlag />
                <span>{opt.fullLabel}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenModal,
  navContent,
  contactsContent,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const content = siteContent[lang];
  const nav = navContent || content.nav;
  const phoneNumber = contactsContent?.phoneVal || contactsContent?.phone1 || '+998 95 848 40 40';
  const phoneRaw = contactsContent?.phone1Raw || phoneNumber.replace(/[^\d+]/g, '') || '+998958484040';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#uslugi', label: nav.services, icon: Wrench },
    { href: '#o_nas', label: nav.about, icon: Shield },
    { href: '#why_us', label: nav.whyUs, icon: Users },
    { href: '#reviews', label: nav.reviews, icon: MessageSquare },
    { href: '#contacts', label: nav.contacts, icon: MapPin },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3 sm:py-3.5'
            : 'bg-white py-3.5 sm:py-5 border-b border-slate-100/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Tagline */}
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 group flex-shrink-0">
              <div className="relative w-11 h-11 sm:w-13 sm:h-13 overflow-hidden group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                <img src="/images/logo.svg" alt="Toshkent Service" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-base sm:text-xl font-black leading-none tracking-wide text-slate-900 group-hover:text-[#1390FC] transition-colors uppercase">
                  Toshkent
                </span>
                <span className="text-[11px] sm:text-[13px] font-black leading-tight tracking-[0.16em] text-[#1390FC] uppercase mt-0.5">
                  Service
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-2.5 xl:px-3 py-1.5 text-[13px] xl:text-[14px] font-medium text-slate-800 hover:text-[#1390FC] transition-colors rounded-lg hover:bg-slate-50 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Right Side: Phone + CTA + Lang */}
            <div className="hidden sm:flex items-center space-x-2.5 xl:space-x-3.5 flex-shrink-0">
              {/* Language Selector */}
              <CustomLangSelect lang={lang} onChange={onLanguageChange} variant="desktop" />

              {/* Phone Link */}
              <a
                href={`tel:${phoneRaw}`}
                className="flex items-center space-x-1.5 xl:space-x-2 text-[13px] xl:text-[14px] font-semibold text-slate-900 hover:text-[#1390FC] transition-colors group whitespace-nowrap"
              >
                <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1390FC] group-hover:bg-[#1390FC] group-hover:text-white transition-all shadow-sm flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                </div>
                <span className="whitespace-nowrap font-bold">{phoneNumber}</span>
              </a>

              {/* Order Button */}
              <button
                type="button"
                onClick={() => onOpenModal()}
                className="btn-uzb-primary px-3.5 xl:px-4 py-2 text-xs xl:text-sm uppercase tracking-wide cursor-pointer whitespace-nowrap flex-shrink-0"
              >
                {nav.orderBtn}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center space-x-2">
              <CustomLangSelect lang={lang} onChange={onLanguageChange} variant="mobile" />
              <a
                href={`tel:${phoneRaw}`}
                className="w-9 h-9 rounded-xl bg-blue-50 text-[#1390FC] flex items-center justify-center active:scale-95 transition-transform border border-blue-100"
                aria-label="Call Toshkent Service"
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
                  <div className="flex items-center space-x-1.5">
                    <div className="relative w-11 h-11 overflow-hidden shrink-0 flex items-center justify-center">
                      <img
                        src="/images/logo.svg"
                        alt="Toshkent Service Icon"
                        className="w-full h-full object-contain"
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
                  href="tel:+998958484040"
                  className="flex items-center justify-center space-x-2.5 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold shadow-sm active:scale-98"
                >
                  <Phone className="w-4 h-4 text-[#FFC107]" />
                  <span>+998 95 848 40 40</span>
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
