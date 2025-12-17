"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles } from "lucide-react";

interface HiddenGiftModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HiddenGiftModal({ isOpen, onClose }: HiddenGiftModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4"
                    >
                        <div className="bg-[#0a0a0a]/90 border border-[var(--accent-gold)]/30 p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.15)] max-w-lg text-center relative pointer-events-auto overflow-hidden">

                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent opacity-50" />
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent-gold)]/10 rounded-full blur-3xl pointer-events-none" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex justify-center mb-6 text-[var(--accent-gold)]">
                                <Sparkles size={32} strokeWidth={1} className="animate-pulse" />
                            </div>

                            <h3 className="font-serif text-2xl md:text-3xl text-white mb-6 leading-relaxed">
                                "Hikâyelere verdiğin değer <br /> <span className="text-[var(--accent-gold)] italic">ilham verici</span>."
                            </h3>

                            <div className="w-16 h-[1px] bg-white/10 mx-auto mb-6" />

                            <p className="text-gray-400 font-light text-lg leading-relaxed mb-8">
                                Bu sayfa senin kadar <span className="text-white font-normal">sade</span> ve <span className="text-white font-normal">güçlü</span> olsun diye hazırlandı.
                            </p>

                            <div className="flex justify-center">
                                <Heart size={20} className="text-[var(--accent-gold)] fill-[var(--accent-gold)]/20" />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
