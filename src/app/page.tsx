import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import BookIntro from "@/components/sections/BookIntro";
import SceneTwo from "@/components/sections/SceneTwo";
import SceneThree from "@/components/sections/SceneThree";
import SceneFour from "@/components/sections/SceneFour";
import SceneFive from "@/components/sections/SceneFive";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BookIntro />
      <SceneTwo />
      <SceneThree />
      <SceneFour />
      <SceneFive />
      <FinalCTA />
      <Footer />
    </>
  );
}
