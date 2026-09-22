'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText, Search, Filter, Phone, Trash2, CheckCircle2,
  Clock, XCircle, AlertCircle, RefreshCw, MessageSquare, Globe
} from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    try {
      let url = `/api/admin/leads?status=${statusFilter}`;
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const updateLeadStatus = async (id: string, status: string) => {
    setActionLoading(id);
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
      }
    } catch (err) {
      console.error('Status update error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Haqiqatan ham bu buyurtmani o\'chirmoqchimisiz?')) return;
    setActionLoading(id);
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== id));
      }
    } catch (err) {
      console.error('Delete lead error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20"><Clock className="w-3.5 h-3.5" /> Yangi</span>;
      case 'contacted':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20"><Phone className="w-3.5 h-3.5" /> Bog'lanildi</span>;
      case 'completed':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="w-3.5 h-3.5" /> Bajarildi</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20"><XCircle className="w-3.5 h-3.5" /> Bekor qilindi</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/10 text-gray-400 border border-gray-500/20">{status}</span>;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Mijozlar Buyurtmalari (CRM)</h1>
          <p className="text-gray-400 text-sm mt-1">Saytdan kelgan barcha arizalar va ularning holati</p>
        </div>
        <button
          onClick={fetchLeads}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 text-sm font-medium border border-gray-700/60 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Yangilash</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#161822] p-4 rounded-2xl border border-gray-800/70">
        {/* Status filter tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'new', label: 'Yangi' },
            { id: 'contacted', label: 'Bog\'lanildi' },
            { id: 'completed', label: 'Bajarildi' },
            { id: 'cancelled', label: 'Bekor qilingan' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-gray-800/60 text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ism yoki telefon qidirish..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#0f1117] border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </form>
      </div>

      {/* Leads List */}
      <div className="bg-[#161822] border border-gray-800/70 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto text-gray-600 mb-3" />
            <p className="text-base font-medium text-gray-400">Hech qanday buyurtma topilmadi</p>
            <p className="text-xs text-gray-500 mt-1">Ushbu filtr bo'yicha ma'lumot yo'q</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#13151e] border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-5 font-semibold">Mijoz</th>
                    <th className="py-3.5 px-5 font-semibold">Telefon</th>
                    <th className="py-3.5 px-5 font-semibold">Xizmat & Izoh</th>
                    <th className="py-3.5 px-5 font-semibold">Til & Sana</th>
                    <th className="py-3.5 px-5 font-semibold">Holat</th>
                    <th className="py-3.5 px-5 font-semibold text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {leads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-gray-800/25 transition-colors">
                      {/* Name */}
                      <td className="py-4 px-5">
                        <div className="font-semibold text-white">{lead.name || 'Mijoz'}</div>
                        <div className="text-xs text-gray-500">ID: {lead.id}</div>
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-5">
                        <a
                          href={`tel:${lead.phone}`}
                          className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{lead.phone}</span>
                        </a>
                      </td>

                      {/* Service & Comment */}
                      <td className="py-4 px-5 max-w-xs">
                        <div className="text-gray-200 font-medium truncate">{lead.service || '—'}</div>
                        {lead.comment && lead.comment !== '—' && (
                          <div className="text-xs text-gray-400 mt-1 flex items-start gap-1">
                            <MessageSquare className="w-3 h-3 flex-shrink-0 mt-0.5 text-gray-500" />
                            <span className="truncate">{lead.comment}</span>
                          </div>
                        )}
                      </td>

                      {/* Lang & Date */}
                      <td className="py-4 px-5 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Globe className="w-3 h-3 text-gray-500" />
                          <span className="uppercase font-semibold text-gray-300">{lead.lang || 'RU'}</span>
                        </div>
                        <div className="mt-1 text-gray-500">
                          {lead.created_at ? new Date(lead.created_at).toLocaleString('uz-UZ') : (lead.timestamp || '—')}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        {getStatusBadge(lead.status || 'new')}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={lead.status || 'new'}
                            disabled={actionLoading === lead.id}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="bg-[#0f1117] border border-gray-700 rounded-lg px-2.5 py-1 text-xs text-gray-300 focus:outline-none focus:border-blue-500"
                          >
                            <option value="new">Yangi</option>
                            <option value="contacted">Bog'lanildi</option>
                            <option value="completed">Bajarildi</option>
                            <option value="cancelled">Bekor qilindi</option>
                          </select>

                          <button
                            onClick={() => deleteLead(lead.id)}
                            disabled={actionLoading === lead.id}
                            title="O'chirish"
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-800/80">
              {leads.map((lead: any) => (
                <div key={lead.id} className="p-4 space-y-3 bg-[#161822]/40 hover:bg-[#161822] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-white text-base">{lead.name || 'Mijoz'}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span className="uppercase font-bold text-gray-400">{lead.lang || 'RU'}</span>
                        <span>•</span>
                        <span>{lead.created_at ? new Date(lead.created_at).toLocaleDateString('uz-UZ') : (lead.timestamp || '—')}</span>
                      </div>
                    </div>
                    {getStatusBadge(lead.status || 'new')}
                  </div>

                  <div className="p-2.5 bg-[#0f1117] rounded-xl border border-gray-800/80 space-y-1">
                    <div className="text-xs text-blue-400 font-medium">Xizmat: {lead.service || '—'}</div>
                    {lead.comment && lead.comment !== '—' && (
                      <div className="text-xs text-gray-300 flex items-start gap-1">
                        <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-500" />
                        <span>{lead.comment}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/25 text-xs font-semibold hover:bg-blue-600/25 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{lead.phone}</span>
                    </a>

                    <select
                      value={lead.status || 'new'}
                      disabled={actionLoading === lead.id}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className="bg-[#0f1117] border border-gray-700 rounded-xl px-2.5 py-2 text-xs text-gray-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="new">Yangi</option>
                      <option value="contacted">Bog'lanildi</option>
                      <option value="completed">Bajarildi</option>
                      <option value="cancelled">Bekor qilindi</option>
                    </select>

                    <button
                      onClick={() => deleteLead(lead.id)}
                      disabled={actionLoading === lead.id}
                      className="p-2 text-gray-500 hover:text-red-400 rounded-xl bg-gray-800/50 hover:bg-red-500/10"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
