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
} from "wagmi/chains";

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
  ],
  ssr: true,
});
