"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "admin@erva.com" && password === "admin") {
            router.push("/admin/dashboard");
        } else {
            alert("Hatalı giriş bilgileri!");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[var(--accent-gold)]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif text-white mb-2 tracking-tight">
                        Erva <span className="text-[var(--accent-gold)]">.</span>
                    </h1>
                    <p className="text-gray-500 text-sm tracking-widest uppercase">Yönetim Paneli</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">E-posta</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            placeholder="admin@erva.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">Şifre</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--accent-gold)] text-black font-semibold py-4 rounded-lg hover:bg-[#c5a028] transition-colors flex items-center justify-center gap-2 group"
                    >
                        <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Giriş Yap</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
