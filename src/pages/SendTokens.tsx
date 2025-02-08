import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

const SendTokens = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState(0); 
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const sendToken = async () => {
    if (!publicKey) {
      alert("Wallet not connected");
      return;
    }
    if (!walletAddress) {
      alert("Please enter a valid wallet address");
      return;
    }
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    try {
      const toPubkey = new PublicKey(walletAddress);
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      alert(`Transaction Sent! Signature: ${signature}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please check the console for details.");
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Enter the wallet address'
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <input
        type='number'
        placeholder='Enter the amount'
        value={amount}
        onChange={(e) =>
          setAmount(parseFloat(e.target.value))
        }
      />
      <button onClick={sendToken}>Send Token</button>
    </div>
  );
};

export default SendTokens;
