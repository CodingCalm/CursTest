import React from "react";
import { SkipLink, Header, MainContent, Footer } from "@/components";

export default function HomePage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col" role="application" aria-label="Öppet samtal">
      <SkipLink />
      <Header />
      <MainContentWrapper />
      <Footer />
    </div>
  );
}

function MainContentWrapper() {
  return (
    <div 
      className="flex-1 bg-gray-50 flex justify-center items-center pt-8 pb-8" 
      role="region" 
      aria-label="Huvudinnehåll"
    >
      <MainContent />
    </div>
  );
}
