import React from "react";
import { checkIfWalletIsConnected } from "../../utils";

export default function useHome() {
  const [isLoading, setLoading] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [walletAddress, setWalletAddress] = React.useState<string>("");

  const onConnectWallet = async () => {
    const { solana } = window;

    if (solana) {
      setLoading(true);
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      setLoading(false);
    }
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const onSubmit = () => {
    console.log("inputText", inputText);
  };
  React.useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return {
    isLoading,
    inputText,
    walletAddress,
    onSubmit,
    onInputChange,
    onConnectWallet,
  };
}
