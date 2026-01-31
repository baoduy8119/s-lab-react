import Hero from '../features/s-library/components/Hero';
import BestForYou from '../features/s-library/components/BestForYou';
import LibrarySystem from '../features/s-library/components/LibrarySystem';
import FAQ from '../features/s-library/components/FAQ';
import Footer from '../components/Footer';
import MainLayout from '@/app/MainLayout';

export default function SLibraryPage() {
  return (
    <MainLayout>
      <Hero />
      <BestForYou />
      <LibrarySystem />
      <FAQ />
      <Footer />
    </MainLayout>
  );
}
