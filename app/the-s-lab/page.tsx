import LeftMenu from "../components/LeftMenu";
import AdvisorsCredentials from "../features/the-s-lab/components/AdvisorsCredentials";
import CTABanner from "../features/the-s-lab/components/CTABanner";
import Hero from "../features/the-s-lab/components/Hero";
import KeyActivities from "../features/the-s-lab/components/KeyActivities";
import LimitlessDesire from "../features/the-s-lab/components/LimitlessDesire";
import TheSlabFooter from "../features/the-s-lab/components/TheSlabFooter";
import Trainers from "../features/the-s-lab/components/Trainers";

export default function TheSlabPage() {
  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      {/* Left Menu - Fixed Sidebar */}
      <LeftMenu />

      {/* Main Content - Offset by sidebar width, always full width */}
      <div className="ml-[360px] flex-1 w-full">
        <Hero />
        <LimitlessDesire />
        <KeyActivities />
        <Trainers />
        <AdvisorsCredentials />
        <CTABanner />
        <TheSlabFooter />
      </div>
    </div>
  );
}
