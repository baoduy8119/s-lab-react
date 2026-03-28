import MainLayout from "@/app/MainLayout";
import AdvisorsCredentials from "../features/the-s-lab/components/AdvisorsCredentials";
import CTABanner from "../features/the-s-lab/components/CTABanner";
import Hero from "../features/the-s-lab/components/Hero";
import KeyActivities from "../features/the-s-lab/components/KeyActivities";
import LimitlessDesire from "../features/the-s-lab/components/LimitlessDesire";
import TheSlabFooter from "../features/the-s-lab/components/TheSlabFooter";
import Trainers from "../features/the-s-lab/components/Trainers";
import ContentHydrator from "@/app/features/dashboard/components/ContentHydrator";
import TheSlabContentHydrator from "@/app/features/dashboard/components/TheSlabContentHydrator";
import SiteContentBootstrap from "@/app/features/dashboard/components/SiteContentBootstrap";
import { buildTheSlabSiteContentPayload } from "@/app/lib/buildSiteContentBootstrapPayload";

export default async function TheSlabPage() {
  const siteContentPayload = await buildTheSlabSiteContentPayload();
  return (
    <MainLayout>
      <SiteContentBootstrap payload={siteContentPayload} />
      <ContentHydrator />
      <TheSlabContentHydrator />
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
