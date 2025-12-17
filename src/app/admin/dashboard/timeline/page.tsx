"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Plus } from "lucide-react";

interface TimelineItem {
    id: string;
    year: string;
    title: string;
    company: string;
    description: string;
    type: string;
    created_at: string;
}

export default function TimelineAdmin() {
    const [items, setItems] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        year: "",
        title: "",
        company: "",
        description: "",
        type: "work",
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("timeline")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setItems(data);
        if (error) console.error("Error fetching timeline:", error);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.year || !formData.title) return;

        const { error } = await supabase.from("timeline").insert([formData]);

        if (error) {
            alert("Hata oluştu: " + error.message);
        } else {
            setFormData({ year: "", title: "", company: "", description: "", type: "work" });
            fetchItems();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Silmek istediğinize emin misiniz?")) return;
        const { error } = await supabase.from("timeline").delete().eq("id", id);
        if (!error) fetchItems();
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-serif mb-8">Deneyim/Eğitim Yönetimi</h2>

            {/* Add Form */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <h3 className="text-xl mb-4 font-medium flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Yeni Ekle
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Yıl (örn: 2023 - 2024)"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Ünvan (örn: Muhabir)"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Kurum/Okul (örn: TRT Haber)"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                    />
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                    >
                        <option value="work">İş Deneyimi</option>
                        <option value="education">Eğitim</option>
                    </select>
                    <textarea
                        placeholder="Açıklama"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white md:col-span-2"
                        rows={3}
                    />
                    <button
                        type="submit"
                        className="bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition-colors md:col-span-2"
                    >
                        Ekle
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="space-y-4">
                {loading ? (
                    <p className="text-gray-500">Yükleniyor...</p>
                ) : items.length === 0 ? (
                    <p className="text-gray-500">Henüz kayıt yok.</p>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
                        >
                            <div>
                                <h4 className="text-lg font-medium text-white">{item.title}</h4>
                                <p className="text-sm text-gray-400">
                                    {item.company} • {item.year}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Sil"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
