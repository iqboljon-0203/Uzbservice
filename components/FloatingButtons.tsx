'use client';

import React from 'react';
import { Phone, Send, Wrench } from 'lucide-react';
import { Language, siteContent } from '@/data/content';

interface FloatingButtonsProps {
  lang: Language;
  onOpenModal: () => void;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({ lang, onOpenModal }) => {
  const content = siteContent[lang].fab;
  const nav = siteContent[lang].nav;

  return (
    <>
      {/* Desktop Floating Action Buttons */}
      <aside
        aria-label="Quick contact links"
        className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-center space-y-3"
      >
        {/* Telegram button */}
        <a
          href="https://t.me/servisekotlov"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#2AABEE] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group relative"
          aria-label="Telegram"
        >
          <Send className="w-5 h-5 -ml-0.5" />
          <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
            {content.telegram}
          </span>
        </a>

        {/* Call button with radar ripple ping */}
        <a
          href="tel:+998991231373"
          className="relative w-14 h-14 rounded-full bg-[#1390FC] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
          aria-label="Call +998 99 123 13 73"
        >
          {/* Pulsing radar ripples */}
          <span className="absolute -inset-1 rounded-full bg-[#1390FC] opacity-40 animate-ping pointer-events-none" />
          <span className="absolute -inset-3 rounded-full bg-[#1390FC] opacity-20 animate-pulse pointer-events-none" />

          <Phone className="w-6 h-6 relative z-10 animate-bounce" />

          <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
            +998 99 123 13 73 ({content.call})
          </span>
        </a>
      </aside>

      {/* Mobile Sticky Quick Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        {/* Telegram quick icon */}
        <a
          href="https://t.me/servisekotlov"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-[#2AABEE] flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
          aria-label="Telegram"
        >
          <Send className="w-5 h-5 -ml-0.5" />
        </a>

        {/* Direct Call Button */}
        <a
          href="tel:+998991231373"
          className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#1390FC] text-white text-xs font-bold shadow-sm active:scale-98 transition-transform"
        >
          <Phone className="w-4 h-4" />
          <span>{nav.callNow}</span>
        </a>

        {/* Order Modal Button */}
        <button
          type="button"
          onClick={onOpenModal}
          className="flex-1 flex items-center justify-center space-x-1.5 py-3 rounded-xl bg-[#FFC107] text-slate-900 text-xs font-extrabold shadow-sm active:scale-98 transition-transform cursor-pointer"
        >
          <Wrench className="w-4 h-4" />
          <span>{nav.orderBtn}</span>
        </button>
      </div>
    </>
  );
};
