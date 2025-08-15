import React from "react";
import { SkipLink, Header, Footer } from "@/components";

export default function PropositionsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col" role="application" aria-label="Propositioner">
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
      <div className="w-full max-w-4xl px-4">
        <PageHeader />
        <ContentPlaceholder />
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
        Propositioner
      </h1>
      <p className="text-xl text-gray-600">
        Se och diskutera förslag som lagts fram
      </p>
    </div>
  );
}

function ContentPlaceholder() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="text-6xl mb-4">📋</div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Propositioner kommer snart
      </h2>
      <p className="text-gray-600">
        Denna sektion kommer att innehålla förslag och propositioner som användare kan diskutera och rösta på.
      </p>
    </div>
  );
}
