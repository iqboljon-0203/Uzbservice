'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings, Phone, Send, MapPin, Clock, Save, RefreshCw,
  CheckCircle, AlertCircle, Shield, Globe
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [settings, setSettings] = useState({
    phone1: '+998 77 002 67 76',
    phone1Raw: '770026776',
    phone2: '+998 77 002 67 76',
    phone2Raw: '770026776',
    telegramUrl: 'https://t.me/BURON_01',
    addressUz: 'Toshkent shahri, barcha tumanlarga tezkor chiqish',
    addressRu: 'г. Ташкент, оперативный выезд во все районы',
    workingHoursUz: 'Har kuni 24/7 dam olish kunlarisiz',
    workingHoursRu: 'Ежедневно 24/7 без выходных',
    guaranteeUz: '1 yilgacha rasmiy kafolat',
    guaranteeRu: 'Официальная гарантия до 1 года',
  });

  const fetchSettings = async () => {
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/settings?section=contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          const row = json.data[0];
          if (row.data) {
            setSettings(prev => ({ ...prev, ...row.data }));
          }
        }
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          section: 'contacts',
          lang: 'all',
          data: settings
        })
      });

      if (res.ok) {
        setNotification({ type: 'success', message: 'Sayt sozlamalari muvaffaqiyatli saqlandi!' });
      } else {
        const err = await res.json();
        setNotification({ type: 'error', message: err.error || 'Saqlashda xatolik yuz berdi' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Server bilan ulanishda xatolik' });
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sayt Sozlamalari & Kontaktlar</h1>
          <p className="text-gray-400 text-sm mt-1">Telefon raqamlar, Telegram, manzil va umumiy parametrlarni boshqarish</p>
        </div>
        <button
          onClick={fetchSettings}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 text-sm font-medium border border-gray-700/60"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Yangilash</span>
        </button>
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
          {/* Section 1: Phone & Telegram */}
          <div className="bg-[#161822] border border-gray-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>Aloqa vositalari</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Asosiy telefon (Ko'rinadigan format):
                </label>
                <input
                  type="text"
                  required
                  value={settings.phone1}
                  onChange={e => setSettings({ ...settings, phone1: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Asosiy telefon (Havola uchun raqam):
                </label>
                <input
                  type="text"
                  required
                  value={settings.phone1Raw}
                  onChange={e => setSettings({ ...settings, phone1Raw: e.target.value })}
                  placeholder="770026776"
                  className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">tel: havolasida ishlatiladi</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Telegram manzil:</span>
              </label>
              <input
                type="text"
                required
                value={settings.telegramUrl}
                onChange={e => setSettings({ ...settings, telegramUrl: e.target.value })}
                placeholder="https://t.me/BURON_01"
                className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">Telegram tugmasi bosilganda ochiladigan havola</span>
            </div>
          </div>

          {/* Section 2: Address & Work Hours */}
          <div className="bg-[#161822] border border-gray-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>Manzil va Ish vaqti</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Manzil (O'zbekcha):</label>
                <input
                  type="text"
                  value={settings.addressUz}
                  onChange={e => setSettings({ ...settings, addressUz: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Адрес (Русский):</label>
                <input
                  type="text"
                  value={settings.addressRu}
                  onChange={e => setSettings({ ...settings, addressRu: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Ish vaqti (O'zbekcha):</label>
                <input
                  type="text"
                  value={settings.workingHoursUz}
                  onChange={e => setSettings({ ...settings, workingHoursUz: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Режим работы (Русский):</label>
                <input
                  type="text"
                  value={settings.workingHoursRu}
                  onChange={e => setSettings({ ...settings, workingHoursRu: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Kafolat kafolati (O'zbekcha):</label>
                <input
                  type="text"
                  value={settings.guaranteeUz}
                  onChange={e => setSettings({ ...settings, guaranteeUz: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Гарантия (Русский):</label>
                <input
                  type="text"
                  value={settings.guaranteeRu}
                  onChange={e => setSettings({ ...settings, guaranteeRu: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="sticky bottom-16 sm:static bg-[#161822]/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-3 sm:p-0 rounded-xl border border-gray-800 sm:border-0 flex justify-end shadow-2xl sm:shadow-none z-30">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Sozlamalarni saqlash</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
