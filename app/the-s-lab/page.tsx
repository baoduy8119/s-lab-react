import MainLayout from "@/app/MainLayout";
import AdvisorsCredentials from "../features/the-s-lab/components/AdvisorsCredentials";
import CTABanner from "../features/the-s-lab/components/CTABanner";
import Hero from "../features/the-s-lab/components/Hero";
import KeyActivities from "../features/the-s-lab/components/KeyActivities";
import LimitlessDesire from "../features/the-s-lab/components/LimitlessDesire";
import TheSlabFooter from "../features/the-s-lab/components/TheSlabFooter";
import Trainers from "../features/the-s-lab/components/Trainers";

export default function TheSlabPage() {
  return (
    <MainLayout>
      <Hero />
      <LimitlessDesire />
      <KeyActivities />
      <Trainers />
      <AdvisorsCredentials />
      <CTABanner />
      <TheSlabFooter />
    </MainLayout>
  );
}
