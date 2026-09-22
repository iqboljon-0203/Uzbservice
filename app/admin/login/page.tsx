'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sahifa yuklanganda saqlangan login va "eslab qolish" holatini tiklash
  useEffect(() => {
    const savedRemember = localStorage.getItem('admin_remember_me');
    const savedEmail = localStorage.getItem('admin_remembered_email');

    if (savedRemember === 'true') {
      setRememberMe(true);
      if (savedEmail) {
        setEmail(savedEmail);
      }
    } else if (savedRemember === 'false') {
      setRememberMe(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Iltimos, parolni kiriting');
      return;
    }

    setLoading(true);
    setError('');

    // Agar foydalanuvchi faqat "admin" deb yozsa yoki bo'sh qoldirsa:
    let loginEmail = email.trim();
    if (!loginEmail || loginEmail.toLowerCase() === 'admin') {
      loginEmail = 'admin@toshkentservice.uz';
    }

    try {
      // 1. Supabase Auth orqali to'g'ridan-to'g'ri kirishga urinish
      let token = '';
      let userEmail = loginEmail;
      let loginSuccess = false;

      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: password.trim(),
        });

        if (!authError && authData?.session) {
          token = authData.session.access_token;
          userEmail = authData.user?.email || loginEmail;
          loginSuccess = true;
        }
      } catch (clientAuthErr) {
        console.warn('Direct supabase auth failed, trying backend API:', clientAuthErr);
      }

      // 2. Agar client-side auth o'tmasa, backend /api/admin/login orqali tekshirish
      if (!loginSuccess) {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loginEmail, password: password.trim() }),
        });

        const data = await res.json();
        if (res.ok && data.ok) {
          token = data.token;
          userEmail = data.user?.email || loginEmail;
          loginSuccess = true;
        } else {
          setError(data.error || 'Login yoki parol noto\'g\'ri');
        }
      }

      if (loginSuccess && token) {
        // Tokenni saqlash
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user_email', userEmail);

        // "Meni eslab qolish" mantiqi
        if (rememberMe) {
          localStorage.setItem('admin_remember_me', 'true');
          localStorage.setItem('admin_remembered_email', email.trim() || 'admin@toshkentservice.uz');
        } else {
          localStorage.setItem('admin_remember_me', 'false');
          localStorage.removeItem('admin_remembered_email');
        }

        router.push('/admin');
      }
    } catch {
      setError('Server bilan ulanishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#161822]/90 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-8 shadow-2xl shadow-black/40">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-4">
              <img src="/images/logo.svg" alt="Logo" className="w-full h-full object-contain filter drop-shadow-lg" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-1">Toshkent Service boshqaruv tizimiga kirish</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Login */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email yoki Login
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@toshkentservice.uz yoki admin"
                  className="w-full pl-11 pr-4 py-3 bg-[#0f1117] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                  autoFocus={!email}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Admin Parol
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parolni kiriting..."
                  className="w-full pl-11 pr-12 py-3 bg-[#0f1117] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                  autoFocus={!!email}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Eslab qolish (Remember me) Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2.5 cursor-pointer select-none group">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    rememberMe
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'bg-[#0f1117] border-gray-700 group-hover:border-gray-600'
                  }`}
                >
                  {rememberMe && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                  Meni eslab qolish
                </span>
              </label>

              <span className="text-[11px] text-gray-500">
                Supabase Auth 🔒
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Kirish</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-800/60 pt-4">
            <p className="text-xs text-gray-500">
              Toshkent Service Management System &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
