"use client";

import { useEffect, useState, useCallback } from "react";
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
  const [retryCount, setRetryCount] = useState(0);

  const checkStatus = useCallback(async () => {
    try {
      const result = await getTransactionStatus({
        transactionId: txHash,
        requestId,
        fromChainId,
        toChainId,
      });
      setStatus(result);
      setError("");

      const completedStatuses = ["success", "partial_success", "needs_gas"];
      if (completedStatuses.includes(result.squidTransactionStatus)) {
        onComplete?.();
        return true;
      }
      return false;
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as Record<string, unknown>).response === "object" &&
        (err as Record<string, Record<string, unknown>>).response?.status === 404
      ) {
        setRetryCount((c) => c + 1);
        if (retryCount >= 20) {
          setError("Transaction not found after multiple retries.");
          return true;
        }
        return false;
      }
      setError("Failed to check status. Will retry...");
      return false;
    }
  }, [txHash, requestId, fromChainId, toChainId, retryCount, onComplete]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let mounted = true;

    const poll = async () => {
      const done = await checkStatus();
      if (mounted && !done) {
        interval = setTimeout(poll, 5000);
      }
    };

    poll();

    return () => {
      mounted = false;
      clearTimeout(interval);
    };
  }, [checkStatus]);

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
