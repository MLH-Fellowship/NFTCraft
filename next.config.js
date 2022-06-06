/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  env: {
    WALLET_KTY: process.env.WALLET_KTY,
    WALLET_KTY: process.env.WALLET_KTY,
    WALLET_N: process.env.WALLET_N,
    WALLET_E: process.env.WALLET_E,
    WALLET_D: process.env.WALLET_D,
    WALLET_P: process.env.WALLET_P,
    WALLET_Q: process.env.WALLET_Q,
    WALLET_DP: process.env.WALLET_DP,
    WALLET_DQ: process.env.WALLET_DQ,
    WALLET_QI: process.env.WALLET_QI,
  },
};

module.exports = nextConfig;
