'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Send, Phone, MapPin } from 'lucide-react';
import { Language, siteContent } from '@/data/content';

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const content = siteContent[lang].footer;
  const nav = siteContent[lang].nav;

  return (
    <footer className="bg-[#132739] text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Desc */}
          <div className="space-y-4">
            <Link href="/" className="inline-block mb-2">
              <Image
                src="/images/logo.png"
                alt="UZBService Logo"
                width={150}
                height={48}
                className="h-10 w-auto object-contain brightness-0 invert opacity-95 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {content.serviceCenter}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={content.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#1390FC] text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={content.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-white flex items-center justify-center transition-all shadow-xs"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 uppercase tracking-wider text-xs text-[#FFC107]">
              Навигация
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#uslugi" className="hover:text-[#1390FC] transition-colors">
                  {nav.services}
                </a>
              </li>
              <li>
                <a href="#o_nas" className="hover:text-[#1390FC] transition-colors">
                  {nav.about}
                </a>
              </li>
              <li>
                <a href="#why_us" className="hover:text-[#1390FC] transition-colors">
                  {nav.whyUs}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#1390FC] transition-colors">
                  {nav.reviews}
                </a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-[#1390FC] transition-colors">
                  {nav.contacts}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Links */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 uppercase tracking-wider text-xs text-[#FFC107]">
              {nav.services}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#uslugi" className="hover:text-[#1390FC] transition-colors">
                  {lang === 'ru' ? 'Ремонт газовых котлов' : 'Gaz qozonlarini ta\'mirlash'}
                </a>
              </li>
              <li>
                <a href="#uslugi" className="hover:text-[#1390FC] transition-colors">
                  {lang === 'ru' ? 'Ремонт холодильников' : 'Muzlatgichlarni ta\'mirlash'}
                </a>
              </li>
              <li>
                <a href="#uslugi" className="hover:text-[#1390FC] transition-colors">
                  {lang === 'ru' ? 'Ремонт кондиционеров' : 'Konditsionerlarni ta\'mirlash'}
                </a>
              </li>
              <li>
                <a href="#uslugi" className="hover:text-[#1390FC] transition-colors">
                  {lang === 'ru' ? 'Ремонт стиральных машин' : 'Kir yuvish mashinalarini ta\'mirlash'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Contact */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 uppercase tracking-wider text-xs text-[#FFC107]">
              {nav.contacts}
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <a
                href="tel:+998991231373"
                className="flex items-center space-x-2 text-white hover:text-[#1390FC] font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#1390FC]" />
                <span>+998 99 123 13 73</span>
              </a>
              <div className="flex items-start space-x-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#FFC107] flex-shrink-0 mt-0.5" />
                <span className="text-xs">
                  {lang === 'ru'
                    ? 'Ташкент, ул. Талимаржан, 15'
                    : 'Toshkent, Talimarjon ko\'chasi, 15'}
                </span>
              </div>
              <p className="text-xs text-emerald-400 font-semibold pt-1">
                ● 24/7 Прием срочных заявок
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>{content.copyright}</p>
          <p className="text-slate-400">
            UZBSERVICE.UZ — Профессиональный сервис бытовой техники
          </p>
        </div>
      </div>
    </footer>
  );
};
