const {
  setProvider,
  AnchorProvider,
  workspace,
  web3,
} = require("@coral-xyz/anchor");

describe("stone-programs", () => {
  // Configure the client to use the local cluster.
  setProvider(AnchorProvider.env());

  it("Is initialized!", async () => {
    // Add your test here.
    const program = workspace.StonePrograms;

    // Create an account keypair for our program to use.
    const baseAccount = web3.Keypair.generate();

    let tx = await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    console.log("📝 Your transaction signature", tx);

    // Fetch data from the account.
    let account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("👀 GIF Count", account.totalGifs.toString());

    // const tx = await program.methods.initialize().rpc();
    // console.log("Your transaction signature", tx);
  });
});
