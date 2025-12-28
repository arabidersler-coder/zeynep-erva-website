"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero({ isOfficial = false }: { isOfficial?: boolean }) {
    return (
        <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">

            {/* Background Image - Cinematic Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/80 z-10" /> {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" /> {/* Vertical Vignette */}
                <motion.img
                    src="/hero-portrait.jpg"
                    alt="Zeynep Erva Cesur"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: isOfficial ? 0.2 : 0.4, scale: 1.05 }} // Darker in official mode
                    transition={{ duration: 2, ease: "easeOut" }}
                    className={`w-full h-full object-cover object-top ${isOfficial ? 'grayscale' : ''}`} // B&W in official mode
                />
            </div>

            {/* Background Ambience - Dynamic Colors */}
            <div className={`absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none mix-blend-soft-light z-20 ${isOfficial ? 'bg-red-900/20' : 'bg-white/5'}`} />
            <div className={`absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none mix-blend-screen z-20 ${isOfficial ? 'bg-red-600/10' : 'bg-[var(--accent-gold)]/5'}`} />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center z-10 space-y-6"
            >
                <div className="flex flex-col items-center gap-2">
                    {isOfficial && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-red-600/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                        >
                            Türkiye Cumhuriyeti
                        </motion.div>
                    )}
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        animate={{ opacity: 0.7, letterSpacing: "0.5em" }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        className="text-white/60 text-xs md:text-sm uppercase tracking-[0.5em] font-light"
                    >
                        {isOfficial ? "Dışişleri Bakanlığı" : "Basın Mensubu"}
                    </motion.p>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-snug">
                    Zeynep Erva<br />
                    <span className={`italic brightness-110 drop-shadow-2xl ${isOfficial ? 'text-red-600' : 'text-[var(--accent-gold)]'}`}>
                        Cesur
                    </span>
                </h1>

                {isOfficial && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 1.5 }}
                        className="text-white/80 font-serif italic text-lg mt-2"
                    >
                        Özel Kalem
                    </motion.p>
                )}

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className={`h-[1px] mx-auto mt-8 opacity-70 ${isOfficial ? 'bg-gradient-to-r from-transparent via-red-600 to-transparent' : 'bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent'}`}
                />
            </motion.div>


        </section >
    );
}
