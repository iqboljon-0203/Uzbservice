'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
  compact?: boolean;
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Rasm',
  description = 'Kompyuteringizdan rasm tanlang (PNG, JPG, WEBP) yoki manzil kiriting',
  compact = false,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setError(null);
    setSuccess(false);
    setUploading(true);

    try {
      const token = localStorage.getItem('admin_token');
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Rasm yuklashda xatolik yuz berdi');
      }

      onChange(data.url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Yuklashda xatolik');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (compact) {
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-[11px] text-gray-400">{label}:</label>}
        <div className="flex items-center gap-2">
          {value ? (
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-700 bg-gray-900 flex-shrink-0 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 transition-opacity"
                title="O'chirish"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg border border-dashed border-gray-700 bg-gray-900/50 flex items-center justify-center text-gray-600 flex-shrink-0">
              <ImageIcon className="w-4 h-4" />
            </div>
          )}

          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/..."
            className="flex-1 px-2.5 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-2.5 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50 flex-shrink-0"
            title="Kompyuterdan tanlash"
          >
            {uploading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <UploadCloud className="w-3.5 h-3.5" />
            )}
            <span>Yuklash</span>
          </button>
        </div>
        {error && <p className="text-[11px] text-red-400">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2 p-3.5 bg-[#0f1117] rounded-xl border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-semibold text-gray-300">{label}</label>
          {description && <p className="text-[11px] text-gray-500">{description}</p>}
        </div>
        {success && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Yuklandi!
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
        {/* Preview */}
        {value ? (
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-700 bg-gray-900/80 flex-shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 transition-opacity">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                title="Almashtirish"
              >
                <UploadCloud className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1 rounded-lg bg-red-600 text-white hover:bg-red-500"
                title="O'chirish"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-700 hover:border-blue-500 bg-[#161822]/60 hover:bg-blue-500/5 flex flex-col items-center justify-center text-gray-500 hover:text-blue-400 cursor-pointer transition-all flex-shrink-0"
          >
            <ImageIcon className="w-6 h-6 mb-1" />
            <span className="text-[10px]">Rasm yo'q</span>
          </div>
        )}

        {/* Inputs & Buttons */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              {uploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Yuklanmoqda...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Kompyuterdan tanlash</span>
                </>
              )}
            </button>

            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-red-400 text-xs transition-colors"
                title="Rasmni olib tashlash"
              >
                Tozalash
              </button>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="yoki rasm manzilini kiriting: /images/service.png"
              className="w-full px-3 py-1.5 bg-[#161822] border border-gray-700 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 pt-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
