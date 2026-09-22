'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText, Wrench, Star, Settings, Users, CheckCircle, Clock,
  AlertTriangle, ArrowUpRight, Phone, Calendar, RefreshCw
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    servicesCount: 4,
    reviewsCount: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      // 1. Leads
      const leadsRes = await fetch('/api/admin/leads?limit=5', { headers });
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setRecentLeads(leadsData.data || []);
        const total = leadsData.total || (leadsData.data ? leadsData.data.length : 0);
        const newCount = (leadsData.data || []).filter((l: any) => l.status === 'new').length;
        setStats(prev => ({ ...prev, totalLeads: total, newLeads: newCount }));
      }

      // 2. Services
      const servRes = await fetch('/api/admin/services', { headers });
      if (servRes.ok) {
        const servData = await servRes.json();
        if (servData.data) {
          setStats(prev => ({ ...prev, servicesCount: servData.data.length }));
        }
      }

      // 3. Reviews
      const revRes = await fetch('/api/admin/reviews', { headers });
      if (revRes.ok) {
        const revData = await revRes.json();
        if (revData.data) {
          setStats(prev => ({ ...prev, reviewsCount: revData.data.length }));
        }
      }
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Yangi</span>;
      case 'contacted':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Bog'lanildi</span>;
      case 'completed':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Bajarildi</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Bekor qilindi</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20">{status}</span>;
    }
  };

  return (
    <div className="space-y-5 sm:space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Boshqaruv Paneli</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Sayt faoliyati va ma'lumotlarini kuzatib boring</p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 text-xs sm:text-sm font-medium border border-gray-700/60 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Yangilash</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Card 1: Leads */}
        <div className="bg-[#161822] border border-gray-800/70 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">Jami Buyurtmalar</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{stats.totalLeads}</span>
            <span className="text-xs text-amber-400 font-medium">({stats.newLeads} ta yangi)</span>
          </div>
          <Link
            href="/admin/leads"
            className="mt-4 inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium"
          >
            <span>Barchasini ko'rish</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Services */}
        <div className="bg-[#161822] border border-gray-800/70 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">Asosiy Xizmatlar</span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-white">{stats.servicesCount}</span>
          </div>
          <Link
            href="/admin/services"
            className="mt-4 inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <span>Tahrirlash</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Reviews */}
        <div className="bg-[#161822] border border-gray-800/70 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">Mijozlar Sharhlari</span>
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-white">{stats.reviewsCount}</span>
          </div>
          <Link
            href="/admin/reviews"
            className="mt-4 inline-flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 font-medium"
          >
            <span>Boshqarish</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 4: Settings */}
        <div className="bg-[#161822] border border-gray-800/70 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">Sayt Sozlamalari</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-emerald-400">Faol holatda</span>
          </div>
          <Link
            href="/admin/settings"
            className="mt-4 inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <span>Kontaktlar & Matnlar</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-[#161822] border border-gray-800/70 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-white">So'nggi buyurtmalar</h2>
            <p className="text-xs text-gray-400 mt-0.5">Mijozlar tomonidan qoldirilgan oxirgi murojaatlar</p>
          </div>
          <Link
            href="/admin/leads"
            className="px-3.5 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-medium border border-blue-500/20 transition-colors"
          >
            Hammasini ko'rish
          </Link>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recentLeads.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm">
            Hozircha buyurtmalar mavjud emas
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="pb-3 font-medium">Mijoz</th>
                    <th className="pb-3 font-medium">Telefon</th>
                    <th className="pb-3 font-medium">Xizmat</th>
                    <th className="pb-3 font-medium">Vaqt</th>
                    <th className="pb-3 font-medium">Holat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 text-gray-300">
                  {recentLeads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-3.5 font-medium text-white">{lead.name || 'Mijoz'}</td>
                      <td className="py-3.5 text-blue-400">
                        <a href={`tel:${lead.phone}`} className="hover:underline flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{lead.phone}</span>
                        </a>
                      </td>
                      <td className="py-3.5 text-gray-300">{lead.service || '—'}</td>
                      <td className="py-3.5 text-gray-500 text-xs">
                        {lead.created_at ? new Date(lead.created_at).toLocaleString('uz-UZ') : (lead.timestamp || '—')}
                      </td>
                      <td className="py-3.5">
                        {getStatusBadge(lead.status || 'new')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-800/60">
              {recentLeads.map((lead: any) => (
                <div key={lead.id} className="py-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-white text-sm">{lead.name || 'Mijoz'}</div>
                      <div className="text-xs text-gray-500">{lead.service || '—'}</div>
                    </div>
                    {getStatusBadge(lead.status || 'new')}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center gap-1.5 text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{lead.phone}</span>
                    </a>
                    <span className="text-[11px] text-gray-500">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString('uz-UZ') : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/admin/services"
          className="group p-5 rounded-2xl bg-[#161822] border border-gray-800/70 hover:border-blue-500/40 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Xizmatlar & Narxlar</h3>
          <p className="text-xs text-gray-400 mt-1">Bosh sahifadagi 4 ta asosiy xizmat nomlari, narxlari va rasmlarini tahrirlash</p>
        </Link>

        <Link
          href="/admin/service-details"
          className="group p-5 rounded-2xl bg-[#161822] border border-gray-800/70 hover:border-cyan-500/40 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">Batafsil Sahifalar</h3>
          <p className="text-xs text-gray-400 mt-1">Alohida xizmat sahifalari, nosozliklar (breakdowns), brendlar va alomatlar</p>
        </Link>

        <Link
          href="/admin/settings"
          className="group p-5 rounded-2xl bg-[#161822] border border-gray-800/70 hover:border-emerald-500/40 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Settings className="w-5 h-5" />
          </div>
          <h3 className="text-white font-semibold group-hover:text-emerald-400 transition-colors">Sayt Kontaktlari</h3>
          <p className="text-xs text-gray-400 mt-1">Telefon raqam, Telegram havolasi, manzil va ish vaqtlarini o'zgartirish</p>
        </Link>
      </div>
    </div>
  );
}
