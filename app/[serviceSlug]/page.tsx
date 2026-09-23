'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Wrench, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { servicesData } from '@/data/servicesData';
import { Language, siteContent } from '@/data/content';
import { Header } from '@/components/Header';
import { Preloader } from '@/components/Preloader';
import { FloatingShapes } from '@/components/FloatingShapes';
import { BreakdownGrid } from '@/components/BreakdownGrid';
import { SymptomChecklist } from '@/components/SymptomChecklist';
import { BrandLogos } from '@/components/BrandLogos';
import { WhyUs } from '@/components/WhyUs';
import { Stats } from '@/components/Stats';
import { Reviews } from '@/components/Reviews';
import { UrgencyBanner } from '@/components/UrgencyBanner';
import { Contacts } from '@/components/Contacts';
import { Footer } from '@/components/Footer';
import { LeadModal } from '@/components/LeadModal';
import { FloatingButtons } from '@/components/FloatingButtons';
import { SeoBlock } from '@/components/SeoBlock';
import { DistrictsCoverage } from '@/components/DistrictsCoverage';
import { FaqSection } from '@/components/FaqSection';

const pillIcons = [Wrench, CheckCircle2, ShieldCheck, Award];

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.serviceSlug as string;
  const initialService = servicesData[slug];

  const [service, setService] = useState<any>(initialService);
  const [lang, setLang] = useState<Language>('ru');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string | undefined>(undefined);
  const [dynamicContent, setDynamicContent] = useState<any>(siteContent[lang]);

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  React.useEffect(() => {
    setDynamicContent(siteContent[lang]);
    fetch(`/api/content?lang=${lang}`)
      .then(res => res.json())
      .then(data => {
        if (data.content) setDynamicContent(data.content);
      })
      .catch(() => {});
  }, [lang]);

  React.useEffect(() => {
    if (slug) {
      if (servicesData[slug]) setService(servicesData[slug]);
      fetch(`/api/content?type=detail&slug=${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.detail) {
            setService(data.detail);
          }
        })
        .catch(() => {});
    }
  }, [slug]);

  if (!service && !initialService) {
    notFound();
  }

  const handleOpenModal = (serviceName?: string) => {
    setModalService(serviceName || service.title[lang]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalService(undefined);
  };

  const content = dynamicContent || siteContent[lang];

  return (
    <main className="min-h-screen flex flex-col bg-white pb-16 sm:pb-0">
      {/* Route Preloader with Spinning Power Icon */}
      <Preloader />

      {/* Header */}
      <Header
        lang={lang}
        navContent={dynamicContent?.nav}
        contactsContent={dynamicContent?.contacts}
        onLanguageChange={setLang}
        onOpenModal={handleOpenModal}
      />

      {/* Inner Hero Section */}
      <section className="relative pt-24 sm:pt-36 pb-12 sm:pb-20 lg:pb-24 overflow-hidden bg-[#F5F7F8]">
        <FloatingShapes />

        {/* Ambient Gradient Blobs */}
        <div className="absolute top-10 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -top-10 right-5 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* Badge */}
              <div className="inline-flex items-center self-start mb-3 sm:mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide bg-blue-50 text-[#1390FC] border border-blue-200/60 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#1390FC] animate-pulse mr-2" />
                  {service.badge[lang]}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] leading-[1.15] tracking-tight mb-3 sm:mb-5">
                {service.title[lang]}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mb-6 sm:mb-8">
                {service.subtitle[lang]}
              </p>

              {/* 4 Feature Badges */}
              <div className="mb-6 sm:mb-8">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                  {(content.hero.pills || []).map((pill: any, idx: number) => {
                    const Icon = pillIcons[idx % pillIcons.length];
                    return (
                      <li
                        key={idx}
                        className="flex items-center space-x-3 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200/80 shadow-xs"
                      >
                        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-[#1390FC] flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-800">
                          {pill.title}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Caption */}
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-medium mb-5">
                <Clock className="w-4 h-4 text-[#FFC107] flex-shrink-0 animate-pulse" />
                <span>{content.hero.urgency}</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenModal()}
                  className="btn-uzb-blue w-full sm:w-auto text-center justify-center group cursor-pointer text-base font-semibold tracking-wide py-3.5 sm:py-4 flex items-center space-x-2"
                >
                  <span>{content.hero.ctaBtn}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <a
                  href="tel:+998770026776"
                  className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 sm:py-4 rounded-xl border-2 border-slate-300 hover:border-[#1390FC] text-[#1A1A1A] hover:text-[#1390FC] font-semibold text-base transition-all bg-white shadow-xs"
                >
                  <span>+998 77 002 67 76</span>
                </a>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="lg:col-span-5 relative flex items-center justify-center mt-4 lg:mt-0">
              <div className="relative w-full max-w-[340px] sm:max-w-[480px] aspect-square flex items-center justify-center">
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#1390FC]/20 via-[#FFC107]/20 to-transparent blur-2xl -z-10" />

                {/* Floating Badge */}
                <div className="absolute top-2 left-2 sm:-top-3 sm:-left-3 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/80 flex items-center space-x-2 z-20">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[11px] sm:text-xs">
                    24/7
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-none">
                      {lang === 'ru' ? 'Выезд мастера' : 'Usta chiqishi'}
                    </p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">
                      {service.priceFrom[lang]}
                    </p>
                  </div>
                </div>

                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={service.heroImage}
                    alt={service.title[lang]}
                    width={520}
                    height={520}
                    className="w-full h-full object-contain drop-shadow-2xl animate-float max-h-[400px] lg:max-h-[500px]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Common Breakdowns Grid */}
      <BreakdownGrid
        breakdowns={service.breakdowns}
        lang={lang}
        onSelectBreakdown={(faultTitle) => handleOpenModal(`${service.title[lang]} - ${faultTitle}`)}
      />

      {/* Diagnostic Symptoms Checklist */}
      <SymptomChecklist
        data={service.symptomChecklist}
        lang={lang}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Brand Logos Grid */}
      <BrandLogos
        brands={service.brands}
        lang={lang}
      />

      {/* SEO Text Block */}
      {service.seoText && (
        <SeoBlock lang={lang} seoText={service.seoText} />
      )}

      {/* Districts Coverage / Geo Local SEO */}
      <DistrictsCoverage
        lang={lang}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Why Us Section */}
      <WhyUs
        lang={lang}
        aboutContent={dynamicContent?.about}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Animated Stats / Counters */}
      <Stats
        lang={lang}
        content={dynamicContent?.facts}
      />

      {/* Reviews Carousel */}
      <Reviews
        lang={lang}
      />

      {/* Frequently Asked Questions */}
      <FaqSection
        lang={lang}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Urgency CTA Banner */}
      <UrgencyBanner
        lang={lang}
        content={dynamicContent?.urgencyBanner}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Contacts & Map */}
      <Contacts
        lang={lang}
        content={dynamicContent?.contacts}
      />

      {/* Footer */}
      <Footer
        lang={lang}
        content={dynamicContent?.footer}
        contactsContent={dynamicContent?.contacts}
        navContent={dynamicContent?.nav}
      />

      {/* Lead Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        lang={lang}
        content={dynamicContent?.modal}
        initialService={modalService}
      />

      {/* Sticky Action Buttons */}
      <FloatingButtons
        lang={lang}
        contactsContent={dynamicContent?.contacts}
        fabContent={dynamicContent?.fab}
        navContent={dynamicContent?.nav}
        onOpenModal={() => handleOpenModal()}
      />
    </main>
  );
}
