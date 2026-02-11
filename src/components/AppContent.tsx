"use client";

import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { SwapCard } from "@/components/SwapCard";

export default function AppContent() {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          {/* Hero */}
          <div className="text-center mb-8 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Cross-Chain Swaps,
              <br />
              <span className="text-green-400">Made Real.</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Swap any token across 12+ blockchains instantly.
              <br className="hidden sm:block" />
              Best rates. One click. No bridges needed.
            </p>
          </div>

          {/* Swap Card */}
          <div className="glow-green rounded-2xl">
            <SwapCard />
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 text-center max-w-lg w-full">
            <div>
              <div className="text-2xl font-bold text-white">12+</div>
              <div className="text-xs text-gray-500 mt-1">Chains</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">100+</div>
              <div className="text-xs text-gray-500 mt-1">Tokens</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">&lt;2min</div>
              <div className="text-xs text-gray-500 mt-1">Avg. Time</div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">R$</span>
              </div>
              <span className="text-sm text-gray-500">
                RealUSD © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://squidrouter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Squid Router
              </a>
              <a
                href="https://axelar.network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Axelar
              </a>
              <a
                href="https://axelarscan.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Explorer
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Providers>
  );
}
