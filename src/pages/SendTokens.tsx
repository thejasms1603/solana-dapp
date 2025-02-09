import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

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
    <section id='sendtokens' className='flex justify-center py-8'>
      <div className='flex flex-col p-6 w-full max-w-md gap-6 bg-white  border border-gray-300 shadow-lg rounded-xl'>
        <InputBox
          placeholder='Enter the wallet address'
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <InputBox
          placeholder='Enter the amount'
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <Button onClick={sendToken} title='Send Token' />
      </div>
    </section>
  );
};

export default SendTokens;
