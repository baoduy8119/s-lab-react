"use client";

import React from "react";
import LeftMenu from "./components/LeftMenu";
import MobileHeader from "./components/MobileHeader";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-[#F3F4F6]">
      {/* Mobile Header - Visible only on mobile */}
      <div className="block lg:hidden w-full sticky top-0 z-50">
        <MobileHeader />
      </div>

      {/* Left Menu - Fixed Sidebar (Desktop only) */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen z-50">
        <LeftMenu />
      </div>

      {/* Main Content Area */}
      {/* Mobile: Full width, no left margin */}
      {/* Desktop: ml-[360px] to account for fixed sidebar */}
      <div className="flex-1 w-full overflow-x-hidden ml-0 lg:ml-[360px]">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
