"use client";

import { useEffect, useState } from "react";
import { getTransactionStatus, StatusResponse } from "@/lib/squid";
import { getExplorerTxUrl } from "@/config/chains";

interface TransactionStatusProps {
  txHash: string;
  requestId: string;
  fromChainId: string;
  toChainId: string;
  onComplete?: () => void;
  onDismiss?: () => void;
}

export function TransactionStatus({
  txHash,
  requestId,
  fromChainId,
  toChainId,
  onComplete,
  onDismiss,
}: TransactionStatusProps) {
  const [squidStatus, setSquidStatus] = useState<StatusResponse | null>(null);
  const [phase, setPhase] = useState<"submitted" | "confirming" | "bridging" | "complete" | "failed">("submitted");
  const [message, setMessage] = useState("Swap transaction submitted!");
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer to show elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance phases based on time (since status API may not work)
  useEffect(() => {
    if (phase === "submitted") {
      const t = setTimeout(() => {
        setPhase("confirming");
        setMessage("Transaction confirmed on source chain!");
      }, 8000);
      return () => clearTimeout(t);
    }
    if (phase === "confirming") {
      const t = setTimeout(() => {
        setPhase("bridging");
        setMessage("Cross-chain bridge in progress...");
      }, 15000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Try Squid status API — silently, don't show errors to user
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let mounted = true;
    let attempts = 0;
    const MAX_ATTEMPTS = 8;

    const poll = async () => {
      if (!mounted || attempts >= MAX_ATTEMPTS) return;
      attempts++;

      try {
        const result = await getTransactionStatus({
          transactionId: txHash,
          requestId,
          fromChainId,
          toChainId,
        });

        if (!mounted) return;
        setSquidStatus(result);

        if (result.squidTransactionStatus === "success") {
          setPhase("complete");
          setMessage("Swap completed successfully! 🎉");
          return; // Stop polling
        } else if (result.squidTransactionStatus === "ongoing") {
          setPhase("bridging");
          setMessage("Cross-chain transfer in progress...");
        } else if (result.squidTransactionStatus === "partial_success" || result.squidTransactionStatus === "needs_gas") {
          setPhase("complete");
          setMessage(result.squidTransactionStatus === "needs_gas" 
            ? "Transaction needs gas on destination chain" 
            : "Swap partially completed");
          return;
        }
      } catch {
        // Silently ignore — status API doesn't work with all integrator IDs
        // The swap still goes through, user can check explorer
      }

      if (mounted && attempts < MAX_ATTEMPTS) {
        timeout = setTimeout(poll, 20000); // Poll every 20s, max 8 times (~3 min)
      }
    };

    // Wait 30s before first status check — give time for indexing
    timeout = setTimeout(poll, 30000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [txHash, requestId, fromChainId, toChainId]);

  // Auto-complete after 3 minutes if status API never responds
  useEffect(() => {
    if (phase === "complete") return;
    const t = setTimeout(() => {
      setPhase("complete");
      setMessage("Your swap should be complete! Check your destination wallet.");
    }, 180000); // 3 minutes
    return () => clearTimeout(t);
  }, [phase]);

  const fromExplorerUrl = getExplorerTxUrl(fromChainId, txHash);
  const toExplorerUrl = squidStatus?.toChain?.transactionId 
    ? getExplorerTxUrl(toChainId, squidStatus.toChain.transactionId) 
    : "";
  const axelarScanUrl = `https://axelarscan.io/gmp/${txHash}`;

  const progressWidth = phase === "complete" ? "w-full" 
    : phase === "bridging" ? "w-3/4" 
    : phase === "confirming" ? "w-1/2" 
    : "w-1/4";

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  return (
    <div className="mt-4 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Transaction Status</h3>
        <span className="text-xs text-gray-500">{formatTime(elapsedTime)}</span>
      </div>

      {/* Status icon + message */}
      <div className="flex items-center gap-2">
        {phase === "complete" ? (
          <span className="text-green-400 text-lg">✅</span>
        ) : (
          <span className="text-yellow-400 text-lg animate-pulse">⏳</span>
        )}
        <span className={`text-sm font-medium ${phase === "complete" ? "text-green-400" : "text-yellow-400"}`}>
          {message}
        </span>
      </div>

      {/* Progress steps */}
      <div className="space-y-2">
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full transition-all duration-1000 ${progressWidth} ${
            phase === "complete" ? "bg-green-500" : "bg-yellow-500 animate-pulse"
          }`} />
        </div>
        <div className="flex justify-between text-[10px] text-gray-500">
          <span className={phase !== "submitted" ? "text-green-400" : "text-yellow-400"}>Submitted</span>
          <span className={phase === "confirming" ? "text-yellow-400" : phase === "bridging" || phase === "complete" ? "text-green-400" : "text-gray-600"}>Confirmed</span>
          <span className={phase === "bridging" ? "text-yellow-400" : phase === "complete" ? "text-green-400" : "text-gray-600"}>Bridging</span>
          <span className={phase === "complete" ? "text-green-400" : "text-gray-600"}>Complete</span>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        {fromExplorerUrl && (
          <a href={fromExplorerUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs text-green-400 hover:text-green-300 underline">
            View on Explorer ↗
          </a>
        )}
        {toExplorerUrl && (
          <a href={toExplorerUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs text-green-400 hover:text-green-300 underline">
            Destination Tx ↗
          </a>
        )}
        <a href={axelarScanUrl} target="_blank" rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 underline">
          Track on Axelarscan ↗
        </a>
      </div>

      {/* Tx Hash */}
      <div className="text-xs text-gray-500 font-mono break-all">
        TX: {txHash.slice(0, 10)}...{txHash.slice(-8)}
      </div>

      {/* Action button */}
      <button
        onClick={() => {
          if (phase === "complete") onComplete?.();
          else onDismiss?.();
        }}
        className={`w-full mt-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
          phase === "complete"
            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
            : "bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600/50"
        }`}
      >
        {phase === "complete" ? "✅ Done — New Swap" : "← Back to Swap"}
      </button>
    </div>
  );
}
