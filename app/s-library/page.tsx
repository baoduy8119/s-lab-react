import LeftMenu from '../components/LeftMenu';
import Hero from '../features/s-library/components/Hero';
import BestForYou from '../features/s-library/components/BestForYou';
import LibrarySystem from '../features/s-library/components/LibrarySystem';
import FAQ from '../features/s-library/components/FAQ';
import Footer from '../components/Footer';

export default function SLibraryPage() {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* Left Menu - Fixed Sidebar */}
      <LeftMenu />

      {/* Main Content - Offset by sidebar width */}
      <div className="ml-[360px] flex-1 bg-[#F3F4F6] overflow-x-hidden">
        <Hero />
        <BestForYou />
        <LibrarySystem />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}
