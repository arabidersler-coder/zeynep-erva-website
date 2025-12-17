"use client";

import { useState, useRef, useEffect } from "react";
import { Headphones, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            // Fade out logic could go here
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            // Fade in logic
            audioRef.current.volume = 0.2; // Verify low volume
            audioRef.current.play().catch(e => console.log("Audio play failed", e));
            setIsPlaying(true);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <audio ref={audioRef} loop src="/music/ambient.mp3" />

            <motion.button
                onClick={togglePlay}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 }}
                className={`
                    group flex items-center gap-3 px-4 py-3 rounded-full 
                    backdrop-blur-md border transition-all duration-500
                    ${isPlaying
                        ? "bg-[var(--accent-gold)]/10 border-[var(--accent-gold)]/30 text-[var(--accent-gold)]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                    }
                `}
            >
                <div className="relative">
                    {isPlaying ? (
                        <Volume2 size={18} className="animate-pulse" />
                    ) : (
                        <Headphones size={18} />
                    )}
                    {isPlaying && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent-gold)] rounded-full animate-ping" />
                    )}
                </div>

                <span className={`text-xs font-medium tracking-wider uppercase transition-all duration-300 ${isPlaying ? 'text-[var(--accent-gold)]' : 'group-hover:text-white'}`}>
                    {isPlaying ? "Müzik Açık" : "Müzikle Gez"}
                </span>
            </motion.button>
        </div>
    );
}
