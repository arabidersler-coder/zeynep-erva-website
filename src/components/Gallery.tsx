
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PhotoItem {
    id: string;
    url: string;
    title: string;
}

export default function Gallery() {
    const [images, setImages] = useState<PhotoItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data } = await supabase
                .from("photos")
                .select("*")
                .order("created_at", { ascending: false });

            if (data) setImages(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) return null;

    // Fallback to placeholder if empty, so the site doesn't look broken immediately
    if (images.length === 0) {
        return (
            <section className="py-24 px-4 bg-black/90 relative z-10">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-gray-500">Galeriye henüz fotoğraf eklenmedi.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="py-24 px-4 bg-black/90 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white/90 mb-4 tracking-wide">
                        Galeri
                    </h2>
                    <div className="h-1 w-20 bg-gray-800 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {images.map((img, index) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className={`group relative overflow-hidden rounded-sm bg-gray-900 shadow-2xl ${
                                // Make some images span 2 rows for masonry effect (simulated)
                                index % 5 === 0 ? "md:row-span-2 aspect-[3/5]" : "aspect-[4/5]"
                                }`}
                        >
                            <Image
                                src={img.url}
                                alt={img.title || "Galeri Fotoğrafı"}
                                fill
                                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
                            />

                            {/* Overlay Gradient - Cinematic */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute bottom-8 left-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <span className="block text-[10px] font-medium text-[var(--accent-gold)] tracking-[0.3em] uppercase mb-2">Portfolio</span>
                                <h3 className="text-2xl font-serif text-white">{img.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

