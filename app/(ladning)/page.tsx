import Navbar from "@/components/Navbar";
import CenterManagement from "./_components/feature/CenterManagement";
import ChatFunctionality from "./_components/feature/ChatFunctionality";

import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import MapPreview from "./_components/feature/MapPreview";
import Testimonials from "./_components/Testimonials";
import TutorDirectory from "./_components/TutorDirectory";
import { PartnershipSlider } from "./_components/partnershipSlider";
import FeaturesPage from "./_components/feature";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <FeaturesPage />
      {/* <Features /> */}
      <PartnershipSlider />
      {/* <MapPreview />
      <TutorDirectory />
      <ChatFunctionality />
      <CenterManagement /> */}
      <Testimonials />
      <Footer />
    </div>
  );
}
