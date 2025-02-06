import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";

const SignMessage = () => {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");

  const messageSign = async () => {
    if (!message) {
      alert("Please enter the message");
      return;
    }
    if (!publicKey) {
      alert("Wallet not connected");
      return;
    }
    if (!signMessage) {
      alert("Wallet does not support message signing");
      return;
    }

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      // Convert the public key to a Uint8Array
      const publicKeyBytes = publicKey.toBytes();

      // Verify the signature
      const isValid = ed25519.verify(signature, encodedMessage, publicKeyBytes);

      if (!isValid) {
        console.error("Message Signature Invalid");
        alert("Signature verification failed!");
        return;
      }

      alert(`Success! Message Signature: ${bs58.encode(signature)}`);
    } catch (error) {
      console.error("Signing failed:", error);
      alert("Failed to sign the message. Check the console for details.");
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Enter the Message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={messageSign}>Sign Message</button>
    </div>
  );
};

export default SignMessage;
