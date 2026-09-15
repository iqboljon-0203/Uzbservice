'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { WhyUs } from '@/components/WhyUs';
import { Stats } from '@/components/Stats';
import { Reviews } from '@/components/Reviews';
import { UrgencyBanner } from '@/components/UrgencyBanner';
import { Contacts } from '@/components/Contacts';
import { Footer } from '@/components/Footer';
import { LeadModal } from '@/components/LeadModal';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Language } from '@/data/content';

export default function Home() {
  const [lang, setLang] = useState<Language>('ru');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

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
        onLanguageChange={setLang}
        onOpenModal={handleOpenModal}
      />

      {/* Hero Section */}
      <Hero
        lang={lang}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Services Section */}
      <Services
        lang={lang}
        onSelectService={(serviceTitle) => handleOpenModal(serviceTitle)}
      />

      {/* About & Why Us Section */}
      <WhyUs
        lang={lang}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Facts & Stats Counter Section */}
      <Stats
        lang={lang}
      />

      {/* Reviews Slider Section */}
      <Reviews
        lang={lang}
      />

      {/* Urgency CTA & Inline Form Banner */}
      <UrgencyBanner
        lang={lang}
        onOpenModal={() => handleOpenModal()}
      />

      {/* Contacts & Map Section */}
      <Contacts
        lang={lang}
      />

      {/* Footer */}
      <Footer
        lang={lang}
      />

      {/* Lead Capture Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        lang={lang}
        initialService={selectedService}
      />

      {/* Sticky Floating Action Buttons & Mobile Bar */}
      <FloatingButtons
        lang={lang}
        onOpenModal={() => handleOpenModal()}
      />
    </main>
  );
}
