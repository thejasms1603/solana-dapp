import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const ShowSolBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const getBalance = async () => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    try {
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Error fetching balance:", error);
      alert("Error while fetching the balance. Please try again.");
    }
  };

  useEffect(() => {
    if (publicKey) {
      getBalance();
    }
  }, [publicKey, connection]);

  return (
    <section id='solbalance' className='flex justify-center py-6'>
      <div className='w-full max-w-sm p-6 bg-white border border-violet-700 shadow-md rounded-lg text-center'>
        <h2 className='text-lg font-semibold text-gray-800'>💰 SOL Balance</h2>
        <p className='text-xl font-medium text-gray-900 mt-2'>
          {publicKey ? (
            <span>
              {balance !== null ? `${balance.toFixed(4)} SOL` : "Loading..."}
            </span>
          ) : (
            <span className='text-red-500'>Wallet not connected</span>
          )}
        </p>
        {publicKey && (
          <button
            onClick={getBalance}
            className='mt-4 px-4 py-2 text-white bg-violet-600 hover:bg-violet-700 rounded-md transition'
          >
            🔄 Refresh Balance
          </button>
        )}
      </div>
    </section>
  );
};

export default ShowSolBalance;
