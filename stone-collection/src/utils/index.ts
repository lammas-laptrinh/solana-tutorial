import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
// import idl from "./idl/stone_programs.json";

export const checkIfWalletIsConnected = async () => {
  if (window?.solana?.isPhantom) {
    console.log("Phantom wallet found!");
    const response = await window.solana.connect({ onlyIfTrusted: true });
    console.log("Connected with Public Key:", response.publicKey.toString());
    return response.publicKey.toString();
  } else {
    alert("Solana object not found! Get a Phantom Wallet 👻");
    return false;
  }
};

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// Create a keypair for the account that will hold the GIF data.
const baseAccount = Keypair.generate();

// This is the address of your solana program, if you forgot, just run solana address -k target/deploy/myepicproject-keypair.json
const programID = new PublicKey("B4JQj82q7VaHfXb6JHTXwM46feQ7mSeSEki7JCcEeEGj");

// Set our network to devnet.
const network = clusterApiUrl("devnet");

// Controls how we want to acknowledge when a transaction is "done".
const opts: any = {
  preflightCommitment: "processed",
};

export const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new AnchorProvider(
    connection,
    window?.solana,
    opts.preflightCommitment
  );
  return provider;
};
export const addItem = async (inputValue: string) => {
  try {
    const provider = getProvider();
    const program = await getProgram();
    if (program) {
      await program.rpc.addGif(inputValue, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log("GIF successfully sent to program", inputValue);
    }

    return await getGifList();
  } catch (error) {
    console.log("Error sending GIF:", error);
    return [];
  }
};

export const getProgram = async () => {
  // Get metadata about your solana program

  const idl = await Program.fetchIdl(programID, getProvider());
  console.log("idl", idl);

  // Create a program that you can call
  if (idl) {
    return new Program(idl, programID, getProvider());
  }
  return null;
};

export const getGifList = async () => {
  try {
    const program = await getProgram();
    if (program) {
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      console.log("Got the account", account);
      return account.gifList;
    }
  } catch (error) {
    console.log("Error in getGifList: ", error);
    return [];
  }
};

export const createGifAccount = async () => {
  try {
    const provider = getProvider();
    const program = await getProgram();

    console.log("program", program);

    if (program) {
      console.log("ping");
      await program.rpc.initialize({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log(
        "Created a new BaseAccount w/ address:",
        baseAccount.publicKey.toString()
      );
      return await getGifList();
    }
  } catch (error) {
    console.log("Error creating BaseAccount account:", error);
  }
};
