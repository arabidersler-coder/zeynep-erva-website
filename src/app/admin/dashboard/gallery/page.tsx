"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface PhotoItem {
    id: string;
    url: string;
    title: string;
    created_at: string;
}

export default function GalleryAdmin() {
    const [items, setItems] = useState<PhotoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("photos")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setItems(data);
        if (error) console.error("Error fetching photos:", error);
        setLoading(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);

        // 1. Upload to Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

        if (uploadError) {
            alert("Yükleme hatası: " + uploadError.message);
            setUploading(false);
            return;
        }

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        // 3. Insert into Database
        const { error: dbError } = await supabase
            .from('photos')
            .insert([{ url: publicUrl, title: title || "Fotoğraf" }]);

        if (dbError) {
            alert("Veritabanı hatası: " + dbError.message);
        } else {
            setFile(null);
            setTitle("");
            fetchItems();
        }
        setUploading(false);
    };

    const handleDelete = async (id: string, url: string) => {
        if (!confirm("Silmek istediğinize emin misiniz?")) return;

        // Delete from DB
        const { error } = await supabase.from("photos").delete().eq("id", id);

        // Optimistically remove from UI
        if (!error) {
            setItems(items.filter(i => i.id !== id));
            // Note: Ideally we should also delete from Storage, but for this demo simplify we just delete DB record
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-serif mb-8">Galeri Yönetimi</h2>

            {/* Upload Form */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <h3 className="text-xl mb-4 font-medium flex items-center gap-2">
                    <Upload className="w-5 h-5" /> Yeni Fotoğraf Yükle
                </h3>
                <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
                            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-gray-300">{file ? file.name : "Dosya Seçin veya Sürükleyin"}</span>
                        </label>
                    </div>

                    <input
                        type="text"
                        placeholder="Başlık (Opsiyonel)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white md:col-span-2"
                    />

                    <button
                        type="submit"
                        disabled={!file || uploading}
                        className={`bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition-colors md:col-span-2 ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {uploading ? 'Yükleniyor...' : 'Yükle'}
                    </button>
                </form>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {loading ? (
                    <p className="text-gray-500">Yükleniyor...</p>
                ) : items.length === 0 ? (
                    <p className="text-gray-500">Henüz fotoğraf yok.</p>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="relative aspect-[4/5] bg-gray-900 rounded-xl overflow-hidden group shadow-lg"
                        >
                            <Image
                                src={item.url}
                                alt={item.title}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => handleDelete(item.id, item.url)}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-xs text-white truncate">{item.title}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
