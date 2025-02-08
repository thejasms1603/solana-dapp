import { useState } from 'react'
import {useWallet} from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
const Airdrop = () => {
    const[amount, setAmount] = useState("");
    const {publicKey, connected} = useWallet();
    const {connection} = useConnection();

     const requestAirdrop = async () => {
        if(!connected || !publicKey)
        {
            alert("Please Connect your Wallet first.");
            return;
        }
        const solAmount = parseFloat(amount);
        if(isNaN(solAmount) || solAmount == 0)
        {
            alert("Enter a valid SOL amount.");
            return;
        }
        try{

            const txSignature = await connection.requestAirdrop(publicKey, solAmount * LAMPORTS_PER_SOL);
            alert(`Airdrop successful ${solAmount} SQL sent to ${publicKey.toBase58()}\n Transaction Signature: ${txSignature}`);
            setAmount("")
        } catch(err)
        {
            console.error("Error while performing airdrop", err);
            alert("Airdrop Request Failed, Please try again");
        }
    }
  return (
    <div>
        <input type="number" placeholder='Ente the amount of SOL' min='0.01' value={amount}  onChange={(e) => setAmount(e.target.value)}/>
        <button onClick={requestAirdrop}> Request Airdrop</button>
    </div>
  )
}

export default Airdrop
