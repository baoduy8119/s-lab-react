import MainLayout from "@/app/MainLayout";
import EventsHeader from "@/app/features/events/components/EventsHeader";
import EventsList from "@/app/features/events/components/EventsList";
import Footer from "@/app/components/Footer";
import FigmaOverlay from "@/app/components/FigmaOverlay";

export default function EventsPage() {
  return (
    <MainLayout>
      <FigmaOverlay src="/images/figma-overlay.jpg" />
      <EventsHeader />
      <EventsList />
      <Footer />
    </MainLayout>
  );
}
