import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  arbitrum,
  optimism,
  avalanche,
  bsc,
  base,
  linea,
  fantom,
  celo,
  moonbeam,
  scroll,
  mantle,
  blast,
  fraxtal,
  kava,
  filecoin,
  gnosis,
} from "wagmi/chains";

// Custom chain definitions for chains not in wagmi/chains
const sonic = {
  id: 146,
  name: "Sonic",
  nativeCurrency: { name: "Sonic", symbol: "S", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.soniclabs.com"] } },
  blockExplorers: { default: { name: "SonicScan", url: "https://sonicscan.org" } },
} as const;

const soneium = {
  id: 1868,
  name: "Soneium",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.soneium.org"] } },
  blockExplorers: { default: { name: "Soneium Explorer", url: "https://soneium.blockscout.com" } },
} as const;

const berachain = {
  id: 80094,
  name: "Berachain",
  nativeCurrency: { name: "BERA", symbol: "BERA", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.berachain.com"] } },
  blockExplorers: { default: { name: "BeraScan", url: "https://berascan.com" } },
} as const;

const hedera = {
  id: 295,
  name: "Hedera",
  nativeCurrency: { name: "HBAR", symbol: "HBAR", decimals: 18 },
  rpcUrls: { default: { http: ["https://mainnet.hashio.io/api"] } },
  blockExplorers: { default: { name: "HashScan", url: "https://hashscan.io/mainnet" } },
} as const;

const immutableZkEvm = {
  id: 13371,
  name: "Immutable zkEVM",
  nativeCurrency: { name: "IMX", symbol: "IMX", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.immutable.com"] } },
  blockExplorers: { default: { name: "Immutable Explorer", url: "https://explorer.immutable.com" } },
} as const;

export const config = getDefaultConfig({
  appName: "RealUSD",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
  chains: [
    mainnet,
    polygon,
    arbitrum,
    optimism,
    avalanche,
    bsc,
    base,
    linea,
    fantom,
    celo,
    moonbeam,
    scroll,
    mantle,
    blast,
    fraxtal,
    kava,
    filecoin,
    gnosis,
    sonic,
    soneium,
    berachain,
    hedera,
    immutableZkEvm,
  ],
  ssr: true,
});
