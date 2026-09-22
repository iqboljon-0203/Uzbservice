'use client';

import React, { useState, useEffect } from 'react';
import {
  Wrench, Edit, Plus, Trash2, Save, X, RefreshCw, AlertCircle, CheckCircle, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/services', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setServices(data.data || []);
      }
    } catch (err) {
      console.error('Fetch services error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service: any) => {
    setEditingItem({ ...service });
  };

  const handleAddNew = () => {
    setEditingItem({
      service_id: '',
      title_uz: '',
      title_ru: '',
      desc_uz: '',
      desc_ru: '',
      price_note_uz: "80 000 so'mdan",
      price_note_ru: 'от 80 000 сум',
      badge_uz: 'Kafolat bilan',
      badge_ru: 'С гарантией',
      image: '/images/services/gas-boiler.webp',
      sort_order: services.length + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.service_id) {
      alert('Xizmat ID (service_id) kiritilishi shart');
      return;
    }

    setSaveLoading(true);
    const token = localStorage.getItem('admin_token');
    const isNew = !editingItem.id;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await fetch('/api/admin/services', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editingItem)
      });

      if (res.ok) {
        setNotification({ type: 'success', message: 'Xizmat muvaffaqiyatli saqlandi!' });
        setEditingItem(null);
        fetchServices();
      } else {
        const err = await res.json();
        setNotification({ type: 'error', message: err.error || 'Saqlashda xatolik yuz berdi' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Server bilan aloqa uzildi' });
    } finally {
      setSaveLoading(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm('Haqiqatan ham bu xizmatni o\'chirmoqchimisiz?')) return;
    const token = localStorage.getItem('admin_token');
    const param = item.id ? `id=${item.id}` : `service_id=${item.service_id}`;
    try {
      const res = await fetch(`/api/admin/services?${param}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setServices(prev => prev.filter(s => (item.id ? s.id !== item.id : s.service_id !== item.service_id)));
        setNotification({ type: 'success', message: 'Xizmat muvaffaqiyatli o\'chirildi' });
      } else {
        const err = await res.json();
        setNotification({ type: 'error', message: err.error || 'O\'chirishda xatolik' });
      }
    } catch (err) {
      console.error('Delete service error:', err);
      setNotification({ type: 'error', message: 'Server bilan aloqa uzildi' });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Asosiy Xizmatlar Boshqaruvi</h1>
          <p className="text-gray-400 text-sm mt-1">Bosh sahifadagi xizmat kartalarining ma'lumotlari va narxlari</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 text-sm font-medium border border-gray-700/60 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Yangilash</span>
          </button>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi xizmat</span>
          </button>
        </div>
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

      {/* Services Grid */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="bg-[#161822] border border-gray-800 rounded-2xl p-12 text-center text-gray-500">
          <Wrench className="w-12 h-12 mx-auto text-gray-600 mb-3" />
          <p className="text-base font-medium text-gray-400">Xizmatlar topilmadi</p>
          <p className="text-xs text-gray-500 mt-1">Supabase jadvallari yaratilgach, ma'lumotlar bu yerda aks etadi</p>
          <button
            onClick={handleAddNew}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Birinchi xizmatni qo'shish</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((item) => (
            <div
              key={item.id || item.service_id}
              className="bg-[#161822] border border-gray-800/80 rounded-2xl p-5 hover:border-gray-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      ID: {item.service_id}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-xs bg-gray-800 text-gray-300">
                      #{item.sort_order || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/${item.service_id}`}
                      target="_blank"
                      className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/60"
                      title="Saytda ko'rish"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-blue-500/10"
                      title="Tahrirlash"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/10"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-gray-500 tracking-wider">O'zbekcha:</span>
                    <h3 className="text-base font-semibold text-white">{item.title_uz || '—'}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">{item.desc_uz || '—'}</p>
                    <div className="text-xs text-emerald-400 font-medium mt-1">Narx: {item.price_note_uz || '—'}</div>
                  </div>

                  <div className="pt-2 border-t border-gray-800/60">
                    <span className="text-[11px] uppercase font-bold text-gray-500 tracking-wider">Ruscha:</span>
                    <h4 className="text-sm font-medium text-gray-200">{item.title_ru || '—'}</h4>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">{item.desc_ru || '—'}</p>
                    <div className="text-xs text-emerald-400 font-medium mt-1">Цена: {item.price_note_ru || '—'}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-500">
                <span className="truncate max-w-[200px]">Rasm: {item.image || 'mavjud emas'}</span>
                <span>Badge: {item.badge_uz || item.badge_ru}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#161822] border border-gray-800 rounded-t-3xl sm:rounded-2xl w-full max-w-2xl p-4 sm:p-6 shadow-2xl relative max-h-[92vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-5">
              <h2 className="text-lg font-bold text-white">
                {editingItem.id ? 'Xizmatni tahrirlash' : 'Yangi xizmat qo\'shish'}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                    Service ID (URL slug):
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.service_id || ''}
                    onChange={e => setEditingItem({ ...editingItem, service_id: e.target.value })}
                    placeholder="masalan: gas-boilers"
                    className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                    Tartib raqami (Sort order):
                  </label>
                  <input
                    type="number"
                    value={editingItem.sort_order || 0}
                    onChange={e => setEditingItem({ ...editingItem, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Uzbek Tab */}
              <div className="p-4 bg-[#0f1117]/60 rounded-xl border border-gray-800/80 space-y-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">O'zbekcha ma'lumotlar</span>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Xizmat nomi (UZ):</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title_uz || ''}
                    onChange={e => setEditingItem({ ...editingItem, title_uz: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Tavsif (UZ):</label>
                  <textarea
                    rows={2}
                    value={editingItem.desc_uz || ''}
                    onChange={e => setEditingItem({ ...editingItem, desc_uz: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Narx (UZ):</label>
                    <input
                      type="text"
                      value={editingItem.price_note_uz || ''}
                      onChange={e => setEditingItem({ ...editingItem, price_note_uz: e.target.value })}
                      placeholder="80 000 so'mdan"
                      className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Badge (UZ):</label>
                    <input
                      type="text"
                      value={editingItem.badge_uz || ''}
                      onChange={e => setEditingItem({ ...editingItem, badge_uz: e.target.value })}
                      placeholder="Ommabop"
                      className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Russian Tab */}
              <div className="p-4 bg-[#0f1117]/60 rounded-xl border border-gray-800/80 space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Ruscha ma'lumotlar</span>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Название услуги (RU):</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title_ru || ''}
                    onChange={e => setEditingItem({ ...editingItem, title_ru: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Описание (RU):</label>
                  <textarea
                    rows={2}
                    value={editingItem.desc_ru || ''}
                    onChange={e => setEditingItem({ ...editingItem, desc_ru: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Цена (RU):</label>
                    <input
                      type="text"
                      value={editingItem.price_note_ru || ''}
                      onChange={e => setEditingItem({ ...editingItem, price_note_ru: e.target.value })}
                      placeholder="от 80 000 сум"
                      className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Badge (RU):</label>
                    <input
                      type="text"
                      value={editingItem.badge_ru || ''}
                      onChange={e => setEditingItem({ ...editingItem, badge_ru: e.target.value })}
                      placeholder="Популярно"
                      className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Image Uploader */}
              <ImageUploader
                label="Xizmat rasmi"
                description="Kompyuteringizdan xizmat rasmini tanlang (PNG, JPG, WEBP) yoki manzil kiriting"
                value={editingItem.image || ''}
                onChange={(url) => setEditingItem({ ...editingItem, image: url })}
              />

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/25 disabled:opacity-50 transition-all"
                >
                  {saveLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Saqlash</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
