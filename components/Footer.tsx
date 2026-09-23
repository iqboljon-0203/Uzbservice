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
  content?: any;
  contactsContent?: any;
  navContent?: any;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  content: propContent,
  contactsContent,
  navContent,
}) => {
  const content = propContent || siteContent[lang].footer;
  const nav = navContent || siteContent[lang].nav;
  const phoneNumber = contactsContent?.phoneVal || contactsContent?.phone1 || '+998 77 002 67 76';
  const phoneRaw = contactsContent?.phone1Raw || phoneNumber.replace(/[^\d+]/g, '') || '+998770026776';
  const address = contactsContent?.addressVal || (lang === 'ru' ? 'Ташкент, ул. Талимаржан, 15' : 'Toshkent, Talimarjon ko\'chasi, 15');

  return (
    <footer className="bg-[#132739] text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Desc */}
          <div className="space-y-4">
            <Link href="/" className="inline-block mb-2">
              <div className="flex items-center space-x-1.5 sm:space-x-2 opacity-95 hover:opacity-100 transition-opacity">
                <div className="relative w-12 h-12 overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src="/images/logo.svg"
                    alt="Toshkent Service Icon"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center text-white">
                  <span className="text-[17px] font-black leading-none tracking-wide uppercase">Toshkent</span>
                  <span className="text-[12px] font-bold leading-tight tracking-[0.1em] uppercase">Service</span>
                </div>
              </div>
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
              {lang === 'ru' ? 'Навигация' : 'Navigatsiya'}
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
                <Link href="/remont-holodilnikov-v-tashkente" className="hover:text-[#1390FC] transition-colors">
                  {lang === 'ru' ? 'Ремонт холодильников' : 'Xolodilniklarni ta\'mirlash'}
                </Link>
              </li>
              <li>
                <Link href="/remont-kondiczionerov-v-tashkente" className="hover:text-[#1390FC] transition-colors">
                  {lang === 'ru' ? 'Ремонт кондиционеров' : 'Konditsionerlarni ta\'mirlash'}
                </Link>
              </li>
              <li>
                <Link href="/remont-stiralnyh-mashin-v-tashkente" className="hover:text-[#1390FC] transition-colors">
                  {lang === 'ru' ? 'Ремонт стиральных машин' : 'Kir yuvish mashinalari ta\'miri'}
                </Link>
              </li>
              <li>
                <Link href="/remont-gazovyh-kotlov-v-tashkente" className="hover:text-[#1390FC] transition-colors">
                  {lang === 'ru' ? 'Ремонт газовых котлов' : 'Gaz qozonlarini ta\'mirlash'}
                </Link>
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
                href={`tel:${phoneRaw}`}
                className="flex items-center space-x-2 text-white hover:text-[#1390FC] font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#1390FC]" />
                <span>{phoneNumber}</span>
              </a>
              <div className="flex items-start space-x-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#FFC107] flex-shrink-0 mt-0.5" />
                <span className="text-xs">{address}</span>
              </div>
              <p className="text-xs text-emerald-400 font-semibold pt-1">
                {lang === 'ru' ? '● 24/7 Прием срочных заявок' : '● 24/7 Shoshilinch arizalar qabuli'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>{content.copyright}</p>
          <p className="text-slate-400">
            {lang === 'ru'
              ? 'TOSHKENTSERVICE.UZ — Профессиональный ремонт бытовой техники в Ташкенте'
              : 'TOSHKENTSERVICE.UZ — Toshkentda maishiy texnikalarni professional ta\'mirlash'}
          </p>
        </div>
      </div>
    </footer>
  );
};
