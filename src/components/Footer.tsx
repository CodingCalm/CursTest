import React from "react";

export default function Footer(): React.JSX.Element {
  return (
    <footer className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-sm" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h2 className="sr-only">Sidfot</h2>
          <div className="text-center">
            <p className="text-sm text-gray-600">© 2024 CursTest. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
