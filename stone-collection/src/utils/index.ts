export const checkIfWalletIsConnected = async () => {
  const cloneWindow: any = window;
  if (cloneWindow?.solana?.isPhantom) {
    console.log("Phantom wallet found!");
    const response = await cloneWindow.solana.connect({ onlyIfTrusted: true });
    console.log("Connected with Public Key:", response.publicKey.toString());
    return response.publicKey.toString();
  } else {
    alert("Solana object not found! Get a Phantom Wallet 👻");
    return false;
  }
};
