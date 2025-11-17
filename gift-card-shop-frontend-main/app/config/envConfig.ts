export const envConfig = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    WALLETCONNECT_PROJECT_ID: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    TAWK_PROPERTY_ID: import.meta.env.VITE_TAWK_PROPERTY_ID,
    TAWK_WIDGET_ID: import.meta.env.VITE_TAWK_WIDGET_ID,
  
    BSC: {
      RECEIVER_ADDRESS: import.meta.env.VITE_BSC_RECEIVER_ADDRESS,
      USDT_CONTRACT_ADDRESS: import.meta.env.VITE_BSC_USDT_CONTRACT_ADDRESS,
      USDT_TOKEN_DECIMALS: Number(import.meta.env.VITE_BSC_USDT_TOKEN_DECIMALS),
      CHAIN_ID: Number(import.meta.env.VITE_BSC_CHAIN_ID),
    },
  
    TRON: {
      RECEIVER_ADDRESS: import.meta.env.VITE_TRON_RECEIVER_ADDRESS,
      USDT_CONTRACT_ADDRESS: import.meta.env.VITE_TRON_USDT_CONTRACT_ADDRESS,
      USDT_TOKEN_DECIMALS: Number(import.meta.env.VITE_TRON_USDT_TOKEN_DECIMALS),
      // CHAIN_ID: Number(import.meta.env.VITE_TRON_CHAIN_ID),
    },
  }
  