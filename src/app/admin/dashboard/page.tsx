"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Image as ImageIcon, Briefcase, Building2 } from "lucide-react";

export default function DashboardPage() {
    const [stats, setStats] = useState({ photos: 0, timeline: 0, references: 0 });

    useEffect(() => {
        async function fetchStats() {
            const { count: photosCount } = await supabase.from('photos').select('*', { count: 'exact', head: true });
            const { count: timelineCount } = await supabase.from('timeline').select('*', { count: 'exact', head: true });
            const { count: referencesCount } = await supabase.from('references').select('*', { count: 'exact', head: true });

            setStats({
                photos: photosCount || 0,
                timeline: timelineCount || 0,
                references: referencesCount || 0
            });
        }
        fetchStats();
    }, []);

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Genel Bakış</h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Photos Card */}
                <div className="relative overflow-hidden p-6 rounded-xl bg-white/[0.03] border border-white/10 group hover:border-[var(--accent-gold)]/50 transition-all duration-300">
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-[var(--accent-gold)]">
                                <ImageIcon className="w-5 h-5" />
                                <span className="text-sm font-semibold">Toplam Fotoğraf</span>
                            </div>
                            <p className="text-4xl font-bold text-white mb-6">{stats.photos}</p>
                            <a href="/admin/dashboard/gallery" className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                                Listeyi Görüntüle <span className="text-[var(--accent-gold)]">→</span>
                            </a>
                        </div>
                        <ImageIcon className="w-24 h-24 text-white/5 absolute right-[-20px] bottom-[-20px] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>

                {/* Timeline Card */}
                <div className="relative overflow-hidden p-6 rounded-xl bg-white/[0.03] border border-white/10 group hover:border-[var(--accent-gold)]/50 transition-all duration-300">
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-[var(--accent-gold)]">
                                <Briefcase className="w-5 h-5" />
                                <span className="text-sm font-semibold">Deneyimler</span>
                            </div>
                            <p className="text-4xl font-bold text-white mb-6">{stats.timeline}</p>
                            <a href="/admin/dashboard/timeline" className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                                Listeyi Görüntüle <span className="text-[var(--accent-gold)]">→</span>
                            </a>
                        </div>
                        <Briefcase className="w-24 h-24 text-white/5 absolute right-[-20px] bottom-[-20px] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>

                {/* References Card */}
                <div className="relative overflow-hidden p-6 rounded-xl bg-white/[0.03] border border-white/10 group hover:border-[var(--accent-gold)]/50 transition-all duration-300">
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-[var(--accent-gold)]">
                                <Building2 className="w-5 h-5" />
                                <span className="text-sm font-semibold">Referanslar</span>
                            </div>
                            <p className="text-4xl font-bold text-white mb-6">{stats.references}</p>
                            <a href="/admin/dashboard/references" className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                                Listeyi Görüntüle <span className="text-[var(--accent-gold)]">→</span>
                            </a>
                        </div>
                        <Building2 className="w-24 h-24 text-white/5 absolute right-[-20px] bottom-[-20px] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-400">Hızlı İşlemler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="/admin/dashboard/gallery" className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group">
                        <span className="font-medium text-gray-300 group-hover:text-white transition-colors">Yeni Fotoğraf Ekle</span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--accent-gold)] group-hover:text-black transition-all">
                            <ImageIcon className="w-4 h-4" />
                        </div>
                    </a>
                    <a href="/admin/dashboard/timeline" className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group">
                        <span className="font-medium text-gray-300 group-hover:text-white transition-colors">Yeni Deneyim Ekle</span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--accent-gold)] group-hover:text-black transition-all">
                            <Briefcase className="w-4 h-4" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
