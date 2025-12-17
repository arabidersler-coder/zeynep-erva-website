"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ReferenceItem {
    id: string;
    name: string;
    short_name: string;
}

export default function References() {
    const [references, setReferences] = useState<ReferenceItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data } = await supabase
                .from("references")
                .select("*")
                .order("created_at", { ascending: false });

            if (data) setReferences(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) return null;
    if (references.length === 0) return null;

    return (
        <section className="py-20 bg-black border-t border-white/5 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-sm font-light text-gray-500 uppercase tracking-[0.3em] mb-12"
                >
                    Çalıştığım Kurumlar
                </motion.p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-1000">
                    {references.map((ref, index) => (
                        <motion.div
                            key={ref.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 1 }}
                            className="group cursor-default"
                        >
                            {/* Logo Placeholder - Now with Gold hover */}
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-700 group-hover:text-[var(--accent-gold)] transition-colors duration-500 font-serif tracking-tighter">
                                {ref.short_name || ref.name}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
