"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PersonalNotes from "@/components/PersonalNotes";
import Timeline from "@/components/Timeline";
import References from "@/components/References";
import Gallery from "@/components/Gallery";
import Socials from "@/components/Socials";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          <Hero />
          <About />
          <PersonalNotes />
          <Timeline />
          <References />
          <Gallery />
          <Socials />
        </>
      )}
    </main>
  );
}
