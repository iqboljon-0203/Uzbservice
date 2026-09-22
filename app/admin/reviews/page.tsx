'use client';

import React, { useState, useEffect } from 'react';
import {
  Star, Plus, Trash2, Edit, Save, X, RefreshCw, AlertCircle,
  CheckCircle, Eye, EyeOff
} from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/reviews', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data.data || []);
      }
    } catch (err) {
      console.error('Fetch reviews error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAddNew = () => {
    setEditingItem({
      author_uz: '',
      author_ru: '',
      rating: 5,
      text_uz: '',
      text_ru: '',
      service_uz: "Gaz qozonini ta'mirlash",
      service_ru: 'Ремонт газового котла',
      date_uz: 'Bugun',
      date_ru: 'Сегодня',
      avatar: '',
      is_visible: true,
      sort_order: reviews.length + 1,
    });
  };

  const handleEdit = (rev: any) => {
    setEditingItem({ ...rev });
  };

  const toggleVisibility = async (rev: any) => {
    const token = localStorage.getItem('admin_token');
    const newStatus = !rev.is_visible;
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: rev.id, is_visible: newStatus })
      });
      if (res.ok) {
        setReviews(prev => prev.map(r => r.id === rev.id ? { ...r, is_visible: newStatus } : r));
      }
    } catch (err) {
      console.error('Toggle visibility error:', err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    const token = localStorage.getItem('admin_token');
    const isNew = !editingItem.id;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await fetch('/api/admin/reviews', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editingItem)
      });

      if (res.ok) {
        setNotification({ type: 'success', message: 'Sharh muvaffaqiyatli saqlandi!' });
        setEditingItem(null);
        fetchReviews();
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

  const handleDelete = async (id: string) => {
    if (!confirm('Haqiqatan ham bu sharhni o\'chirmoqchimisiz?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setReviews(prev => prev.filter(r => r.id !== id));
        setNotification({ type: 'success', message: 'Sharh o\'chirildi' });
      }
    } catch (err) {
      console.error('Delete review error:', err);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Mijozlar Sharhlari</h1>
          <p className="text-gray-400 text-sm mt-1">Saytdagi fikr-mulohazalar, reytinglar va ko'rinish holati</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchReviews}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 text-sm font-medium border border-gray-700/60"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Yangilash</span>
          </button>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi sharh</span>
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

      {/* Reviews List */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-[#161822] border border-gray-800 rounded-2xl p-12 text-center text-gray-500">
          <Star className="w-12 h-12 mx-auto text-gray-600 mb-3" />
          <p className="text-base font-medium text-gray-400">Sharhlar mavjud emas</p>
          <button
            onClick={handleAddNew}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Birinchi sharhni qo'shish</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map(item => (
            <div
              key={item.id}
              className={`bg-[#161822] border rounded-2xl p-5 flex flex-col justify-between transition-all ${
                item.is_visible !== false
                  ? 'border-gray-800/80 hover:border-gray-700'
                  : 'border-gray-800/40 opacity-60 bg-[#161822]/50'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span>{item.author_uz || item.author_ru || 'Mijoz'}</span>
                      <div className="flex items-center gap-0.5 text-yellow-400">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {item.service_uz || item.service_ru} • {item.date_uz || item.date_ru}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleVisibility(item)}
                      title={item.is_visible !== false ? "Saytda yashirish" : "Saytda ko'rsatish"}
                      className={`p-1.5 rounded-lg transition-colors ${
                        item.is_visible !== false
                          ? 'text-emerald-400 hover:bg-emerald-500/10'
                          : 'text-gray-500 hover:bg-gray-800'
                      }`}
                    >
                      {item.is_visible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      title="Tahrirlash"
                      className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      title="O'chirish"
                      className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm mt-3">
                  {item.text_uz && (
                    <div className="p-2.5 bg-[#0f1117]/60 rounded-xl border border-gray-800/60">
                      <span className="text-[10px] uppercase font-bold text-blue-400 block mb-1">UZ:</span>
                      <p className="text-xs text-gray-300 line-clamp-3">"{item.text_uz}"</p>
                    </div>
                  )}
                  {item.text_ru && (
                    <div className="p-2.5 bg-[#0f1117]/60 rounded-xl border border-gray-800/60">
                      <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">RU:</span>
                      <p className="text-xs text-gray-300 line-clamp-3">"{item.text_ru}"</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-500">
                <span>Tartib: #{item.sort_order || 0}</span>
                <span className={item.is_visible !== false ? 'text-emerald-400' : 'text-gray-500'}>
                  {item.is_visible !== false ? 'Saytda ko\'rinadi' : 'Yashirilgan'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#161822] border border-gray-800 rounded-t-3xl sm:rounded-2xl w-full max-w-xl p-4 sm:p-6 shadow-2xl relative max-h-[92vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-5">
              <h2 className="text-lg font-bold text-white">
                {editingItem.id ? 'Sharhni tahrirlash' : 'Yangi sharh qo\'shish'}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Reyting (1-5):</label>
                  <select
                    value={editingItem.rating || 5}
                    onChange={e => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value={5}>5 yulduz ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 yulduz ⭐⭐⭐⭐</option>
                    <option value={3}>3 yulduz ⭐⭐⭐</option>
                    <option value={2}>2 yulduz ⭐⭐</option>
                    <option value={1}>1 yulduz ⭐</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Tartib (Sort order):</label>
                  <input
                    type="number"
                    value={editingItem.sort_order || 0}
                    onChange={e => setEditingItem({ ...editingItem, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              {/* Uzbek */}
              <div className="p-4 bg-[#0f1117] rounded-xl border border-gray-800/80 space-y-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">O'zbekcha</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Mijoz ismi (UZ):</label>
                    <input
                      type="text"
                      required
                      value={editingItem.author_uz || ''}
                      onChange={e => setEditingItem({ ...editingItem, author_uz: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Xizmat nomi (UZ):</label>
                    <input
                      type="text"
                      value={editingItem.service_uz || ''}
                      onChange={e => setEditingItem({ ...editingItem, service_uz: e.target.value })}
                      placeholder="Gaz qozonini ta'mirlash"
                      className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Sharh matni (UZ):</label>
                  <textarea
                    rows={3}
                    required
                    value={editingItem.text_uz || ''}
                    onChange={e => setEditingItem({ ...editingItem, text_uz: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                  />
                </div>
              </div>

              {/* Russian */}
              <div className="p-4 bg-[#0f1117] rounded-xl border border-gray-800/80 space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Ruscha</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Имя клиента (RU):</label>
                    <input
                      type="text"
                      required
                      value={editingItem.author_ru || ''}
                      onChange={e => setEditingItem({ ...editingItem, author_ru: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Название услуги (RU):</label>
                    <input
                      type="text"
                      value={editingItem.service_ru || ''}
                      onChange={e => setEditingItem({ ...editingItem, service_ru: e.target.value })}
                      placeholder="Ремонт газового котла"
                      className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Текст отзыва (RU):</label>
                  <textarea
                    rows={3}
                    required
                    value={editingItem.text_ru || ''}
                    onChange={e => setEditingItem({ ...editingItem, text_ru: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-sm text-white"
                  />
                </div>
              </div>

              {/* Avatar / Photo */}
              <ImageUploader
                label="Mijoz fotosurati / Avatar (ixtiyoriy)"
                description="Kompyuteringizdan mijoz rasmini tanlang"
                value={editingItem.avatar || ''}
                onChange={url => setEditingItem({ ...editingItem, avatar: url })}
              />

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={editingItem.is_visible !== false}
                    onChange={e => setEditingItem({ ...editingItem, is_visible: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 bg-[#0f1117] border-gray-700 focus:ring-0"
                  />
                  <span>Saytda darhol ko'rsatilsin</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/25 disabled:opacity-50"
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
