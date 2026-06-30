import About from "@/features/home/About";
import Contact from "@/features/home/Contact";
import Hero from "@/features/home/Hero";
import SelectedWork from "@/features/home/SelectedWork";
import SideProjects from "@/features/home/SideProjects";
import Toolkit from "@/features/home/Toolkit";
import Writing from "@/features/home/Writing";

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
