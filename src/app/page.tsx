import React from "react";
import { SkipLink, Header, MainContent, Footer } from "@/components";

export default function HomePage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col" role="application" aria-label="Huvudsida">
      <SkipLink />
      <Header />
      <div className="flex-1 bg-gray-50 flex justify-center items-center pt-8 pb-8" role="region" aria-label="Huvudinnehåll">
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}
