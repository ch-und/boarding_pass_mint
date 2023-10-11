import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

const activeChain = {
  chainId: 6103819,
  rpc: ["https://froopyland.dymension.xyz/chund_6103819-1/evmrpc"],
  nativeCurrency: {
    decimals: 18,
    name: "RAX",
    symbol: "RAX",
  },
  shortName: "chund",
  slug: "chund",
  testnet: true,
  chain: "chund",
  name: "CH_UND",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <Navbar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
