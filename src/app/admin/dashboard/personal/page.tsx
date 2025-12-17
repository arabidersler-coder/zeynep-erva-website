"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2 } from "lucide-react";

export default function PersonalAdmin() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [id, setId] = useState<string | null>(null);
    const [form, setForm] = useState({
        motto: "",
        story_title: "",
        story_content: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data, error } = await supabase
                .from('personal_notes')
                .select('*')
                .limit(1)
                .single();

            if (data) {
                setId(data.id);
                setForm({
                    motto: data.motto || "",
                    story_title: data.story_title || "",
                    story_content: data.story_content || ""
                });
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (id) {
                // Update existing
                await supabase
                    .from('personal_notes')
                    .update(form)
                    .eq('id', id);
            } else {
                // Insert new (should rarely happen if initialized via SQL)
                await supabase
                    .from('personal_notes')
                    .insert([form]);
            }
            alert("Başarıyla güncellendi! 🎉");
        } catch (error) {
            console.error('Error saving:', error);
            alert("Bir hata oluştu.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white p-8">Yükleniyor...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Kişisel Notlar</h2>
                <p className="text-gray-400 mt-2">"Zeynep'ten" bölümündeki içerikleri buradan yönetebilirsin.</p>
            </div>

            <div className="grid gap-8 max-w-2xl">
                {/* Motto Section */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 shadow-xl">
                    <label className="block text-sm font-medium text-[var(--accent-gold)] mb-4 uppercase tracking-wider">
                        Tek Cümleyle Ben (Motto)
                    </label>
                    <textarea
                        value={form.motto}
                        onChange={(e) => setForm({ ...form, motto: e.target.value })}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)] transition-all min-h-[100px] text-lg font-serif italic"
                        placeholder="Örn: Anın içinde sonsuzluğu arayan..."
                    />
                    <p className="text-xs text-gray-500 mt-2">Bu yazı sol taraftaki büyük başlık alanında görünecek.</p>
                </div>

                {/* Story Section */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 shadow-xl">
                    <label className="block text-sm font-medium text-[var(--accent-gold)] mb-4 uppercase tracking-wider">
                        Günün Hikayesi
                    </label>

                    <div className="space-y-4">
                        <input
                            type="text"
                            value={form.story_title}
                            onChange={(e) => setForm({ ...form, story_title: e.target.value })}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)] transition-all font-bold"
                            placeholder="Başlık (Örn: Bugünün İlhamı)"
                        />

                        <textarea
                            value={form.story_content}
                            onChange={(e) => setForm({ ...form, story_content: e.target.value })}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)] transition-all min-h-[200px] leading-relaxed"
                            placeholder="Hikayeni buraya yaz..."
                        />
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 bg-[var(--accent-gold)] text-black font-bold py-4 px-8 rounded-lg hover:bg-[#b08d2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? <Loader2 className="animate-spin" /> : <Save />}
                    Değişiklikleri Kaydet
                </button>
            </div>
        </div>
    );
}
