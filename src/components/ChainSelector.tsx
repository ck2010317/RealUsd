"use client";

import { useState, useRef, useEffect } from "react";
import { SUPPORTED_CHAINS, ChainInfo } from "@/config/chains";

interface ChainSelectorProps {
  selectedChainId: string;
  onSelect: (chain: ChainInfo) => void;
  label: string;
  excludeChainId?: string;
}

export function ChainSelector({ selectedChainId, onSelect, label, excludeChainId }: ChainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedChain = SUPPORTED_CHAINS.find((c) => c.chainId === selectedChainId);
  const filteredChains = SUPPORTED_CHAINS.filter((c) => c.chainId !== excludeChainId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 w-full px-3 py-2.5 bg-gray-800/60 border border-gray-700/50 rounded-xl hover:border-green-500/50 transition-all duration-200 text-left"
      >
        {selectedChain ? (
          <>
            <img
              src={selectedChain.icon}
              alt={selectedChain.name}
              className="w-6 h-6 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${selectedChain.name}&background=1a1a2e&color=22c55e&size=24`;
              }}
            />
            <span className="text-white font-medium text-sm">{selectedChain.name}</span>
          </>
        ) : (
          <span className="text-gray-500 text-sm">Select chain</span>
        )}
        <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
          <div className="max-h-64 overflow-y-auto scrollbar-thin">
            {filteredChains.map((chain) => (
              <button
                key={chain.chainId}
                onClick={() => {
                  onSelect(chain);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-800 transition-colors text-left ${
                  chain.chainId === selectedChainId ? "bg-green-500/10 border-l-2 border-green-500" : ""
                }`}
              >
                <img
                  src={chain.icon}
                  alt={chain.name}
                  className="w-6 h-6 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${chain.name}&background=1a1a2e&color=22c55e&size=24`;
                  }}
                />
                <span className="text-white text-sm font-medium">{chain.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
