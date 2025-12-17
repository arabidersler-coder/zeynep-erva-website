"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 1000); // Allow exit animation to finish
        }, 3500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
                    exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                >
                    {/* Background Ambience */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-gold)]/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center gap-8">
                        {/* Image Container with Elegant Reveal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                        >
                            <Image
                                src="/erva-splash.jpg"
                                alt="Zeynep Erva Cesur"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Text Reveal */}
                        <div className="text-center space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="text-3xl md:text-5xl font-serif text-white tracking-wide"
                            >
                                Zeynep Erva <span className="text-[var(--accent-gold)] italic">Cesur</span>
                            </motion.h1>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100px" }}
                                transition={{ delay: 1.2, duration: 1 }}
                                className="h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent mx-auto"
                            />

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                transition={{ delay: 1.5, duration: 1 }}
                                className="text-sm md:text-base text-gray-400 font-light tracking-[0.2em] uppercase"
                            >
                                Dünyasına Hoş Geldiniz
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
