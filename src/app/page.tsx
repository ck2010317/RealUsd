"use client";

import dynamic from "next/dynamic";

// Dynamic import Providers to avoid SSR localStorage issues with WalletConnect
const AppContent = dynamic(() => import("@/components/AppContent"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center animate-pulse">
          <span className="text-white font-bold text-lg">R$</span>
        </div>
        <span className="text-gray-400 text-sm">Loading RealUSD...</span>
      </div>
    </div>
  ),
});

export default function Home() {
  return <AppContent />;
}
