'use client';

import AboutHero from "@/components/about/hero";
import MissionVision from "@/components/about/missionandvission";
import WhyChooseUs from "@/components/about/whychooseus";
import Navbar from "@/components/layout/navbar";



export default function Home() {
  return (
    <main>
    <Navbar/>
    <AboutHero/>
    <MissionVision/>
    <WhyChooseUs/>
    </main>
  )
}
