import About from "@/features/home/components/About";
import Contact from "@/features/home/components/Contact";
import Hero from "@/features/home/components/Hero";
import SelectedWork from "@/features/home/components/SelectedWork";
import SideProjects from "@/features/home/components/SideProjects";
import Toolkit from "@/features/home/components/Toolkit";
import Writing from "@/features/home/components/Writing";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <SideProjects />
      <About />
      <Toolkit />
      <Writing />
      <Contact />
    </>
  );
}
