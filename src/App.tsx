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
import Footer from "./components/Footer";


const App = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <ConnectionProvider
      endpoint={endpoint}
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Navbar />
          <div className='justify-center items-center py-8'>
            <Airdrop />
            <ShowSolBalance />
            <SendTokens />
            <SignMessage />
          </div>
          <Footer />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
