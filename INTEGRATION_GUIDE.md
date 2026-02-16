# RealUSD Cross-Chain Swap Integration Guide

## Overview
This is a **complete, production-ready** cross-chain stablecoin swap component using Squid Router with 20% commission on all swaps. Works on 27 EVM chains.

---

## ⚠️ CRITICAL CONFIGURATION

### Commission Settings
**Location:** `src/components/SwapCard.tsx` (Lines 96-97)

```typescript
const COMMISSION_ADDRESS = "0x8C8411b0fD28BD31e61306338D102495f148d223";
const COMMISSION_RATE = 0.20; // 20% commission
```

**IMPORTANT:** 
- Commission is collected on the **source chain** before swap
- Same address receives commission on ALL chains
- Make sure you control this wallet on all supported chains

### Squid API Configuration
**Location:** `src/lib/squid.ts` (Lines 1-4)

```typescript
const SQUID_API_BASE_URL = "https://v2.api.squidrouter.com";
const SQUID_INTEGRATOR_ID = "realusd-502086f0-3831-4ab5-8488-43be5799fa83";
```

---

## 📦 CORE FILES TO COPY

### 1. **Main Swap Component** (REQUIRED)
**File:** `src/components/SwapCard.tsx` (693 lines)
- Contains ALL swap logic
- Handles commission collection
- Auto-quoting without wallet connection
- Approval & swap execution

### 2. **Squid API Client** (REQUIRED)
**File:** `src/lib/squid.ts` (187 lines)
- API calls to Squid Router
- Route fetching
- Transaction status (not used, time-based instead)
- ERC20 ABI for token approvals

### 3. **Chain & Token Configs** (REQUIRED)
**File:** `src/config/chains.ts` (967 lines)
- 27 supported chains
- Tokens for each chain (34 tokens on Fantom, 15-20 on others)
- Chain metadata (RPC, explorer, icons)

### 4. **Wagmi Configuration** (REQUIRED)
**File:** `src/config/wagmi.ts` (114 lines)
- RainbowKit + wagmi setup
- All 27 chains configured
- Custom chain definitions for Sonic, Soneium, Berachain, Hedera, Immutable zkEVM, Monad, Peaq, HyperEVM
- NO WalletConnect dependency (uses injected wallets only)

### 5. **UI Components** (REQUIRED)
**Files:**
- `src/components/ChainSelector.tsx` (82 lines) - Chain selection dropdown
- `src/components/TokenSelector.tsx` (133 lines) - Token selection dropdown
- `src/components/TransactionStatus.tsx` (214 lines) - Progress UI with time-based phases

---

## 📦 DEPENDENCIES

### package.json
```json
{
  "dependencies": {
    "next": "16.1.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@rainbow-me/rainbowkit": "^2.2.10",
    "wagmi": "^2.19.5",
    "viem": "^2.45.3",
    "ethers": "^5.7.2",
    "@tanstack/react-query": "^5.62.12"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4.0.0"
  }
}
```

### Install Command
```bash
npm install next@16.1.6 react@19 react-dom@19 @rainbow-me/rainbowkit@2.2.10 wagmi@2.19.5 viem@2.45.3 ethers@5.7.2 @tanstack/react-query@5.62.12
```

---

## 🔧 ENVIRONMENT VARIABLES

**File:** `.env.local`

```bash
# NO ENVIRONMENT VARIABLES NEEDED!
# Everything is hardcoded in the code
```

**Why no env vars?**
- Squid integrator ID is public (used in client-side API calls)
- Commission address is public (visible on-chain)
- No API keys needed
- No secrets required

---

## 🏗️ PROJECT STRUCTURE

```
your-project/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Add RainbowKit providers here
│   │   └── page.tsx            # Import SwapCard component here
│   ├── components/
│   │   ├── SwapCard.tsx        # ⭐ MAIN COMPONENT
│   │   ├── ChainSelector.tsx
│   │   ├── TokenSelector.tsx
│   │   └── TransactionStatus.tsx
│   ├── config/
│   │   ├── chains.ts
│   │   └── wagmi.ts
│   └── lib/
│       └── squid.ts
├── package.json
└── .env.local (optional, empty)
```

---

## 🚀 INTEGRATION STEPS

### Step 1: Copy Core Files
Copy these 7 files to your project:
1. `src/components/SwapCard.tsx`
2. `src/components/ChainSelector.tsx`
3. `src/components/TokenSelector.tsx`
4. `src/components/TransactionStatus.tsx`
5. `src/config/chains.ts`
6. `src/config/wagmi.ts`
7. `src/lib/squid.ts`

### Step 2: Install Dependencies
```bash
npm install @rainbow-me/rainbowkit@2.2.10 wagmi@2.19.5 viem@2.45.3 ethers@5.7.2 @tanstack/react-query@5.62.12
```

### Step 3: Setup Providers (Next.js App Router)

**File:** `src/app/layout.tsx`

```typescript
"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config/wagmi";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
```

### Step 4: Use Component

**File:** `src/app/page.tsx`

```typescript
import SwapCard from "@/components/SwapCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <SwapCard />
    </div>
  );
}
```

---

## 🎯 KEY FEATURES

### ✅ Auto-Quoting
- Works **without wallet connection**
- Fetches live quotes from Squid API
- 1.2s debounce to avoid rate limits
- Updates on chain/token/amount change

### ✅ Commission System
- **20% commission** deducted BEFORE swap
- Collected on **source chain** in **source token**
- Example: User swaps 100 USDC → 20 USDC to commission wallet, 80 USDC swapped
- Commission wallet works on ALL chains (same EVM address)

### ✅ Time-Based Progress
- Squid status API doesn't work for this integrator ID
- Uses time-based phases instead:
  - Submitted (0-3s)
  - Confirming (3-30s)
  - Bridging (30-90s)
  - Complete (90s+)

### ✅ Smart Token Approval
- Checks if token needs approval
- Only prompts approval if needed
- Supports native tokens (no approval needed)

### ✅ Error Handling
- Rate limiting with exponential backoff
- Network switching
- Transaction failures
- User rejections

---

## 🔍 COMMISSION FLOW

### Example: Swap 100 USDC on Ethereum → Polygon

1. **User Input:** 100 USDC on Ethereum → USDC on Polygon
2. **Quote Calculation:**
   - Total amount: 100 USDC
   - Commission (20%): 20 USDC
   - Swap amount: 80 USDC
   - Quote fetched for 80 USDC swap
3. **Execution:**
   - **Step 1:** Transfer 20 USDC to `0x8C8411b0fD28BD31e61306338D102495f148d223` on Ethereum
   - **Step 2:** Swap 80 USDC via Squid Router
4. **Result:**
   - Commission wallet receives 20 USDC on Ethereum
   - User receives ~80 USDC on Polygon

---

## 🌐 SUPPORTED CHAINS (27 Total)

1. Ethereum (1)
2. Polygon (137)
3. Arbitrum (42161)
4. Optimism (10)
5. Avalanche (43114)
6. BNB Chain (56)
7. Base (8453)
8. Linea (59144)
9. Fantom (250) - **34 tokens**
10. Scroll (534352)
11. Celo (42220)
12. Moonbeam (1284)
13. Mantle (5000)
14. Blast (81457)
15. Fraxtal (252)
16. Kava (2222)
17. Filecoin (314)
18. Gnosis (100)
19. Sonic (146)
20. Soneium (1868)
21. Berachain (80094)
22. Hedera (295)
23. Immutable zkEVM (13371)
24. Monad (143)
25. Peaq (3338)
26. HyperEVM (999)
27. (Add more by copying from Squid API)

---

## ⚙️ CUSTOMIZATION

### Change Commission Rate
**File:** `src/components/SwapCard.tsx` (Line 97)

```typescript
const COMMISSION_RATE = 0.20; // Change to 0.05 for 5%, 0.10 for 10%, etc.
```

**IMPORTANT:** Also update the division logic:
- Line 181: `const commissionBN = amountBN.mul(20).div(100);` → Change `20` to match rate
- Line 238: `const commissionBN = totalBN.mul(20).div(100);` → Change `20` to match rate

### Change Commission Address
**File:** `src/components/SwapCard.tsx` (Line 96)

```typescript
const COMMISSION_ADDRESS = "YOUR_WALLET_ADDRESS_HERE";
```

### Add More Chains
**File:** `src/config/chains.ts` - Add new chain to `SUPPORTED_CHAINS` array
**File:** `src/config/wagmi.ts` - Add new chain to `allChains` array

### Add More Tokens
**File:** `src/config/chains.ts` - Add tokens to `POPULAR_TOKENS` object under chain ID

---

## 🐛 KNOWN ISSUES & SOLUTIONS

### Issue: Squid Status API Returns 404
**Solution:** Already handled with time-based progress in `TransactionStatus.tsx`

### Issue: Rate Limiting (429 errors)
**Solution:** Already handled with exponential backoff in `squid.ts`

### Issue: WalletConnect Errors
**Solution:** Removed WalletConnect dependency, uses injected wallets only

### Issue: Transaction Failures
**Root Cause:** Was using `targetAddress` instead of `target` 
**Solution:** Already fixed in commit `3846cba`

---

## 📊 TESTING CHECKLIST

- [ ] Install dependencies without errors
- [ ] Build completes successfully
- [ ] Wallet connects (MetaMask, Coinbase, etc.)
- [ ] Auto-quote works without wallet
- [ ] Commission calculation shows correctly
- [ ] Token approval prompts when needed
- [ ] Swap executes successfully
- [ ] Commission appears in commission wallet
- [ ] Works on multiple chains
- [ ] Progress UI shows correct phases

---

## 🔗 IMPORTANT LINKS

- **Live Demo:** https://realusd.vercel.app
- **GitHub:** https://github.com/ck2010317/RealUsd.git
- **Squid Router Docs:** https://docs.squidrouter.com
- **RainbowKit Docs:** https://www.rainbowkit.com
- **wagmi Docs:** https://wagmi.sh

---

## 💡 INTEGRATION TIPS

1. **Don't change file paths** - Keep the same folder structure for imports to work
2. **Use exact dependency versions** - Different versions may have breaking changes
3. **Test on testnet first** - Use small amounts before production
4. **Monitor commission wallet** - Set up alerts to track incoming commissions
5. **Keep Squid integrator ID** - It's already registered and working

---

## 🎨 STYLING

Uses **Tailwind CSS 4** with dark theme:
- Gradient backgrounds
- Glassmorphism effects
- Smooth animations
- Mobile responsive

**To customize colors:**
- Edit class names in component files
- Or add custom Tailwind config

---

## 📞 SUPPORT

If you need help integrating:
1. Check this guide first
2. Review the live demo: https://realusd.vercel.app
3. Check GitHub issues
4. All code is production-tested and working

---

## ✅ FINAL CHECKLIST FOR COPILOT

**Give Copilot these files (in order):**

1. ✅ `package.json` - For dependencies
2. ✅ `src/lib/squid.ts` - API client
3. ✅ `src/config/chains.ts` - Chain/token configs
4. ✅ `src/config/wagmi.ts` - Wagmi setup
5. ✅ `src/components/ChainSelector.tsx` - Chain dropdown
6. ✅ `src/components/TokenSelector.tsx` - Token dropdown
7. ✅ `src/components/TransactionStatus.tsx` - Progress UI
8. ✅ `src/components/SwapCard.tsx` - Main component
9. ✅ This integration guide

**Tell Copilot:**
> "Integrate this cross-chain swap component into my Next.js project. Use the exact code from these files. The commission address is 0x8C8411b0fD28BD31e61306338D102495f148d223 and commission rate is 20%. No environment variables needed. Follow the integration guide exactly."

---

## 🚨 CRITICAL: DO NOT MODIFY

**These values MUST stay the same:**
- Squid integrator ID: `realusd-502086f0-3831-4ab5-8488-43be5799fa83`
- Squid API URL: `https://v2.api.squidrouter.com`
- Commission calculation logic (lines 181 & 238 in SwapCard.tsx)
- `target` property in transactionRequest (NOT `targetAddress`)

**Modifying these will break the swap functionality.**

---

**Last Updated:** February 11, 2026
**Version:** 1.0 (Production Ready)
**Commission:** 20% on all swaps
**Status:** ✅ Fully Working - Deployed on Vercel
