import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InfoSection from "@/components/InfoSection";
import QuickActions from "@/components/QuickActions";
import StateSection from "@/components/StateSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StateSection />
        <QuickActions />
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
