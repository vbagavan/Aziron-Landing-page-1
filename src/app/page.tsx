import Navbar       from "@/components/Navbar";
import Hero         from "@/components/Hero";
import HowItWorks   from "@/components/HowItWorks";
import UseCases     from "@/components/UseCases";
import Differentiators from "@/components/Differentiators";
import SeeItInAction from "@/components/SeeItInAction";
import ProblemStatement from "@/components/ProblemStatement";
import PlatformCapabilities from "@/components/PlatformCapabilities";
import FinalCTA from "@/components/FinalCTA";
import Footer       from "@/components/Footer";

export default function Home() {
  return (
    <main className="font-sans bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <SeeItInAction />
      <ProblemStatement />
      <PlatformCapabilities />
      <UseCases />
      <Differentiators />
      <FinalCTA />
      <Footer />
    </main>
  );
}
