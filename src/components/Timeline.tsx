"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface TimelineItem {
    id: string;
    year: string;
    title: string;
    company: string;
    description: string;
    type: string;
}

export default function Timeline() {
    const [experiences, setExperiences] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data } = await supabase
                .from("timeline")
                .select("*")
                .order("created_at", { ascending: false });

            if (data) setExperiences(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) return null; // Or a loading skeleton
    if (experiences.length === 0) return null; // Don't show section if empty

    return (
        <section className="py-24 px-4 bg-black/95 relative z-10 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-serif text-white/90 mb-4 tracking-wide">
                        Deneyim & Eğitim
                    </h2>
                    <div className="h-0.5 w-16 bg-gray-700 mx-auto" />
                </motion.div>

                <div className="relative pl-8 md:pl-0">
                    {/* Vertical Line - Thinner & More Subtle */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2" />

                    <div className="space-y-24">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Dot - Minimalist Gold */}
                                <div className="absolute left-[-4px] md:left-1/2 top-2 w-2 h-2 bg-[var(--accent-gold)] rounded-full md:-translate-x-[4px] shadow-[0_0_10px_var(--accent-gold)]" />

                                <div className="flex-1 md:w-1/2 text-right hidden md:block" />

                                <div className="flex-1 md:w-1/2">
                                    <div className={`transition-all duration-500 hover:translate-x-2 ${index % 2 === 0 ? "md:text-right md:hover:-translate-x-2 md:hover:translate-x-0" : ""
                                        }`}>
                                        <span className="text-xs font-medium text-[var(--accent-gold)] tracking-widest uppercase block mb-3 opacity-80">
                                            {exp.year}
                                        </span>
                                        <h3 className="text-2xl font-serif text-white mb-2">{exp.title}</h3>
                                        <p className="text-sm text-gray-400 font-medium mb-4 uppercase tracking-wider">{exp.company}</p>
                                        <p className="text-gray-400 font-light leading-loose text-sm opacity-80">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
