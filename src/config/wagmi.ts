import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet,
  trustWallet,
  rabbyWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
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

const monad = {
  id: 143,
  name: "Monad",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.monad.xyz"] } },
  blockExplorers: { default: { name: "Monad Explorer", url: "https://explorer.monad.xyz" } },
} as const;

const peaq = {
  id: 3338,
  name: "Peaq",
  nativeCurrency: { name: "PEAQ", symbol: "PEAQ", decimals: 18 },
  rpcUrls: { default: { http: ["https://peaq.api.onfinality.io/public"] } },
  blockExplorers: { default: { name: "Peaq Subscan", url: "https://peaq.subscan.io" } },
} as const;

const hyperEvm = {
  id: 999,
  name: "HyperEVM",
  nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.hyperliquid.xyz/evm"] } },
  blockExplorers: { default: { name: "Hyperliquid Explorer", url: "https://explorer.hyperliquid.xyz" } },
} as const;

const allChains = [
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
  monad,
  peaq,
  hyperEvm,
] as const;

// Use injected wallets directly — no WalletConnect project ID needed
const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [metaMaskWallet, coinbaseWallet, rabbyWallet, trustWallet, injectedWallet],
    },
  ],
  {
    appName: "RealUSD",
    // WalletConnect projectId only needed for WC-based wallets — not for injected
    projectId: "00000000000000000000000000000000",
  }
);

export const config = createConfig({
  connectors,
  chains: allChains,
  transports: Object.fromEntries(
    allChains.map((chain) => [chain.id, http()])
  ) as Record<(typeof allChains)[number]["id"], ReturnType<typeof http>>,
  ssr: true,
});
