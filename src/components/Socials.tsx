"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import HiddenGiftModal from "./HiddenGiftModal";

export default function Socials() {
    const [isGiftOpen, setIsGiftOpen] = useState(false);
    const [activeTooltip, setActiveTooltip] = useState<'none' | 'zeynep' | 'developer'>('none');

    const toggleTooltip = (name: 'zeynep' | 'developer') => {
        setActiveTooltip(prev => prev === name ? 'none' : name);
    };

    return (
        <section className="py-24 relative z-10 border-t border-white/5" onClick={() => setActiveTooltip('none')}>
            <HiddenGiftModal isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} />

            <div className="max-w-4xl mx-auto text-center px-4" onClick={(e) => e.stopPropagation()}>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 font-serif text-lg md:text-xl text-[var(--accent-gold)] tracking-[0.2em] uppercase opacity-80"
                >
                    Çok Yakında, Yeni Hikayelerle...
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center items-center gap-10"
                >
                    <Link
                        href="https://instagram.com/z.ervacesur"
                        target="_blank"
                        className="group relative"
                    >
                        <div className="absolute -inset-4 bg-[var(--accent-gold)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Instagram className="w-6 h-6 text-gray-500 group-hover:text-[var(--accent-gold)] transition-colors duration-300 relative z-10" />
                        <span className="sr-only">Instagram</span>
                    </Link>

                    <Link
                        href="#"
                        className="group relative"
                    >
                        <div className="absolute -inset-4 bg-[var(--accent-gold)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Twitter className="w-6 h-6 text-gray-500 group-hover:text-[var(--accent-gold)] transition-colors duration-300 relative z-10" />
                        <span className="sr-only">Twitter</span>
                    </Link>

                    <Link
                        href="mailto:iletisim@zeyneperva.com"
                        className="group relative"
                    >
                        <div className="absolute -inset-4 bg-[var(--accent-gold)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Mail className="w-6 h-6 text-gray-500 group-hover:text-[var(--accent-gold)] transition-colors duration-300 relative z-10" />
                        <span className="sr-only">Email</span>
                    </Link>
                </motion.div>

                <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-600 font-light border-t border-white/5 pt-8">
                    <div
                        className="relative group inline-block"
                        onClick={() => toggleTooltip('zeynep')}
                    >
                        <span className="text-[var(--accent-gold)] font-medium tracking-wide brightness-125 cursor-pointer select-none">
                            {new Date().getFullYear()} Zeynep Erva Cesur
                        </span>

                        {/* Hidden Message Tooltip */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[250px] transition-all duration-500 transform z-50 pointer-events-none
                            ${activeTooltip === 'zeynep' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'}
                        `}>
                            <div className="bg-[#0a0a0a]/90 backdrop-blur-md border border-[var(--accent-gold)]/20 rounded-xl p-4 shadow-[0_0_30px_rgba(212,175,55,0.1)] text-center">
                                <p className="text-gray-300 text-xs font-serif leading-relaxed italic">
                                    "Bu site, hikâyelere inanan bir basın mensubu için hazırlandı."
                                </p>
                                <div className="mt-2 text-[10px] text-[var(--accent-gold)] tracking-widest uppercase border-t border-white/5 pt-2 flex items-center justify-center gap-1">
                                    <span>Talha'dan</span> <span>💛</span>
                                </div>
                                <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a] border-r border-b border-[var(--accent-gold)]/20 rotate-45 transform" />
                            </div>
                        </div>
                    </div>

                    {/* Developer Credit & Tooltip */}
                    <div
                        className="relative group"
                        onClick={() => toggleTooltip('developer')}
                    >
                        <div className="flex items-center gap-2 cursor-pointer hover:text-[var(--accent-gold)] transition-colors duration-300 select-none">
                            <span className="opacity-50">&lt; / &gt;</span>
                            <span>Developed by</span>
                            <span className="font-medium text-gray-400 group-hover:text-white transition-colors">Talha Çalargün</span>
                        </div>

                        {/* Hover Card */}
                        <div className={`absolute bottom-full right-1/2 translate-x-1/2 mb-4 w-72 transition-all duration-300 transform z-50
                            ${activeTooltip === 'developer' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'}
                        `}>
                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                                {/* Glow Effect */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent opacity-50" />

                                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                                    <div className="w-20 h-20 rounded-full border-2 border-[var(--accent-gold)]/30 p-1">
                                        <div className="w-full h-full rounded-full bg-zinc-900 overflow-hidden relative">
                                            <img
                                                src="/developer-profile.jpg"
                                                alt="Talha Çalargün"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-medium text-lg">Talha Çalargün</h4>
                                        <p className="text-[10px] text-[var(--accent-gold)] uppercase tracking-wider mt-1">
                                            Digital Systems & Technology Developer
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-2">
                                        <a href="https://www.linkedin.com/in/talhaemrecalargun/" target="_blank" className="text-gray-500 hover:text-[var(--accent-gold)] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                                        </a>
                                        <a href="https://www.instagram.com/talhacalargun/" target="_blank" className="text-gray-500 hover:text-[var(--accent-gold)] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                                        </a>
                                        <a href="https://api.whatsapp.com/send/?phone=905372939874&text&type=phone_number&app_absent=0" target="_blank" className="text-gray-500 hover:text-[var(--accent-gold)] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.12 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                        </a>
                                        <a href="https://talhacalargun.com" target="_blank" className="text-gray-500 hover:text-[var(--accent-gold)] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Triangle/Arrow */}
                            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a] border-r border-b border-white/10 rotate-45 transform" />
                        </div>
                    </div>
                </div>

                {/* Hidden Gift Trigger */}
                <div className="flex justify-center mt-12 pb-8">
                    <button
                        onClick={() => setIsGiftOpen(true)}
                        className="text-[10px] text-gray-800 hover:text-gray-500 transition-colors duration-500 tracking-widest uppercase opacity-20 hover:opacity-100"
                    >
                        Bu site bir hediyedir
                    </button>
                </div>
            </div>
        </section>
    );
}
