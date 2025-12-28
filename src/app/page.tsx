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
import Manifesto from "@/components/Manifesto";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function HomeContent() {
  const [showSplash, setShowSplash] = useState(true);
  const searchParams = useSearchParams();
  const isOfficial = searchParams.get('mode') === 'official';

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          <Hero isOfficial={isOfficial} />
          <About />
          {!isOfficial && <PersonalNotes />}
          <Timeline />
          <References />
          <Gallery />
          {!isOfficial && <Manifesto />}
          <Socials />
        </>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
