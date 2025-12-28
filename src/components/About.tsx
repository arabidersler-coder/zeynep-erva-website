"use client";

import { motion } from "framer-motion";

export default function About({ isOfficial = false }: { isOfficial?: boolean }) {
    return (
        <section className="py-32 px-4 md:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative text-center"
                >
                    {/* Minimalist Decoration */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[100px] pointer-events-none ${isOfficial ? 'bg-red-900/5' : 'bg-[var(--accent-gold)]/5'}`} />

                    <h2 className={`text-sm md:text-base font-serif mb-8 tracking-[0.3em] uppercase opacity-80 ${isOfficial ? 'text-red-500' : 'text-[var(--accent-gold)]'}`}>
                        {isOfficial ? "Kurumsal Profil" : "Hakkımda"}
                    </h2>

                    <p className="text-xl md:text-3xl text-white/90 leading-relaxed font-serif font-light">
                        {isOfficial ? (
                            <>
                                "Devlet geleneğine ve diplomatik nezakete bağlı kalarak,
                                <br />
                                kurumumuzu en üst düzeyde temsil etme bilinciyle;
                                <br />
                                <strong>iletişim, strateji ve protokol</strong> alanlarında hizmet vermekteyim."
                            </>
                        ) : (
                            <>
                                "Medya ve basın dünyasında, haberciliğin etik değerlerine bağlı kalarak
                                topluma doğru bilgiyi ulaştırmayı amaçlayan bir basın mensubu.
                                Her karenin ve her satırın bir hikâyesi olduğuna inanıyor,
                                bu hikâyelerin doğru bir akışla zamana iz bırakmasını sağlıyorum."
                            </>
                        )}
                    </p>

                    <div className="mt-16">
                        {/* Signature aesthetic */}
                        <p className={`font-serif italic text-3xl opacity-90 brightness-110 ${isOfficial ? 'text-red-600' : 'text-[var(--accent-gold)]'}`}>Zeynep Erva Cesur</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
