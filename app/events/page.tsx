import MainLayout from "@/app/MainLayout";
import EventsHeader from "@/app/features/events/components/EventsHeader";
import EventsList from "@/app/features/events/components/EventsList";
import Footer from "@/app/components/Footer";
import FigmaOverlay from "@/app/components/FigmaOverlay";
import SiteContentBootstrap from "@/app/features/dashboard/components/SiteContentBootstrap";
import { buildFooterSiteContentPayload } from "@/app/lib/buildSiteContentBootstrapPayload";

export default async function EventsPage() {
  const siteContentPayload = await buildFooterSiteContentPayload();
  return (
    <MainLayout>
      <SiteContentBootstrap payload={siteContentPayload} />
      <FigmaOverlay src="/images/figma-overlay.jpg" />
      <EventsHeader />
      <EventsList />
      <Footer />
    </MainLayout>
  );
}
