// import { defineChain } from 'viem';
import { createConfig, http } from 'wagmi';
import { bsc, localhost, mainnet, sepolia, tron } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
import { envConfig } from '~/config/envConfig';

// const shahthaTestnet = defineChain({
//   id: 0x94a9059e, //chain ID
//   name: 'ShahTha Testnet',
//   nativeCurrency: {
//     name: 'TRX',
//     symbol: 'TRON',
//     decimals: 6,
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://api.shasta.trongrid.io'],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'ShahTha Explorer',
//       url: 'https://shasta.tronscan.org/', 
//     },
//   },
//   testnet: true,
// })


const projectId = `${envConfig.WALLETCONNECT_PROJECT_ID}`;

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, localhost, bsc, tron],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [localhost.id]: http("http://127.0.0.1:8545"),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [tron.id]: http(),
    // [shahthaTestnet.id]: http('https://rpc.shahtha.io'),
  },
})