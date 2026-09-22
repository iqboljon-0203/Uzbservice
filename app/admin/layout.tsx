'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, FileText, Settings, Star, Wrench, LogOut,
  Menu, X, ChevronRight, Shield, Sparkles
} from 'lucide-react';

import { supabase } from '@/lib/supabase';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Buyurtmalar (CRM)', icon: FileText },
  { href: '/admin/landing', label: 'Landing sahifasi', icon: Sparkles },
  { href: '/admin/services', label: 'Asosiy xizmatlar', icon: Wrench },
  { href: '/admin/service-details', label: 'Batafsil sahifalar', icon: FileText },
  { href: '/admin/reviews', label: 'Sharhlar', icon: Star },
  { href: '/admin/settings', label: 'Sozlamalar', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('admin@toshkentservice.uz');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          localStorage.setItem('admin_token', session.access_token);
          if (session.user?.email) {
            setUserEmail(session.user.email);
            localStorage.setItem('admin_user_email', session.user.email);
          }
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }
      } catch {
        // fallback
      }

      const token = localStorage.getItem('admin_token');
      const savedEmail = localStorage.getItem('admin_user_email');
      if (token) {
        setIsAuthenticated(true);
        if (savedEmail) setUserEmail(savedEmail);
      } else if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      setLoading(false);
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem('admin_token', session.access_token);
        if (session.user?.email) setUserEmail(session.user.email);
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user_email');
    if (localStorage.getItem('admin_remember_me') !== 'true') {
      localStorage.removeItem('admin_remembered_email');
    }
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-gray-100 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#161822] border-r border-gray-800/50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-gray-800/50">
          <div className="w-9 h-9 mr-3 flex items-center justify-center shrink-0">
            <img src="/images/logo.svg" alt="Logo" className="w-full h-full object-contain filter drop-shadow" />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Panel
          </span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-blue-500/15 text-blue-400 shadow-sm shadow-blue-500/10'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                  }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-3 border-t border-gray-800/50 space-y-2">
          <div className="px-3 py-1.5 rounded-lg bg-gray-800/40 border border-gray-800/60 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Admin</p>
              <p className="text-xs text-gray-300 font-medium truncate">{userEmail}</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Faol sessiya" />
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 w-full transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Chiqish</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-[#161822]/80 backdrop-blur-xl border-b border-gray-800/50 flex items-center px-4 lg:px-6 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white mr-3">
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-semibold text-gray-300">
            {navItems.find(i => i.href === pathname)?.label || 'Admin'}
          </h2>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              ← Saytga qaytish
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 pb-24 lg:pb-6 overflow-y-auto">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav aria-label="Mobil navigatsiya" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161822]/95 backdrop-blur-xl border-t border-gray-800/80 px-1 py-1.5 flex items-center justify-around shadow-2xl">
          <Link
            href="/admin"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-medium transition-all ${
              pathname === '/admin' ? 'text-blue-400 font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            <span>Asosiy</span>
          </Link>

          <Link
            href="/admin/leads"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-medium transition-all ${
              pathname === '/admin/leads' ? 'text-blue-400 font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileText className="w-5 h-5 mb-0.5" />
            <span>Arizalar</span>
          </Link>

          <Link
            href="/admin/landing"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-medium transition-all ${
              pathname === '/admin/landing' ? 'text-blue-400 font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sparkles className="w-5 h-5 mb-0.5" />
            <span>Landing</span>
          </Link>

          <Link
            href="/admin/services"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-medium transition-all ${
              pathname === '/admin/services' ? 'text-blue-400 font-semibold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Wrench className="w-5 h-5 mb-0.5" />
            <span>Xizmatlar</span>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-medium text-gray-400 hover:text-gray-200 transition-all"
          >
            <Menu className="w-5 h-5 mb-0.5" />
            <span>Menyu</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
