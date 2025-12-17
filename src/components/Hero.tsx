"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    return (
        <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none mix-blend-soft-light" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[var(--accent-gold)]/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center z-10 space-y-6"
            >
                <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 0.7, letterSpacing: "0.5em" }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                    className="text-white/60 text-xs md:text-sm uppercase tracking-[0.5em] font-light"
                >
                    Basın Mensubu
                </motion.p>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-snug">
                    Zeynep Erva<br />
                    <span className="italic text-[var(--accent-gold)] brightness-110 drop-shadow-2xl">
                        Cesur
                    </span>
                </h1>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent mx-auto mt-8 opacity-70"
                />
            </motion.div>


        </section >
    );
}
