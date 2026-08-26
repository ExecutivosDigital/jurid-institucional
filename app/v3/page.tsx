import { Ecosystem } from "./components/sections/Ecosystem";
import { FinalCTA } from "./components/sections/FinalCTA";
import { Footer } from "./components/sections/Footer";
import { Hero } from "./components/sections/Hero";
import { Marquee } from "./components/sections/Marquee";
import { Nav } from "./components/sections/Nav";
import { PlatformIndex } from "./components/sections/PlatformIndex";
import { Promises } from "./components/sections/Promises";
import { Stats } from "./components/sections/Stats";
import { VideoShowcase } from "./components/sections/VideoShowcase";
import { VoiceShowcase } from "./components/sections/VoiceShowcase";

export default function V3Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <PlatformIndex />
        <Promises />
        <VideoShowcase />
        <Stats />
        <VoiceShowcase />
        <Ecosystem />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
