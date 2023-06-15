import React from "react";
import {
  addItem,
  checkIfWalletIsConnected,
  getGifList,
} from "../../utils";

export default function useHome() {
  const [isLoading, setLoading] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [walletAddress, setWalletAddress] = React.useState<string>("");
  const [stones, setStones] = React.useState<Array<string>>([]);

  const onConnectWallet = async () => {
    const { solana } = window;

    if (solana) {
      setLoading(true);
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      setLoading(false);
      const res = await getGifList();
      if (res !== null) {
        setStones(res?.map((item) => item.gifLink));
      }
    }
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const onSubmit = async () => {
    if (inputText === "") {
      return;
    }
    const res = await addItem(inputText);
    if (res !== null) {
      setStones(res?.map((item) => item.gifLink));
    }
    setInputText("");
  };
  React.useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return {
    stones,
    isLoading,
    inputText,
    walletAddress,
    onSubmit,
    onInputChange,
    onConnectWallet,
  };
}
