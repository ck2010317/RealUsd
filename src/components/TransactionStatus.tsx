"use client";

import { useEffect, useState, useRef } from "react";
import { getTransactionStatus, StatusResponse } from "@/lib/squid";
import { getExplorerTxUrl } from "@/config/chains";

interface TransactionStatusProps {
  txHash: string;
  requestId: string;
  fromChainId: string;
  toChainId: string;
  onComplete?: () => void;
}

const STATUS_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  ongoing: { label: "Processing", color: "text-yellow-400", icon: "⏳" },
  success: { label: "Completed", color: "text-green-400", icon: "✅" },
  partial_success: { label: "Partial Success", color: "text-orange-400", icon: "⚠️" },
  needs_gas: { label: "Needs Gas", color: "text-red-400", icon: "⛽" },
  not_found: { label: "Not Found", color: "text-gray-400", icon: "❓" },
};

export function TransactionStatus({
  txHash,
  requestId,
  fromChainId,
  toChainId,
  onComplete,
}: TransactionStatusProps) {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [error, setError] = useState<string>("");
  const retryCountRef = useRef(0);
  const consecutiveErrorsRef = useRef(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let mounted = true;

    const BASE_INTERVAL = 15000; // 15 seconds base polling
    const MAX_INTERVAL = 120000; // 2 minutes max
    const MAX_RETRIES = 40; // ~10 minutes of polling

    // Initial delay — cross-chain txs take time to index
    const INITIAL_DELAY = 20000; // Wait 20s before first poll

    const getNextInterval = () => {
      const errors = consecutiveErrorsRef.current;
      if (errors === 0) return BASE_INTERVAL;
      // Exponential backoff: 15s, 30s, 60s, 120s
      return Math.min(BASE_INTERVAL * Math.pow(2, errors), MAX_INTERVAL);
    };

    const poll = async () => {
      if (!mounted) return;

      try {
        const result = await getTransactionStatus({
          transactionId: txHash,
          requestId,
          fromChainId,
          toChainId,
        });

        if (!mounted) return;
        setStatus(result);
        setError("");
        consecutiveErrorsRef.current = 0;

        const completedStatuses = ["success", "partial_success", "needs_gas"];
        if (completedStatuses.includes(result.squidTransactionStatus)) {
          onComplete?.();
          return; // Stop polling
        }
      } catch (err: unknown) {
        if (!mounted) return;
        consecutiveErrorsRef.current++;
        retryCountRef.current++;

        const isAxiosError = typeof err === "object" && err !== null && "response" in err;
        const status = isAxiosError
          ? (err as { response?: { status?: number } }).response?.status
          : undefined;

        if (status === 404) {
          // Transaction not indexed yet — normal for cross-chain, keep polling silently
          if (retryCountRef.current <= 10) {
            setError("Waiting for transaction to be indexed...");
          } else if (retryCountRef.current >= MAX_RETRIES) {
            setError("Transaction not found. Check the explorer links below.");
            return; // Stop polling
          } else {
            setError("Still waiting for indexing. This can take a few minutes...");
          }
        } else if (status === 429) {
          setError("Rate limited. Backing off...");
        } else {
          if (retryCountRef.current >= MAX_RETRIES) {
            setError("Status check timed out. Check explorer links below.");
            return; // Stop polling
          }
          setError("Checking status...");
        }
      }

      // Schedule next poll with backoff
      if (mounted) {
        const interval = getNextInterval();
        timeout = setTimeout(poll, interval);
      }
    };

    // Wait before first poll to give the transaction time to be indexed
    timeout = setTimeout(poll, INITIAL_DELAY);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [txHash, requestId, fromChainId, toChainId, onComplete]);

  const statusInfo = status ? STATUS_LABELS[status.squidTransactionStatus] || STATUS_LABELS.ongoing : null;
  const fromExplorerUrl = getExplorerTxUrl(fromChainId, txHash);
  const toExplorerUrl =
    status?.toChain?.transactionId ? getExplorerTxUrl(toChainId, status.toChain.transactionId) : "";
  const axelarScanUrl = `https://axelarscan.io/gmp/${txHash}`;

  return (
    <div className="mt-4 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Transaction Status</h3>
        {statusInfo && (
          <span className={`text-sm font-medium ${statusInfo.color}`}>
            {statusInfo.icon} {statusInfo.label}
          </span>
        )}
        {!statusInfo && !error && (
          <span className="text-sm text-yellow-400">
            <span className="animate-pulse">⏳</span> Waiting...
          </span>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {/* Progress bar */}
      <div className="w-full bg-gray-700 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-1000 ${
            status?.squidTransactionStatus === "success"
              ? "bg-green-500 w-full"
              : status?.squidTransactionStatus === "ongoing"
                ? "bg-yellow-500 w-2/3 animate-pulse"
                : "bg-gray-500 w-1/3 animate-pulse"
          }`}
        />
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        {fromExplorerUrl && (
          <a
            href={fromExplorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-400 hover:text-green-300 underline"
          >
            Source Tx ↗
          </a>
        )}
        {toExplorerUrl && (
          <a
            href={toExplorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-400 hover:text-green-300 underline"
          >
            Destination Tx ↗
          </a>
        )}
        <a
          href={axelarScanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 underline"
        >
          Axelarscan ↗
        </a>
      </div>

      {/* Tx Hash */}
      <div className="text-xs text-gray-500 font-mono break-all">
        TX: {txHash.slice(0, 10)}...{txHash.slice(-8)}
      </div>
    </div>
  );
}
