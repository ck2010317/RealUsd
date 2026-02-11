"use client";

import { useState, useRef, useEffect } from "react";
import { TokenInfo, getTokensForChain } from "@/config/chains";

interface TokenSelectorProps {
  chainId: string;
  selectedToken: TokenInfo | null;
  onSelect: (token: TokenInfo) => void;
  label: string;
}

export function TokenSelector({ chainId, selectedToken, onSelect, label }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tokens = getTokensForChain(chainId);
  const filteredTokens = tokens.filter(
    (t) =>
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.address.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset token when chain changes
  useEffect(() => {
    if (selectedToken && selectedToken.chainId !== chainId) {
      // Auto-select first token when chain changes
      const chainTokens = getTokensForChain(chainId);
      if (chainTokens.length > 0) {
        onSelect(chainTokens[0]);
      }
    }
  }, [chainId, selectedToken, onSelect]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 w-full px-3 py-2.5 bg-gray-800/60 border border-gray-700/50 rounded-xl hover:border-green-500/50 transition-all duration-200 text-left"
      >
        {selectedToken ? (
          <>
            <img
              src={selectedToken.logoURI}
              alt={selectedToken.symbol}
              className="w-6 h-6 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${selectedToken.symbol}&background=1a1a2e&color=22c55e&size=24`;
              }}
            />
            <div className="flex flex-col">
              <span className="text-white font-medium text-sm">{selectedToken.symbol}</span>
              <span className="text-gray-500 text-xs">{selectedToken.name}</span>
            </div>
          </>
        ) : (
          <span className="text-gray-500 text-sm">Select token</span>
        )}
        <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
          <div className="p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search token or paste address..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500/50"
              autoFocus
            />
          </div>
          <div className="max-h-64 overflow-y-auto scrollbar-thin">
            {filteredTokens.length === 0 ? (
              <div className="px-3 py-4 text-center text-gray-500 text-sm">No tokens found</div>
            ) : (
              filteredTokens.map((token) => (
                <button
                  key={`${token.chainId}-${token.address}`}
                  onClick={() => {
                    onSelect(token);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-800 transition-colors text-left ${
                    selectedToken?.address === token.address ? "bg-green-500/10 border-l-2 border-green-500" : ""
                  }`}
                >
                  <img
                    src={token.logoURI}
                    alt={token.symbol}
                    className="w-7 h-7 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${token.symbol}&background=1a1a2e&color=22c55e&size=28`;
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-sm">{token.symbol}</span>
                    <span className="text-gray-500 text-xs">{token.name}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
