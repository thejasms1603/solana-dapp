import { useState } from 'react'
import {useWallet} from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
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
            alert(`Airdrop successful ${solAmount} SOL sent to ${publicKey.toBase58()}\n Transaction Signature: ${txSignature}`);
            setAmount("")
        } catch(err)
        {
            console.error("Error while performing airdrop", err);
            alert("Airdrop Request Failed, Please try again");
        }
    }
  return (
    <section id='airdrop' className='flex justify-center py-8'>
      <div className='flex flex-col p-6 w-full max-w-md gap-6 bg-white  border border-gray-300 shadow-lg rounded-xl'>
            <h2 className='font-semibold text-xl text-center text-gray-800'>
                SOL Airdrop
            </h2>
        <div className=' flex flex-col gap-4 '>
          <InputBox
            value={amount}
            onChange={(e: any) => setAmount(e.target.value)}
            placeholder={"Enter the amount of SOL"}
          />
        </div>
          <Button title={"Request Airdrop"} onClick={requestAirdrop}/>
      </div>
    </section>
  );
}

export default Airdrop
