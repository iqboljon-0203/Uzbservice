'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText, Save, Plus, Trash2, RefreshCw, AlertCircle, CheckCircle,
  ExternalLink, Layers, Wrench, ShieldCheck, CheckSquare, Search
} from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '@/components/admin/ImageUploader';

const REAL_SERVICES = [
  { slug: 'remont-gazovyh-kotlov-v-tashkente', label: 'Gaz qozonlari (Газовые котлы)' },
  { slug: 'remont-holodilnikov-v-tashkente', label: 'Xolodilniklar (Холодильники)' },
  { slug: 'remont-kondiczionerov-v-tashkente', label: 'Konditsionerlar (Кондиционеры)' },
  { slug: 'remont-stiralnyh-mashin-v-tashkente', label: 'Kir yuvish mashinalari (Стиральные машины)' },
];

export default function AdminServiceDetailsPage() {
  const [selectedSlug, setSelectedSlug] = useState('remont-gazovyh-kotlov-v-tashkente');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [detailData, setDetailData] = useState<any>({
    slug: 'remont-gazovyh-kotlov-v-tashkente',
    title_uz: '',
    title_ru: '',
    subtitle_uz: '',
    subtitle_ru: '',
    badge_uz: '',
    badge_ru: '',
    price_from_uz: '',
    price_from_ru: '',
    hero_image: '',
    brands: [],
    symptom_title_uz: '',
    symptom_title_ru: '',
    symptom_desc_uz: '',
    symptom_desc_ru: '',
    symptom_items: [],
    breakdowns: [],
    seo_text: {},
  });

  const [brandsInput, setBrandsInput] = useState('');

  const fetchDetail = async (slug: string) => {
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`/api/admin/service-details?slug=${slug}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        const data = json.data;
        if (data) {
          setDetailData({
            ...data,
            symptom_items: Array.isArray(data.symptom_items) ? data.symptom_items : [],
            breakdowns: Array.isArray(data.breakdowns) ? data.breakdowns : [],
          });
          setBrandsInput(Array.isArray(data.brands) ? data.brands.join(', ') : '');
        }
      }
    } catch (err) {
      console.error('Fetch detail error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail(selectedSlug);
  }, [selectedSlug]);

  // Breakdowns handlers
  const handleAddBreakdown = () => {
    const newBreakdown = {
      breakdown_id: `issue-${Date.now()}`,
      title_uz: '',
      title_ru: '',
      description_uz: '',
      description_ru: '',
      price_uz: "100 000 so'mdan",
      price_ru: 'от 100 000 сум',
      icon_type: 'power',
      image: detailData.hero_image || '',
    };
    setDetailData((prev: any) => ({
      ...prev,
      breakdowns: [...(prev.breakdowns || []), newBreakdown]
    }));
  };

  const handleRemoveBreakdown = (index: number) => {
    setDetailData((prev: any) => ({
      ...prev,
      breakdowns: prev.breakdowns.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleBreakdownChange = (index: number, field: string, val: string) => {
    setDetailData((prev: any) => {
      const updated = [...prev.breakdowns];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, breakdowns: updated };
    });
  };

  // Symptoms handlers
  const handleAddSymptom = () => {
    const newSymptom = { uz: '', ru: '' };
    setDetailData((prev: any) => ({
      ...prev,
      symptom_items: [...(prev.symptom_items || []), newSymptom]
    }));
  };

  const handleRemoveSymptom = (index: number) => {
    setDetailData((prev: any) => ({
      ...prev,
      symptom_items: prev.symptom_items.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSymptomChange = (index: number, lang: 'uz' | 'ru', val: string) => {
    setDetailData((prev: any) => {
      const updated = [...prev.symptom_items];
      updated[index] = { ...updated[index], [lang]: val };
      return { ...prev, symptom_items: updated };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('admin_token');

    const formattedBrands = brandsInput
      .split(',')
      .map(b => b.trim())
      .filter(Boolean);

    const payload = {
      ...detailData,
      slug: selectedSlug,
      brands: formattedBrands,
    };

    try {
      const res = await fetch('/api/admin/service-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setNotification({ type: 'success', message: 'Sahifa ma\'lumotlari to\'liq saqlandi!' });
      } else {
        const err = await res.json();
        setNotification({ type: 'error', message: err.error || 'Xatolik yuz berdi' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Server bilan aloqa uzildi' });
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Batafsil Ichki Sahifalar Boshqaruvi</h1>
          <p className="text-gray-400 text-sm mt-1">Har bir xizmatning ichki sahifasi, nosozliklar (breakdowns), alomatlar va brendlari</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${selectedSlug}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 text-sm font-medium border border-gray-700/60 transition-colors"
          >
            <span>Saytda ko'rish</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            onClick={() => fetchDetail(selectedSlug)}
            disabled={loading}
            className="p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 border border-gray-700/60"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 4 Real Service Slugs Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {REAL_SERVICES.map(item => (
          <button
            key={item.slug}
            onClick={() => setSelectedSlug(item.slug)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedSlug === item.slug
                ? 'bg-blue-600/15 border-blue-500 text-blue-400 shadow-md shadow-blue-500/10'
                : 'bg-[#161822] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200'
            }`}
          >
            <div className="text-[11px] font-mono text-gray-500 truncate">/{item.slug}</div>
            <div className="text-sm font-bold text-white mt-1">{item.label}</div>
          </button>
        ))}
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
          {/* SECTION 1: HERO & GENERAL */}
          <div className="bg-[#161822] border border-gray-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>1. Sahifa Bosh Qismi (Hero & Matnlar)</span>
            </h2>

            {/* Uzbek */}
            <div className="p-4 bg-[#0f1117] rounded-xl border border-gray-800/80 space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">O'zbekcha</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Sarlavha (H1 UZ):</label>
                  <input
                    type="text"
                    value={detailData.title_uz || ''}
                    onChange={e => setDetailData({ ...detailData, title_uz: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Badge (Kichik nishon UZ):</label>
                  <input
                    type="text"
                    value={detailData.badge_uz || ''}
                    onChange={e => setDetailData({ ...detailData, badge_uz: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Tavsif (Subtitle UZ):</label>
                <textarea
                  rows={2}
                  value={detailData.subtitle_uz || ''}
                  onChange={e => setDetailData({ ...detailData, subtitle_uz: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Boshlang'ich narx (Price From UZ):</label>
                <input
                  type="text"
                  value={detailData.price_from_uz || ''}
                  onChange={e => setDetailData({ ...detailData, price_from_uz: e.target.value })}
                  placeholder="80 000 so'mdan"
                  className="w-full px-3.5 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                />
              </div>
            </div>

            {/* Russian */}
            <div className="p-4 bg-[#0f1117] rounded-xl border border-gray-800/80 space-y-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">Ruscha</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Заголовок (H1 RU):</label>
                  <input
                    type="text"
                    value={detailData.title_ru || ''}
                    onChange={e => setDetailData({ ...detailData, title_ru: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Бейдж (Badge RU):</label>
                  <input
                    type="text"
                    value={detailData.badge_ru || ''}
                    onChange={e => setDetailData({ ...detailData, badge_ru: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Описание (Subtitle RU):</label>
                <textarea
                  rows={2}
                  value={detailData.subtitle_ru || ''}
                  onChange={e => setDetailData({ ...detailData, subtitle_ru: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Начальная цена (Price From RU):</label>
                <input
                  type="text"
                  value={detailData.price_from_ru || ''}
                  onChange={e => setDetailData({ ...detailData, price_from_ru: e.target.value })}
                  placeholder="от 80 000 сум"
                  className="w-full px-3.5 py-2 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                />
              </div>
            </div>

            {/* Media & Brands */}
            <div className="space-y-4 pt-2">
              <ImageUploader
                label="Sahifa Hero Rasmi"
                description="Kompyuteringizdan sahifa bosh qismi uchun rasm yuklang (PNG, JPG, WEBP)"
                value={detailData.hero_image || ''}
                onChange={(url) => setDetailData({ ...detailData, hero_image: url })}
              />

              <div>
                <label className="block text-xs text-gray-400 mb-1">Qo'llab-quvvatlanadigan brendlar (vergul bilan):</label>
                <input
                  type="text"
                  value={brandsInput}
                  onChange={e => setBrandsInput(e.target.value)}
                  placeholder="Navien, Baxi, Ariston, Ferroli, Viessmann, Bosch..."
                  className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-lg text-sm text-white"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: SYMPTOM CHECKLIST */}
          <div className="bg-[#161822] border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-emerald-400" />
                  <span>2. Nosozlik Alomatlari Bloki (Symptom Checklist)</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Mijoz sahifasida ko'rinadigan "Qachon usta chaqirish kerak" cheklisti</p>
              </div>
              <button
                type="button"
                onClick={handleAddSymptom}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Alomat qo'shish</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Blok Sarlavhasi (UZ):</label>
                <input
                  type="text"
                  value={detailData.symptom_title_uz || ''}
                  onChange={e => setDetailData({ ...detailData, symptom_title_uz: e.target.value })}
                  placeholder="Odatiy belgilar"
                  className="w-full px-3 py-1.5 bg-[#0f1117] border border-gray-700 rounded-lg text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Заголовок блока (RU):</label>
                <input
                  type="text"
                  value={detailData.symptom_title_ru || ''}
                  onChange={e => setDetailData({ ...detailData, symptom_title_ru: e.target.value })}
                  placeholder="Типичные симптомы"
                  className="w-full px-3 py-1.5 bg-[#0f1117] border border-gray-700 rounded-lg text-xs text-white"
                />
              </div>
            </div>

            {/* Symptom items list */}
            <div className="space-y-2 pt-2">
              {(detailData.symptom_items || []).map((si: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-[#0f1117] rounded-xl border border-gray-800">
                  <span className="text-xs text-gray-500 font-bold px-1">#{idx + 1}</span>
                  <input
                    type="text"
                    value={si.uz || ''}
                    onChange={e => handleSymptomChange(idx, 'uz', e.target.value)}
                    placeholder="Alomat matni (UZ)"
                    className="flex-1 px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white"
                  />
                  <input
                    type="text"
                    value={si.ru || ''}
                    onChange={e => handleSymptomChange(idx, 'ru', e.target.value)}
                    placeholder="Симптом (RU)"
                    className="flex-1 px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSymptom(idx)}
                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: BREAKDOWNS LIST */}
          <div className="bg-[#161822] border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-yellow-400" />
                  <span>3. Nosozliklar va Ta'mirlash Narxlari (Breakdowns)</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Mijoz sahifadagi karta ko'rinishidagi nosozlik turlari va ularning narxi</p>
              </div>
              <button
                type="button"
                onClick={handleAddBreakdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 text-xs font-semibold border border-yellow-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Nosozlik qo'shish</span>
              </button>
            </div>

            <div className="space-y-4 pt-2">
              {(detailData.breakdowns || []).map((b: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 bg-[#0f1117] border border-gray-800 rounded-xl space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">#{idx + 1} - Nosozlik ({b.breakdown_id})</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBreakdown(idx)}
                      className="text-gray-500 hover:text-red-400 p-1 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Nosozlik nomi (UZ):</label>
                      <input
                        type="text"
                        value={b.title_uz || ''}
                        onChange={e => handleBreakdownChange(idx, 'title_uz', e.target.value)}
                        placeholder="masalan: Gorelka yonmayapti"
                        className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Название (RU):</label>
                      <input
                        type="text"
                        value={b.title_ru || ''}
                        onChange={e => handleBreakdownChange(idx, 'title_ru', e.target.value)}
                        placeholder="например: Не зажигается горелка"
                        className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Tavsif / Ishlar ro'yxati (UZ):</label>
                      <textarea
                        rows={2}
                        value={b.description_uz || ''}
                        onChange={e => handleBreakdownChange(idx, 'description_uz', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Описание / Работы (RU):</label>
                      <textarea
                        rows={2}
                        value={b.description_ru || ''}
                        onChange={e => handleBreakdownChange(idx, 'description_ru', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Narx (UZ):</label>
                      <input
                        type="text"
                        value={b.price_uz || ''}
                        onChange={e => handleBreakdownChange(idx, 'price_uz', e.target.value)}
                        placeholder="100 000 so'mdan"
                        className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Цена (RU):</label>
                      <input
                        type="text"
                        value={b.price_ru || ''}
                        onChange={e => handleBreakdownChange(idx, 'price_ru', e.target.value)}
                        placeholder="от 100 000 сум"
                        className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Ikonka turi:</label>
                      <select
                        value={b.icon_type || 'power'}
                        onChange={e => handleBreakdownChange(idx, 'icon_type', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white"
                      >
                        <option value="power">Power</option>
                        <option value="temp">Temp / Heat</option>
                        <option value="water">Water / Leak</option>
                        <option value="ice">Ice</option>
                        <option value="spin">Spin</option>
                        <option value="noise">Noise</option>
                        <option value="motor">Motor</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-1">
                    <ImageUploader
                      compact={true}
                      label="Nosozlik rasmi"
                      value={b.image || ''}
                      onChange={url => handleBreakdownChange(idx, 'image', url)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Bottom Save Action */}
          <div className="sticky bottom-16 sm:bottom-4 bg-[#161822]/95 backdrop-blur-md border border-gray-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center justify-between shadow-2xl z-30">
            <span className="text-xs text-gray-400 truncate mr-2">
              Ushbu ichki sahifaning o'zgarishlarini saqlash
            </span>
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
