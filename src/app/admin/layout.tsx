"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, Briefcase, Building2, LogOut, X, Feather } from "lucide-react";

const navigation = [
    { name: 'Genel Bakış', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Galeri', href: '/admin/dashboard/gallery', icon: ImageIcon },
    { name: 'Kişisel (Zeynep)', href: '/admin/dashboard/personal', icon: Feather },
    { name: 'Deneyimler', href: '/admin/dashboard/timeline', icon: Briefcase },
    { name: 'Referanslar', href: '/admin/dashboard/references', icon: Building2 },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-[#09090b] text-white">

            {/* Mobile Header (Only visible on small screens) */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-[#09090b] sticky top-0 z-50 col-span-full">
                <h1 className="text-xl font-bold tracking-tight text-white"><span className="text-[var(--accent-gold)]">Erva</span> Admin</h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <LayoutDashboard className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-[220px] lg:w-[280px] bg-[#09090b] border-r border-zinc-800 transition-transform duration-300 ease-in-out md:static md:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="h-16 flex items-center px-6 border-b border-zinc-800">
                        <Link href="/" className="font-bold text-2xl tracking-tight">
                            Erva <span className="text-[var(--accent-gold)]">Admin</span>
                        </Link>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-sm font-medium ${isActive
                                        ? 'bg-zinc-800/50 text-[var(--accent-gold)] border border-zinc-700/50 shadow-sm'
                                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                        }`}
                                >
                                    <item.icon className={`w-4 h-4 ${isActive ? 'text-[var(--accent-gold)]' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Area */}
                    <div className="p-4 border-t border-zinc-800">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Çıkış Yap
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
