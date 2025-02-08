import Airdrop from "./pages/Airdrop";
import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import ShowSolBalance from "./pages/ShowSolBalance";
import SendTokens from "./pages/SendTokens";
import Navbar from "./components/Navbar";
import SignMessage from "./pages/SignMessage";


const App = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Navbar />
            <Airdrop />
            <ShowSolBalance />
            <SendTokens />
            <SignMessage/>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  );
};

export default App;
