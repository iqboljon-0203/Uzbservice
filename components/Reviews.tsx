'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Language, siteContent, ReviewItem } from '@/data/content';

interface ReviewsProps {
  lang: Language;
}

export const Reviews: React.FC<ReviewsProps> = ({ lang }) => {
  const content = siteContent[lang].reviews;
  const [reviews, setReviews] = useState<ReviewItem[]>(content.items);
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    setReviews(siteContent[lang].reviews.items);
    fetch(`/api/content?type=reviews&lang=${lang}`)
      .then(res => res.json())
      .then(data => {
        if (data.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
  }, [lang]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 lg:py-28 bg-[#F5F7F8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
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

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="mt-2.5 sm:mt-4 text-sm sm:text-lg text-slate-600 font-normal"
          >
            {content.subtitle}
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Card View */}
          <div className="relative min-h-[280px] sm:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-lg sm:shadow-xl border border-slate-200/80 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Quote Icon watermark */}
                <div className="absolute top-4 right-5 sm:top-6 sm:right-8 opacity-15 pointer-events-none w-12 h-12 sm:w-16 sm:h-16">
                  <Image
                    src="/images/testimonial-quote.svg"
                    alt="Quote"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>

                {/* Stars Rating */}
                <div>
                  <div className="flex items-center space-x-1 text-[#FFC107] mb-4 sm:mb-5">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFC107]" />
                    ))}
                    <span className="ml-2 text-[11px] sm:text-xs font-bold text-slate-400">
                      {reviews[currentIndex].date}
                    </span>
                  </div>

                  {/* Review text */}
                  <p className="text-sm sm:text-lg text-slate-700 leading-relaxed italic mb-6 sm:mb-8 relative z-10 font-normal">
                    &ldquo;{reviews[currentIndex].text}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3.5 sm:space-x-4 pt-3.5 sm:pt-4 border-t border-slate-100">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#1390FC] shadow-2xs">
                    <Image
                      src={reviews[currentIndex].avatar}
                      alt={reviews[currentIndex].author}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {reviews[currentIndex].author}
                    </h3>
                    <p className="text-xs font-semibold text-[#1390FC]">
                      {reviews[currentIndex].service}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 sm:mt-8">
            {/* Dots */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-6 sm:w-8 bg-[#1390FC]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <button
                type="button"
                onClick={prevSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white hover:bg-[#1390FC] hover:text-white text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white hover:bg-[#1390FC] hover:text-white text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Quick Preview Cards on Large Screens */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-slate-200">
          {reviews.slice(0, 3).map((rev: ReviewItem, idx: number) => (
            <div
              key={rev.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-6 rounded-2xl cursor-pointer transition-all border ${
                currentIndex === idx
                  ? 'bg-white border-[#1390FC] shadow-md'
                  : 'bg-white/60 border-slate-200/80 hover:bg-white hover:shadow-xs'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.author}</h4>
                  <p className="text-[11px] text-[#1390FC] font-medium">{rev.service}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 italic">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
