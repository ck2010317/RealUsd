import axios from "axios";

const SQUID_API_URL = process.env.NEXT_PUBLIC_SQUID_API_URL || "https://v2.api.squidrouter.com";
const INTEGRATOR_ID = process.env.NEXT_PUBLIC_INTEGRATOR_ID || "";

const squidApi = axios.create({
  baseURL: SQUID_API_URL,
  headers: {
    "x-integrator-id": INTEGRATOR_ID,
    "Content-Type": "application/json",
  },
});

export interface RouteParams {
  fromAddress: string;
  fromChain: string;
  fromToken: string;
  fromAmount: string;
  toChain: string;
  toToken: string;
  toAddress: string;
  slippage: number;
  slippageConfig?: {
    autoMode: number;
  };
  enableBoost?: boolean;
}

export interface RouteEstimate {
  fromAmount: string;
  fromAmountUSD?: string;
  toAmount: string;
  toAmountUSD?: string;
  toAmountMin: string;
  toAmountMinUSD?: string;
  estimatedRouteDuration: number;
  exchangeRate: string;
  aggregatePriceImpact: string;
  feeCosts: Array<{
    name: string;
    description: string;
    amount: string;
    amountUSD: string;
    token: {
      symbol: string;
      decimals: number;
    };
  }>;
  gasCosts: Array<{
    type: string;
    amount: string;
    amountUSD: string;
    token: {
      symbol: string;
      decimals: number;
    };
  }>;
}

export interface TransactionRequest {
  routeType: string;
  targetAddress: string;
  data: string;
  value: string;
  gasLimit: string;
  gasPrice: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
}

export interface RouteResponse {
  route: {
    estimate: RouteEstimate;
    transactionRequest: TransactionRequest;
    params: Record<string, unknown>;
  };
}

export interface StatusResponse {
  id: string;
  status: string;
  squidTransactionStatus: string;
  fromChain: {
    transactionId: string;
    chainId: string;
    blockNumber: number;
    transactionUrl: string;
  };
  toChain?: {
    transactionId: string;
    chainId: string;
    blockNumber: number;
    transactionUrl: string;
  };
  timeSpent?: Record<string, number>;
  error?: Record<string, unknown>;
}

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 2000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 429 &&
        attempt < maxRetries
      ) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.warn(`Rate limited (429). Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}

export async function getRoute(params: RouteParams): Promise<{ data: RouteResponse; requestId: string }> {
  try {
    return await withRetry(async () => {
      const result = await squidApi.post("/v2/route", params);
      const requestId = result.headers["x-request-id"] || "";
      return { data: result.data, requestId };
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Squid API error:", error.response.data);
      if (error.response.status === 429) {
        throw new Error("Too many requests. Please wait a moment and try again.");
      }
      const message =
        error.response.data?.error?.message ||
        error.response.data?.message ||
        error.response.data?.errors?.[0]?.message ||
        "Failed to get route. Please try different parameters.";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getTransactionStatus(params: {
  transactionId: string;
  requestId: string;
  fromChainId: string;
  toChainId: string;
}): Promise<StatusResponse> {
  try {
    // Build query params, omitting empty requestId
    const queryParams: Record<string, string> = {
      transactionId: params.transactionId,
      fromChainId: params.fromChainId,
      toChainId: params.toChainId,
    };
    if (params.requestId) {
      queryParams.requestId = params.requestId;
    }

    return await withRetry(async () => {
      const result = await squidApi.get("/v2/status", { params: queryParams });
      return result.data;
    }, 2, 3000);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Status API error:", error.response.data);
    }
    throw error;
  }
}

// ERC20 ABI for token approval
export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function decimals() external view returns (uint8)",
  "function symbol() external view returns (string)",
  "function name() external view returns (string)",
];
