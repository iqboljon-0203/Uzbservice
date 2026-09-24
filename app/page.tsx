'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { DistrictsCoverage } from '@/components/DistrictsCoverage';
import { WhyUs } from '@/components/WhyUs';
import { Stats } from '@/components/Stats';
import { Reviews } from '@/components/Reviews';
import { FaqSection } from '@/components/FaqSection';
import { UrgencyBanner } from '@/components/UrgencyBanner';
import { Contacts } from '@/components/Contacts';
import { Footer } from '@/components/Footer';
import dynamic from 'next/dynamic';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Language, siteContent } from '@/data/content';

const LeadModal = dynamic(() => import('@/components/LeadModal').then(mod => mod.LeadModal), {
  ssr: false,
});

export default function Home() {
  const [lang, setLang] = useState<Language>('ru');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [dynamicContent, setDynamicContent] = useState<any>(siteContent[lang]);

  // URL parametri (?lang=uz yoki ?lang=ru) orqali tilni aniqlash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'uz' || urlLang === 'ru') {
        setLang(urlLang);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  useEffect(() => {
    setDynamicContent(siteContent[lang]);
    fetch(`/api/content?lang=${lang}`)
      .then(res => res.json())
      .then(data => {
        if (data.content) {
          setDynamicContent(data.content);
        }
      })
      .catch(() => {});
  }, [lang]);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url.toString());
      document.documentElement.lang = newLang;
    }
  };

  const handleOpenModal = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(undefined);
  };

  return (
    <main className="min-h-screen flex flex-col bg-white pb-16 sm:pb-0">
      {/* Header */}
      <Header
        lang={lang}
        navContent={dynamicContent?.nav}
        contactsContent={dynamicContent?.contacts}
        onLanguageChange={handleLanguageChange}
        onOpenModal={handleOpenModal}
      />

      {/* Hero Section */}
      <Hero
        lang={lang}
        content={dynamicContent?.hero}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Services Section */}
      <Services
        lang={lang}
        onSelectService={(serviceTitle) => handleOpenModal(serviceTitle)}
      />

      {/* Districts Coverage / Geo-targeting Local SEO */}
      <DistrictsCoverage
        lang={lang}
        onOpenModal={() => handleOpenModal()}
      />

      {/* About & Why Us Section */}
      <WhyUs
        lang={lang}
        aboutContent={dynamicContent?.about}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Facts & Stats Counter Section */}
      <Stats
        lang={lang}
        content={dynamicContent?.facts}
      />

      {/* Reviews Slider Section */}
      <Reviews
        lang={lang}
      />

      {/* Frequently Asked Questions (FAQ) Section */}
      <FaqSection
        lang={lang}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Urgency CTA & Inline Form Banner */}
      <UrgencyBanner
        lang={lang}
        content={dynamicContent?.urgencyBanner}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Contacts & Map Section */}
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

      {/* Lead Capture Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        lang={lang}
        content={dynamicContent?.modal}
        initialService={selectedService}
      />

      {/* Sticky Floating Action Buttons & Mobile Bar */}
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
