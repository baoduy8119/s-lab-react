
import React from 'react';
import MainLayout from "@/app/MainLayout";
import Footer from "@/app/components/Footer";
import EventDetailHero from "@/app/features/events/components/EventDetailHero";
import EventDetailContent from "@/app/features/events/components/EventDetailContent";
import EventRegistration from "@/app/features/events/components/EventRegistration";

export default function EventDetailPage() {
  return (
    <MainLayout>
      <EventDetailHero />
      <EventDetailContent />
      <EventRegistration />
      <Footer />
    </MainLayout>
  );
}
