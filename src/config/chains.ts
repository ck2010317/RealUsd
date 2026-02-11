// Squid Router supported chains with their details
export interface ChainInfo {
  chainId: string;
  name: string;
  icon: string;
  nativeCurrency: {
    symbol: string;
    decimals: number;
  };
  rpcUrl: string;
  explorerUrl: string;
}

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  chainId: string;
  logoURI: string;
  isNative?: boolean;
}

// Native token address constant used by Squid
export const NATIVE_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const SUPPORTED_CHAINS: ChainInfo[] = [
  {
    chainId: "1",
    name: "Ethereum",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    nativeCurrency: { symbol: "ETH", decimals: 18 },
    rpcUrl: "https://eth.llamarpc.com",
    explorerUrl: "https://etherscan.io",
  },
  {
    chainId: "137",
    name: "Polygon",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
    nativeCurrency: { symbol: "MATIC", decimals: 18 },
    rpcUrl: "https://polygon.llamarpc.com",
    explorerUrl: "https://polygonscan.com",
  },
  {
    chainId: "42161",
    name: "Arbitrum",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
    nativeCurrency: { symbol: "ETH", decimals: 18 },
    rpcUrl: "https://arbitrum.llamarpc.com",
    explorerUrl: "https://arbiscan.io",
  },
  {
    chainId: "10",
    name: "Optimism",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png",
    nativeCurrency: { symbol: "ETH", decimals: 18 },
    rpcUrl: "https://optimism.llamarpc.com",
    explorerUrl: "https://optimistic.etherscan.io",
  },
  {
    chainId: "43114",
    name: "Avalanche",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/info/logo.png",
    nativeCurrency: { symbol: "AVAX", decimals: 18 },
    rpcUrl: "https://avalanche.llamarpc.com",
    explorerUrl: "https://snowtrace.io",
  },
  {
    chainId: "56",
    name: "BNB Chain",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png",
    nativeCurrency: { symbol: "BNB", decimals: 18 },
    rpcUrl: "https://bsc.llamarpc.com",
    explorerUrl: "https://bscscan.com",
  },
  {
    chainId: "8453",
    name: "Base",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
    nativeCurrency: { symbol: "ETH", decimals: 18 },
    rpcUrl: "https://base.llamarpc.com",
    explorerUrl: "https://basescan.org",
  },
  {
    chainId: "59144",
    name: "Linea",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/linea/info/logo.png",
    nativeCurrency: { symbol: "ETH", decimals: 18 },
    rpcUrl: "https://linea.llamarpc.com",
    explorerUrl: "https://lineascan.build",
  },
  {
    chainId: "250",
    name: "Fantom",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/info/logo.png",
    nativeCurrency: { symbol: "FTM", decimals: 18 },
    rpcUrl: "https://rpc.ftm.tools",
    explorerUrl: "https://ftmscan.com",
  },
  {
    chainId: "534352",
    name: "Scroll",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/scroll/info/logo.png",
    nativeCurrency: { symbol: "ETH", decimals: 18 },
    rpcUrl: "https://rpc.scroll.io",
    explorerUrl: "https://scrollscan.com",
  },
  {
    chainId: "42220",
    name: "Celo",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/celo/info/logo.png",
    nativeCurrency: { symbol: "CELO", decimals: 18 },
    rpcUrl: "https://forno.celo.org",
    explorerUrl: "https://celoscan.io",
  },
  {
    chainId: "1284",
    name: "Moonbeam",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/moonbeam/info/logo.png",
    nativeCurrency: { symbol: "GLMR", decimals: 18 },
    rpcUrl: "https://rpc.api.moonbeam.network",
    explorerUrl: "https://moonscan.io",
  },
  {
    chainId: "5000",
    name: "Mantle",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/mantle/info/logo.png",
    nativeCurrency: { symbol: "MNT", decimals: 18 },
    rpcUrl: "https://rpc.mantle.xyz",
    explorerUrl: "https://mantlescan.xyz",
  },
  {
    chainId: "81457",
    name: "Blast",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/blast/info/logo.png",
    nativeCurrency: { symbol: "ETH", decimals: 18 },
    rpcUrl: "https://rpc.blast.io",
    explorerUrl: "https://blastscan.io",
  },
  {
    chainId: "252",
    name: "Fraxtal",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fraxtal/info/logo.png",
    nativeCurrency: { symbol: "frxETH", decimals: 18 },
    rpcUrl: "https://rpc.frax.com",
    explorerUrl: "https://fraxscan.com",
  },
  {
    chainId: "2222",
    name: "Kava",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/kavaevm/info/logo.png",
    nativeCurrency: { symbol: "KAVA", decimals: 18 },
    rpcUrl: "https://evm.kava.io",
    explorerUrl: "https://kavascan.com",
  },
  {
    chainId: "314",
    name: "Filecoin",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/filecoin/info/logo.png",
    nativeCurrency: { symbol: "FIL", decimals: 18 },
    rpcUrl: "https://api.node.glif.io",
    explorerUrl: "https://filfox.info/en",
  },
  {
    chainId: "100",
    name: "Gnosis",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/xdai/info/logo.png",
    nativeCurrency: { symbol: "xDAI", decimals: 18 },
    rpcUrl: "https://rpc.gnosischain.com",
    explorerUrl: "https://gnosisscan.io",
  },
  {
    chainId: "146",
    name: "Sonic",
    icon: "https://assets.coingecko.com/coins/images/38018/standard/Sonic_Symbol.png",
    nativeCurrency: { symbol: "S", decimals: 18 },
    rpcUrl: "https://rpc.soniclabs.com",
    explorerUrl: "https://sonicscan.org",
  },
  {
    chainId: "1868",
    name: "Soneium",
    icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
    nativeCurrency: { symbol: "ETH", decimals: 18 },
    rpcUrl: "https://rpc.soneium.org",
    explorerUrl: "https://soneium.blockscout.com",
  },
  {
    chainId: "80094",
    name: "Berachain",
    icon: "https://assets.coingecko.com/coins/images/36895/standard/bera.png",
    nativeCurrency: { symbol: "BERA", decimals: 18 },
    rpcUrl: "https://rpc.berachain.com",
    explorerUrl: "https://berascan.com",
  },
  {
    chainId: "295",
    name: "Hedera",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/hedera/info/logo.png",
    nativeCurrency: { symbol: "HBAR", decimals: 18 },
    rpcUrl: "https://mainnet.hashio.io/api",
    explorerUrl: "https://hashscan.io/mainnet",
  },
  {
    chainId: "13371",
    name: "Immutable zkEVM",
    icon: "https://assets.coingecko.com/coins/images/17233/standard/immutableX-symbol-BLK-RGB.png",
    nativeCurrency: { symbol: "IMX", decimals: 18 },
    rpcUrl: "https://rpc.immutable.com",
    explorerUrl: "https://explorer.immutable.com",
  },
];

// Popular stablecoins and tokens per chain
export const POPULAR_TOKENS: Record<string, TokenInfo[]> = {
  // Ethereum
  "1": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      chainId: "1",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
      isNative: true,
    },
    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "1",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chainId: "1",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      chainId: "1",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    },
    {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      chainId: "1",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    },
    {
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      symbol: "WBTC",
      name: "Wrapped BTC",
      decimals: 8,
      chainId: "1",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    },
  ],
  // Polygon
  "137": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "MATIC",
      name: "Polygon",
      decimals: 18,
      chainId: "137",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
      isNative: true,
    },
    {
      address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "137",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    {
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chainId: "137",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
    {
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      chainId: "137",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    },
  ],
  // Arbitrum
  "42161": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      chainId: "42161",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
      isNative: true,
    },
    {
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "42161",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    {
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chainId: "42161",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
    {
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      chainId: "42161",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    },
  ],
  // Optimism
  "10": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      chainId: "10",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
      isNative: true,
    },
    {
      address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "10",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    {
      address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chainId: "10",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
  ],
  // Avalanche
  "43114": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "AVAX",
      name: "Avalanche",
      decimals: 18,
      chainId: "43114",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/info/logo.png",
      isNative: true,
    },
    {
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "43114",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    {
      address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chainId: "43114",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
  ],
  // BSC
  "56": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "BNB",
      name: "BNB",
      decimals: 18,
      chainId: "56",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png",
      isNative: true,
    },
    {
      address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 18,
      chainId: "56",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    {
      address: "0x55d398326f99059fF775485246999027B3197955",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 18,
      chainId: "56",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
  ],
  // Base
  "8453": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      chainId: "8453",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
      isNative: true,
    },
    {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "8453",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
  ],
  // Linea
  "59144": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      chainId: "59144",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
      isNative: true,
    },
    {
      address: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
      symbol: "USDC.e",
      name: "Bridged USDC",
      decimals: 6,
      chainId: "59144",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
  ],
  // Fantom
  "250": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "FTM",
      name: "Fantom",
      decimals: 18,
      chainId: "250",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/info/logo.png",
      isNative: true,
    },
    {
      address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "250",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
  ],
  // Scroll
  "534352": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      chainId: "534352",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
      isNative: true,
    },
    {
      address: "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "534352",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
  ],
  // Celo
  "42220": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "CELO",
      name: "Celo",
      decimals: 18,
      chainId: "42220",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/celo/info/logo.png",
      isNative: true,
    },
    {
      address: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "42220",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    {
      address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chainId: "42220",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
  ],
  // Moonbeam
  "1284": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "GLMR",
      name: "Moonbeam",
      decimals: 18,
      chainId: "1284",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/moonbeam/info/logo.png",
      isNative: true,
    },
    {
      address: "0x931715FEE2d06333043d11F658C8CE934aC61D0c",
      symbol: "USDC.wh",
      name: "USD Coin (Wormhole)",
      decimals: 6,
      chainId: "1284",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
  ],
  // Mantle
  "5000": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "MNT",
      name: "Mantle",
      decimals: 18,
      chainId: "5000",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/mantle/info/logo.png",
      isNative: true,
    },
    {
      address: "0x09Bc4E0D10E52d5c43F3B2a0882a6a6a13b98Bab",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "5000",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
    {
      address: "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chainId: "5000",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
  ],
  // Blast
  "81457": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      chainId: "81457",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
      isNative: true,
    },
    {
      address: "0x4300000000000000000000000000000000000003",
      symbol: "USDB",
      name: "Blast USD",
      decimals: 18,
      chainId: "81457",
      logoURI: "https://assets.coingecko.com/coins/images/35087/standard/usdb.png",
    },
  ],
  // Fraxtal
  "252": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "frxETH",
      name: "Frax Ether",
      decimals: 18,
      chainId: "252",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
      isNative: true,
    },
    {
      address: "0xFc00000000000000000000000000000000000001",
      symbol: "FRAX",
      name: "Frax",
      decimals: 18,
      chainId: "252",
      logoURI: "https://assets.coingecko.com/coins/images/13422/standard/FRAX_icon.png",
    },
  ],
  // Kava
  "2222": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "KAVA",
      name: "Kava",
      decimals: 18,
      chainId: "2222",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/kavaevm/info/logo.png",
      isNative: true,
    },
    {
      address: "0x919C1c267ABEC09E3F2126e3c5fEBD860DDe96E1",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chainId: "2222",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    },
  ],
  // Filecoin
  "314": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "FIL",
      name: "Filecoin",
      decimals: 18,
      chainId: "314",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/filecoin/info/logo.png",
      isNative: true,
    },
  ],
  // Gnosis
  "100": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "xDAI",
      name: "xDai",
      decimals: 18,
      chainId: "100",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/xdai/info/logo.png",
      isNative: true,
    },
    {
      address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "100",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
  ],
  // Sonic
  "146": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "S",
      name: "Sonic",
      decimals: 18,
      chainId: "146",
      logoURI: "https://assets.coingecko.com/coins/images/38018/standard/Sonic_Symbol.png",
      isNative: true,
    },
    {
      address: "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
      symbol: "USDC.e",
      name: "Bridged USDC",
      decimals: 6,
      chainId: "146",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
  ],
  // Soneium
  "1868": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      chainId: "1868",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
      isNative: true,
    },
    {
      address: "0xBA9986D2381edD1a06a4Ae8b92e1BE2F6eFd4b1f",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "1868",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
  ],
  // Berachain
  "80094": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "BERA",
      name: "Berachain",
      decimals: 18,
      chainId: "80094",
      logoURI: "https://assets.coingecko.com/coins/images/36895/standard/bera.png",
      isNative: true,
    },
    {
      address: "0x549943e04f40284185054145c6E4e9568C1D3241",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: "80094",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    },
  ],
  // Hedera
  "295": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "HBAR",
      name: "Hedera",
      decimals: 18,
      chainId: "295",
      logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/hedera/info/logo.png",
      isNative: true,
    },
  ],
  // Immutable zkEVM
  "13371": [
    {
      address: NATIVE_TOKEN_ADDRESS,
      symbol: "IMX",
      name: "Immutable X",
      decimals: 18,
      chainId: "13371",
      logoURI: "https://assets.coingecko.com/coins/images/17233/standard/immutableX-symbol-BLK-RGB.png",
      isNative: true,
    },
  ],
};

export function getChainById(chainId: string): ChainInfo | undefined {
  return SUPPORTED_CHAINS.find((c) => c.chainId === chainId);
}

export function getTokensForChain(chainId: string): TokenInfo[] {
  return POPULAR_TOKENS[chainId] || [];
}

export function getExplorerTxUrl(chainId: string, txHash: string): string {
  const chain = getChainById(chainId);
  if (!chain) return "";
  return `${chain.explorerUrl}/tx/${txHash}`;
}
