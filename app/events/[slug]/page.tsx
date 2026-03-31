
import React from 'react';
import MainLayout from "@/app/MainLayout";
import Footer from "@/app/components/Footer";
import EventDetailHero from "@/app/features/events/components/EventDetailHero";
import EventDetailContent from "@/app/features/events/components/EventDetailContent";
import EventRegistration from "@/app/features/events/components/EventRegistration";
import SiteContentBootstrap from "@/app/features/dashboard/components/SiteContentBootstrap";
import { buildFooterSiteContentPayload } from "@/app/lib/buildSiteContentBootstrapPayload";

export default async function EventDetailPage() {
  const siteContentPayload = await buildFooterSiteContentPayload();
  return (
    <MainLayout>
      <SiteContentBootstrap payload={siteContentPayload} />
      <EventDetailHero />
      <EventDetailContent />
      <EventRegistration />
      <Footer />
    </MainLayout>
  );
}
