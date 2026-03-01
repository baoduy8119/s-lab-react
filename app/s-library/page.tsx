import Hero from '../features/s-library/components/Hero';
import BestForYou from '../features/s-library/components/BestForYou';
import LibrarySystem from '../features/s-library/components/LibrarySystem';
import FAQ from '../features/s-library/components/FAQ';
import Footer from '../components/Footer';
import MainLayout from '@/app/MainLayout';
import ContentHydrator from '@/app/features/dashboard/components/ContentHydrator';
import SLibraryContentHydrator from '@/app/features/dashboard/components/SLibraryContentHydrator';

export default function SLibraryPage() {
  return (
    <MainLayout>
      <ContentHydrator />
      <SLibraryContentHydrator />
      <Hero />
      <BestForYou />
      <LibrarySystem />
      <FAQ />
      <Footer />
    </MainLayout>
  );
}
