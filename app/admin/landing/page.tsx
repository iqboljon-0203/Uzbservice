'use client';

import React, { useState, useEffect } from 'react';
import {
  Layout, Sparkles, Info, Award, BarChart3, AlertCircle,
  PhoneCall, CheckCircle, Save, RefreshCw, Layers, ExternalLink, Globe
} from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminLandingPage() {
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'facts' | 'urgency' | 'contacts' | 'modal_footer'>('hero');
  const [activeLang, setActiveLang] = useState<'uz' | 'ru'>('uz');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Settings storage for both uz and ru
  const [dataUz, setDataUz] = useState<Record<string, any>>({});
  const [dataRu, setDataRu] = useState<Record<string, any>>({});

  const fetchSettings = async () => {
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/settings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        const rows = json.data || [];
        const uzObj: Record<string, any> = {};
        const ruObj: Record<string, any> = {};

        for (const row of rows) {
          if (row.lang === 'uz') uzObj[row.section] = row.data;
          if (row.lang === 'ru') ruObj[row.section] = row.data;
          if (row.lang === 'all') {
            uzObj[row.section] = row.data;
            ruObj[row.section] = row.data;
          }
        }

        setDataUz(uzObj);
        setDataRu(ruObj);
      }
    } catch (err) {
      console.error('Fetch settings error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const currentData = activeLang === 'uz' ? dataUz : dataRu;
  const setCurrentData = activeLang === 'uz' ? setDataUz : setDataRu;

  const updateSectionField = (section: string, field: string, value: any) => {
    setCurrentData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      }
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('admin_token');

    try {
      // Save current active tab section for current active language
      const sectionName = activeTab === 'modal_footer' ? 'modal' : (activeTab === 'urgency' ? 'urgencyBanner' : activeTab);
      const sectionData = currentData[sectionName] || {};

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          section: sectionName,
          lang: activeLang,
          data: sectionData,
        })
      });

      // If modal_footer, also save footer
      if (activeTab === 'modal_footer') {
        const footerData = currentData['footer'] || {};
        await fetch('/api/admin/settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            section: 'footer',
            lang: activeLang,
            data: footerData,
          })
        });
      }

      if (res.ok) {
        setNotification({ type: 'success', message: 'Ma\'lumotlar muvaffaqiyatli saqlandi!' });
      } else {
        const err = await res.json();
        setNotification({ type: 'error', message: err.error || 'Saqlashda xatolik yuz berdi' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Server bilan aloqa uzildi' });
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  // Helper getters
  const hero = currentData['hero'] || {};
  const about = currentData['about'] || {};
  const facts = currentData['facts'] || {};
  const urgency = currentData['urgencyBanner'] || {};
  const contacts = currentData['contacts'] || {};
  const modal = currentData['modal'] || {};
  const footer = currentData['footer'] || {};

  return (
    <div className="space-y-4 sm:space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Landing Sahifasi Boshqaruvi</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">Bosh sahifadagi barcha sarlavhalar, matnlar va afzalliklarni tahrirlash</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 text-xs font-medium border border-gray-700/60"
          >
            <span>Saytni ko'rish</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={fetchSettings}
            disabled={loading}
            className="p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 border border-gray-700/60"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Language Toggle Bar */}
      <div className="flex items-center justify-between bg-[#161822] p-3 rounded-2xl border border-gray-800">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-400 ml-2" />
          <span className="text-xs text-gray-400 font-medium">Tahrirlash tili:</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#0f1117] p-1 rounded-xl border border-gray-800">
          <button
            type="button"
            onClick={() => setActiveLang('uz')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLang === 'uz'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            O'zbekcha (UZ)
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('ru')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLang === 'ru'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Русский (RU)
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-800 scrollbar-none">
        {[
          { id: 'hero', label: '1. Hero Bo\'limi', icon: Sparkles },
          { id: 'about', label: '2. Biz haqimizda', icon: Info },
          { id: 'facts', label: '3. Faktlar & Statistika', icon: BarChart3 },
          { id: 'urgency', label: '4. Tezkorlik Banneri', icon: Award },
          { id: 'contacts', label: '5. Bog\'lanish & Ish vaqti', icon: PhoneCall },
          { id: 'modal_footer', label: '6. Modal & Footer', icon: Layout },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600/15 border border-blue-500/40 text-blue-400 shadow-sm'
                  : 'bg-[#161822] border border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm ${
          notification.type === 'success'
            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            : 'bg-red-500/10 border border-red-500/20 text-red-400'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span>{notification.message}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* TAB 1: HERO */}
          {activeTab === 'hero' && (
            <div className="bg-[#161822] border border-gray-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span>Bosh Sahifa Hero Bo'limi ({activeLang.toUpperCase()})</span>
              </h2>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Yuqori Kichik Nishon (Badge):</label>
                <input
                  type="text"
                  value={hero.badge || ''}
                  onChange={e => updateSectionField('hero', 'badge', e.target.value)}
                  placeholder={activeLang === 'ru' ? 'TOSHKENT SERVICE — Сервисный центр №1' : 'TOSHKENT SERVICE — №1 Servis markazi'}
                  className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Asosiy Sarlavha (H1):</label>
                <input
                  type="text"
                  value={hero.title || ''}
                  onChange={e => updateSectionField('hero', 'title', e.target.value)}
                  placeholder="masalan: Toshkentda gaz qozonlarini ta'mirlash"
                  className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Kichik Sarlavha (Subtitle / Tavsif):</label>
                <textarea
                  rows={3}
                  value={hero.subtitle || ''}
                  onChange={e => updateSectionField('hero', 'subtitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Tugma matni (CTA Button):</label>
                  <input
                    type="text"
                    value={hero.ctaBtn || ''}
                    onChange={e => updateSectionField('hero', 'ctaBtn', e.target.value)}
                    placeholder="Ustani chaqirish"
                    className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Shoshilinchlik matni (Urgency):</label>
                  <input
                    type="text"
                    value={hero.urgency || ''}
                    onChange={e => updateSectionField('hero', 'urgency', e.target.value)}
                    placeholder="Qo'ng'iroq qiling va usta 60 daqiqada bepul yetib boradi."
                    className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              {/* 4 Pills */}
              <div className="pt-4 border-t border-gray-800">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-3">
                  Hero ustunlik pilyulkalari (Pills):
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(hero.pills || [
                    { title: 'Diagnostika 80 000 so\'m', highlight: '80 000 so\'m' },
                    { title: 'Usta yetib borishi bepul', highlight: 'bepul' },
                    { title: '1 oydan 1 yilgacha kafolat', highlight: '1 yilgacha' },
                    { title: 'Ustalarning tajribasi 10 yildan ortiq', highlight: '10 yildan ortiq' },
                  ]).map((pill: any, idx: number) => (
                    <div key={idx} className="p-3 bg-[#0f1117] rounded-xl border border-gray-800 space-y-2">
                      <span className="text-[11px] font-semibold text-gray-500">#{idx + 1} - Afzallik</span>
                      <div>
                        <input
                          type="text"
                          value={pill.title || ''}
                          onChange={e => {
                            const newPills = [...(hero.pills || [])];
                            newPills[idx] = { ...newPills[idx], title: e.target.value };
                            updateSectionField('hero', 'pills', newPills);
                          }}
                          placeholder="Matn"
                          className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white mb-1.5"
                        />
                        <input
                          type="text"
                          value={pill.highlight || ''}
                          onChange={e => {
                            const newPills = [...(hero.pills || [])];
                            newPills[idx] = { ...newPills[idx], highlight: e.target.value };
                            updateSectionField('hero', 'pills', newPills);
                          }}
                          placeholder="Ajratib ko'rsatiladigan so'z (Highlight)"
                          className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-amber-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Image */}
              <div className="pt-4 border-t border-gray-800">
                <ImageUploader
                  label="Hero Asosiy Rasmi"
                  description="Bosh sahifa bosh qismidagi asosiy katta rasm (PNG, JPG, WEBP)"
                  value={hero.image || ''}
                  onChange={url => updateSectionField('hero', 'image', url)}
                />
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT */}
          {activeTab === 'about' && (
            <div className="bg-[#161822] border border-gray-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-400" />
                <span>"Biz haqimizda" Bo'limi ({activeLang.toUpperCase()})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Bo'lim Badge:</label>
                  <input
                    type="text"
                    value={about.badge || ''}
                    onChange={e => updateSectionField('about', 'badge', e.target.value)}
                    placeholder="Toshkent Service kompaniyasi haqida"
                    className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Bo'lim Sarlavhasi:</label>
                  <input
                    type="text"
                    value={about.title || ''}
                    onChange={e => updateSectionField('about', 'title', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Kompaniya haqida to'liq tavsif:</label>
                <textarea
                  rows={4}
                  value={about.description || ''}
                  onChange={e => updateSectionField('about', 'description', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                />
              </div>

              {/* Experience Box */}
              <div className="p-4 bg-[#0f1117] rounded-xl border border-gray-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Kafolat / Tajriba Bloki (Sariq / Moviy ajratilgan blok):
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Blok Sarlavhasi:</label>
                    <input
                      type="text"
                      value={about.experienceBox?.title || ''}
                      onChange={e => updateSectionField('about', 'experienceBox', { ...about.experienceBox, title: e.target.value })}
                      placeholder="Sifatga kafolat beramiz"
                      className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Blok Tavsifi:</label>
                    <input
                      type="text"
                      value={about.experienceBox?.desc || ''}
                      onChange={e => updateSectionField('about', 'experienceBox', { ...about.experienceBox, desc: e.target.value })}
                      placeholder="Ishga va ehtiyot qismlarga 3 oydan 24 oygacha kafolat beramiz."
                      className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* About Images */}
              <div className="pt-4 border-t border-gray-800 space-y-4">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  "Biz haqimizda" Rasmlari:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ImageUploader
                    label="1-Rasm (Asosiy / Katta)"
                    description="Kompaniya ustasi fotosurati"
                    value={about.image1 || ''}
                    onChange={url => updateSectionField('about', 'image1', url)}
                  />
                  <ImageUploader
                    label="2-Rasm (Kichik / Natija)"
                    description="Asbob-uskunalar yoki natija fotosurati"
                    value={about.image2 || ''}
                    onChange={url => updateSectionField('about', 'image2', url)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FACTS / STATS */}
          {activeTab === 'facts' && (
            <div className="bg-[#161822] border border-gray-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <span>Statistika va Faktlar Bo'limi ({activeLang.toUpperCase()})</span>
              </h2>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Sarlavha:</label>
                <input
                  type="text"
                  value={facts.title || ''}
                  onChange={e => updateSectionField('facts', 'title', e.target.value)}
                  placeholder="Professional qozon ta'mirlash"
                  className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Tavsif:</label>
                <textarea
                  rows={2}
                  value={facts.description || ''}
                  onChange={e => updateSectionField('facts', 'description', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                />
              </div>

              {/* 3 points */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-gray-400 mb-2">3 ta asosiy qulaylik (Ro'yxat punktlari):</label>
                <div className="space-y-2">
                  {(facts.points || ['Kechayu-kunduz ishlaymiz. 24/7', 'Faqat tajribali ustalar.', 'To\'lov ta\'mirdan so\'ng.']).map((point: string, idx: number) => (
                    <input
                      key={idx}
                      type="text"
                      value={point}
                      onChange={e => {
                        const newPoints = [...(facts.points || [])];
                        newPoints[idx] = e.target.value;
                        updateSectionField('facts', 'points', newPoints);
                      }}
                      className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-xs text-white"
                    />
                  ))}
                </div>
              </div>

              {/* Facts Image */}
              <div className="pt-4 border-t border-gray-800">
                <ImageUploader
                  label="Faktlar va Statistika Bo'limi Rasmi"
                  description="Faktlar bo'limining o'ng tomonidagi rasm (PNG, JPG, WEBP)"
                  value={facts.image || ''}
                  onChange={url => updateSectionField('facts', 'image', url)}
                />
              </div>
            </div>
          )}

          {/* TAB 4: URGENCY BANNER */}
          {activeTab === 'urgency' && (
            <div className="bg-[#161822] border border-gray-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Tezkorlik Banneri ({activeLang.toUpperCase()})</span>
              </h2>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Banner Sarlavhasi:</label>
                <input
                  type="text"
                  value={urgency.title || ''}
                  onChange={e => updateSectionField('urgencyBanner', 'title', e.target.value)}
                  placeholder="Ta'mirlashni kechiktirmang, hoziroq murojaat qiling!"
                  className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Banner Tavsifi:</label>
                <input
                  type="text"
                  value={urgency.desc || ''}
                  onChange={e => updateSectionField('urgencyBanner', 'desc', e.target.value)}
                  placeholder="Ustaning tashrifi buyurtma kunining o'zida."
                  className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Asosiy tugma matni:</label>
                  <input
                    type="text"
                    value={urgency.btn || ''}
                    onChange={e => updateSectionField('urgencyBanner', 'btn', e.target.value)}
                    placeholder="Ustani chaqirish"
                    className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Qo'ng'iroq yozuvi:</label>
                  <input
                    type="text"
                    value={urgency.callLabel || ''}
                    onChange={e => updateSectionField('urgencyBanner', 'callLabel', e.target.value)}
                    placeholder="Istalgan vaqtda qo'ng'iroq qiling"
                    className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-800">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Forma sarlavhasi:</label>
                  <input
                    type="text"
                    value={urgency.formTitle || ''}
                    onChange={e => updateSectionField('urgencyBanner', 'formTitle', e.target.value)}
                    placeholder="Tezkor onlayn buyurtma"
                    className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Forma tugmasi:</label>
                  <input
                    type="text"
                    value={urgency.submitBtn || ''}
                    onChange={e => updateSectionField('urgencyBanner', 'submitBtn', e.target.value)}
                    placeholder="Buyurtmani yuborish"
                    className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              {/* Urgency BG Image */}
              <div className="pt-4 border-t border-gray-800">
                <ImageUploader
                  label="Shoshilinch Chaqiruv Bannerining Fon Rasmi"
                  description="Orqa fon tasviri (JPG, PNG, WEBP)"
                  value={urgency.bg_image || ''}
                  onChange={url => updateSectionField('urgencyBanner', 'bg_image', url)}
                />
              </div>
            </div>
          )}

          {/* TAB 5: CONTACTS */}
          {activeTab === 'contacts' && (
            <div className="bg-[#161822] border border-gray-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-emerald-400" />
                <span>Bog'lanish va Ish Vaqtlari ({activeLang.toUpperCase()})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Manzil matni:</label>
                  <input
                    type="text"
                    value={contacts.addressVal || ''}
                    onChange={e => updateSectionField('contacts', 'addressVal', e.target.value)}
                    placeholder="Toshkent shahri, Yashnobod tumani..."
                    className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Telefon raqam:</label>
                  <input
                    type="text"
                    value={contacts.phoneVal || ''}
                    onChange={e => updateSectionField('contacts', 'phoneVal', e.target.value)}
                    placeholder="+998 95 848 40 40"
                    className="w-full px-3.5 py-2.5 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-blue-400 uppercase tracking-wider">Ish jadvali matnlari:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Hafta ichi:</label>
                    <input
                      type="text"
                      value={contacts.scheduleWeekdays || ''}
                      onChange={e => updateSectionField('contacts', 'scheduleWeekdays', e.target.value)}
                      placeholder="Dush - Juma: 10:00 - 19:00"
                      className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Dam olish kunlari:</label>
                    <input
                      type="text"
                      value={contacts.scheduleWeekend || ''}
                      onChange={e => updateSectionField('contacts', 'scheduleWeekend', e.target.value)}
                      placeholder="Shan - Yak: 11:00 - 18:00"
                      className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Shoshilinch xizmat:</label>
                    <input
                      type="text"
                      value={contacts.scheduleEmergency || ''}
                      onChange={e => updateSectionField('contacts', 'scheduleEmergency', e.target.value)}
                      placeholder="24/7 kechayu-kunduz"
                      className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-lg text-xs text-emerald-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MODAL & FOOTER */}
          {activeTab === 'modal_footer' && (
            <div className="bg-[#161822] border border-gray-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layout className="w-5 h-5 text-purple-400" />
                <span>Ariza Qoldirish Modali va Footer ({activeLang.toUpperCase()})</span>
              </h2>

              <div className="p-4 bg-[#0f1117] rounded-xl border border-gray-800 space-y-4">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">Lead Modal (Ariza formasi)</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Modal Sarlavhasi:</label>
                    <input
                      type="text"
                      value={modal.title || ''}
                      onChange={e => updateSectionField('modal', 'title', e.target.value)}
                      placeholder="Buyurtma qoldiring"
                      className="w-full px-3 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Modal Kichik sarlavhasi:</label>
                    <input
                      type="text"
                      value={modal.subtitle || ''}
                      onChange={e => updateSectionField('modal', 'subtitle', e.target.value)}
                      placeholder="Formani to'ldiring va usta 60 daqiqada yetib boradi"
                      className="w-full px-3 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Yuborish tugmasi matni:</label>
                    <input
                      type="text"
                      value={modal.submit || ''}
                      onChange={e => updateSectionField('modal', 'submit', e.target.value)}
                      placeholder="Yuborish"
                      className="w-full px-3 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Muvaffaqiyat xabari (Success):</label>
                    <input
                      type="text"
                      value={modal.success || ''}
                      onChange={e => updateSectionField('modal', 'success', e.target.value)}
                      placeholder="Rahmat! Buyurtmangiz muvaffaqiyatli qabul qilindi."
                      className="w-full px-3 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-[#0f1117] rounded-xl border border-gray-800 space-y-4">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">Footer (Sayt pastki qismi)</span>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Kompaniya Tavsifi:</label>
                  <input
                    type="text"
                    value={footer.serviceCenter || ''}
                    onChange={e => updateSectionField('footer', 'serviceCenter', e.target.value)}
                    placeholder="Toshkentda maishiy texnika ta'mirlash bo'yicha ixtisoslashgan markaz."
                    className="w-full px-3 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Mualliflik huquqi (Copyright):</label>
                  <input
                    type="text"
                    value={footer.copyright || ''}
                    onChange={e => updateSectionField('footer', 'copyright', e.target.value)}
                    placeholder="Copyright © 2025 Barcha huquqlar himoyalangan."
                    className="w-full px-3 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sticky Bottom Save Action Bar */}
          <div className="sticky bottom-16 sm:bottom-4 bg-[#161822]/95 backdrop-blur-md border border-gray-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center justify-between shadow-2xl z-30">
            <div className="text-xs text-gray-400 truncate mr-2">
              Til: <span className="text-white font-bold uppercase">{activeLang}</span>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 flex-shrink-0"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Saqlash</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
