"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Manifesto() {
    const [text, setText] = useState("Haber bir an, hikâye kalıcıdır · Basın etikle anlam kazanır · Her kare bir tanıklıktır · ");

    useEffect(() => {
        const fetchManifesto = async () => {
            const { data } = await supabase
                .from('personal_notes')
                .select('manifesto_text')
                .single();
            if (data?.manifesto_text) {
                // Ensure text ends with a separator if not present-ish
                const fetched = data.manifesto_text.trim();
                setText(fetched + (fetched.endsWith('·') ? ' ' : ' · '));
            }
        };
        fetchManifesto();
    }, []);

    // Duplicate content to ensure it covers screens of all sizes easily
    const content = Array(8).fill(text).join("");

    return (
        <section className="bg-[#050505] py-5 border-t border-white/5 border-b border-white/5 overflow-hidden relative z-20 w-full select-none">
            {/* Fade Gradients for visual softness */}
            <div className="absolute top-0 left-0 w-8 md:w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 md:w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <div className="flex w-fit pause-on-hover items-center">
                {/* 
                   We need TWO copies of the long content string to create the seamless loop.
                   The CSS animation slides the entire container by -50%. 
                   So when the first half finishes sliding out, the second half (which is identical) 
                   is exactly where the first one started. 
                */}
                <div className="animate-scroll whitespace-nowrap flex shrink-0">
                    <span className="text-[#C9A24D] text-sm md:text-base font-serif tracking-[0.25em] uppercase px-4 opacity-90 font-medium">
                        {content}
                    </span>
                </div>
                <div className="animate-scroll whitespace-nowrap flex shrink-0">
                    <span className="text-[#C9A24D] text-sm md:text-base font-serif tracking-[0.25em] uppercase px-4 opacity-90 font-medium">
                        {content}
                    </span>
                </div>
            </div>
        </section>
    );
}
