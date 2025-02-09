import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

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
    <section id='signmessage' className="flex justify-center py-6">
      <div className='flex flex-col p-6 w-full max-w-md gap-6 bg-white  border border-gray-300 shadow-lg rounded-xl'>
        <InputBox
          placeholder='Enter the Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={messageSign} title='Sign Message' />
      </div>
    </section>
  );
};

export default SignMessage;
