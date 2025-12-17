"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Quote, Feather } from "lucide-react";

interface NoteData {
    motto: string;
    story_title: string;
    story_content: string;
}

export default function PersonalNotes() {
    const [data, setData] = useState<NoteData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const { data, error } = await supabase
                .from('personal_notes')
                .select('*')
                .limit(1)
                .single();

            if (error) {
                console.error('Error fetching notes:', error);
            } else {
                setData(data);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null; // Or a sleek skeleton

    return (
        <section className="py-32 relative z-10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Improving Motto Section (Editorial Style) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute -top-12 -left-8 text-[var(--accent-gold)] opacity-10">
                            <Quote size={120} />
                        </div>

                        <h3 className="font-serif text-3xl md:text-5xl leading-tight text-white relative z-10">
                            <span className="text-[var(--accent-gold)] italic block text-xl mb-4 font-normal tracking-widest uppercase">
                                Tek Cümleyle Ben
                            </span>
                            "{data?.motto || 'Anın içinde sonsuzluğu arayan bir hikaye anlatıcısı.'}"
                        </h3>
                    </motion.div>

                    {/* Right: Daily Story (Magazine Column Style) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative bg-white/5 border border-white/10 p-8 md:p-12 rounded-lg backdrop-blur-sm"
                    >
                        <div className="absolute top-0 right-0 p-6 text-[var(--accent-gold)] opacity-40">
                            <Feather size={32} />
                        </div>

                        <h4 className="font-serif text-2xl text-[var(--accent-gold)] mb-6">
                            {data?.story_title || 'Bugünün Hikayesi'}
                        </h4>

                        <p className="text-gray-300 font-light leading-loose text-lg font-serif">
                            {data?.story_content || 'Henüz bir hikaye eklenmedi...'}
                        </p>

                        <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-sm text-gray-500 font-sans tracking-wider uppercase">
                            <span>Zeynep'ten Notlar</span>
                            <span>{new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
