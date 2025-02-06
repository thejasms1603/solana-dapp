import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const ShowSolBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
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
    getBalance();
  }, [publicKey, connection]);

  return (
    <div>
      <p>
        SOL Balance:{" "}
        {publicKey ? (
          <span>
            {balance !== null ? `${balance.toFixed(4)} SOL` : "Loading..."}
          </span>
        ) : (
          <span>Wallet not connected</span>
        )}
      </p>
    </div>
  );
};

export default ShowSolBalance;
