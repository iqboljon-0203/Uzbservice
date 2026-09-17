'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Language } from '@/data/content';

interface SeoBlockProps {
  lang: Language;
  seoText: {
    title: Record<Language, string>;
    paragraphs1: Record<Language, string[]>;
    listTitle: Record<Language, string>;
    listItems: Record<Language, string[]>;
    paragraphs2: Record<Language, string[]>;
    listTitle2?: Record<Language, string>;
    listItems2?: Record<Language, string[]>;
    paragraphs3?: Record<Language, string[]>;
    listTitle3?: Record<Language, string>;
    listItems3?: Record<Language, string[]>;
    paragraphs4?: Record<Language, string[]>;
  };
}

export const SeoBlock: React.FC<SeoBlockProps> = ({ lang, seoText }) => {
  if (!seoText) return null;

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="prose prose-slate prose-blue max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-headings:text-slate-900 prose-li:text-slate-600"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 tracking-tight text-slate-900">
            {seoText.title[lang]}
          </h2>
          
          <div className="space-y-4 mb-8 text-slate-600 leading-relaxed">
            {seoText.paragraphs1[lang].map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="bg-[#F5F7F8] rounded-2xl p-6 sm:p-8 mb-8 border border-slate-200/60 shadow-sm">
            <h3 className="text-xl font-bold mb-5 text-[#1A1A1A]">
              {seoText.listTitle[lang]}
            </h3>
            <ul className="space-y-3 m-0 p-0 list-none text-slate-700">
              {seoText.listItems[lang].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#1390FC] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-slate-600 leading-relaxed mb-8">
            {seoText.paragraphs2[lang].map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {seoText.listTitle2 && seoText.listItems2 && (
            <div className="bg-[#F5F7F8] rounded-2xl p-6 sm:p-8 mb-8 border border-slate-200/60 shadow-sm">
              <h3 className="text-xl font-bold mb-5 text-[#1A1A1A]">
                {seoText.listTitle2[lang]}
              </h3>
              <ul className="space-y-3 m-0 p-0 list-none text-slate-700">
                {seoText.listItems2[lang].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#1390FC] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {seoText.paragraphs3 && (
            <div className="space-y-4 text-slate-600 leading-relaxed mb-8">
              {seoText.paragraphs3[lang].map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          )}

          {seoText.listTitle3 && seoText.listItems3 && (
            <div className="bg-[#F5F7F8] rounded-2xl p-6 sm:p-8 mb-8 border border-slate-200/60 shadow-sm">
              <h3 className="text-xl font-bold mb-5 text-[#1A1A1A]">
                {seoText.listTitle3[lang]}
              </h3>
              <ul className="space-y-3 m-0 p-0 list-none text-slate-700">
                {seoText.listItems3[lang].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#1390FC] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {seoText.paragraphs4 && (
            <div className="space-y-4 text-slate-600 leading-relaxed">
              {seoText.paragraphs4[lang].map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
