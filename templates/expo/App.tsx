import "text-encoding-polyfill";
import "react-native-get-random-values";
import { Buffer } from "buffer";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { CoinflowPurchase, CoinflowWithdraw } from "@coinflowlabs/react-native";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { sign } from "tweetnacl";

global.Buffer = Buffer;

export default function App() {
  const [keypair, setKeypair] = useState<Keypair>(
    Keypair.fromSecretKey(
      Uint8Array.from([
        135, 172, 8, 68, 115, 157, 189, 112, 178, 17, 122, 230, 130, 245, 69,
        180, 20, 92, 216, 188, 190, 6, 163, 202, 177, 120, 104, 193, 78, 153,
        236, 176, 193, 185, 18, 86, 88, 18, 97, 29, 212, 65, 153, 129, 197, 0,
        179, 89, 27, 150, 198, 91, 214, 235, 151, 47, 81, 119, 37, 254, 157,
        203, 238, 174,
      ])
    )
  );
  const publicKey = useMemo(() => {
    return keypair.publicKey;
  }, [keypair]);

  useEffect(() => {
    console.log(publicKey.toString());
  }, []);

  const connection = useMemo(
    () => new Connection("https://api.devnet.solana.com", "confirmed"),
    []
  );

  const sendTransaction = useCallback(
    async (transaction: Transaction | VersionedTransaction) => {
      if ("instructions" in transaction) {
        console.log("Regular Transaction");
        // transaction.feePayer = publicKey;
        transaction.partialSign(keypair);
      } else {
        console.log("VersionedTransaction!!!!!");
        console.log(transaction);
        try {
          transaction.sign([keypair]);
        } catch (e) {
          console.error(e);
          throw e;
        }
      }
      console.log("done signing!!!!!");
      console.log(transaction.serialize().toString("base64"));
      const sig = await connection.sendRawTransaction(transaction.serialize());
      console.log({ sig });
      return sig;
    },
    []
  );

  const signMessage = async (message: Uint8Array) => {
    console.log("signMessage!!!!!!");
    return Promise.resolve(sign.detached(message, keypair.secretKey));
  };

  const transaction = useMemo(() => {
    const mint = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

    const receiver = new PublicKey(
      "H191L17jE26R1wGWQHAx5KQhBwSwHPMgzb2A66Hr9h37"
    );

    const receiverAta = getAssociatedTokenAddressSync(mint, receiver);

    const transferAmount = Number(1 / 2) * Math.pow(10, 6);
    const transferIx1 = createTransferCheckedInstruction(
      new PublicKey("33333333333333333333333333333333333333333333"),
      mint,
      receiverAta,
      new PublicKey("22222222222222222222222222222222222222222222"),
      transferAmount,
      6
    );
    const transferIx2 = createTransferCheckedInstruction(
      new PublicKey("33333333333333333333333333333333333333333333"),
      mint,
      new PublicKey("HzdseyCGneNv4SzyBgteppi1N8GawjWLSkBSTx82UTtL"),
      new PublicKey("22222222222222222222222222222222222222222222"),
      transferAmount,
      6
    );
    return new Transaction({
      feePayer: Keypair.generate().publicKey,
      blockhash: Keypair.generate().publicKey.toString(),
      lastValidBlockHeight: 1,
    }).add(transferIx1, transferIx2);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text>Public key: {publicKey?.toString()}</Text>
        <CoinflowWithdraw
          style={styles.container}
          wallet={{
            publicKey,
            sendTransaction,
            signMessage,
          }}
          merchantId={"paysafe"}
          connection={connection}
          blockchain={"solana"}
          env={"local"}
        />
        {/*<CoinflowPurchase*/}
        {/*  style={styles.container}*/}
        {/*  wallet={{*/}
        {/*    publicKey,*/}
        {/*    sendTransaction,*/}
        {/*    signMessage,*/}
        {/*  }}*/}
        {/*  merchantId={"paysafe"}*/}
        {/*  connection={connection}*/}
        {/*  blockchain={"solana"}*/}
        {/*  env={"local"}*/}
        {/*  amount={1}*/}
        {/*  disableApplePay={true}*/}
        {/*  transaction={transaction}*/}
        {/*/>*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 30,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  consoleArea: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  console: {
    flex: 1,
    backgroundColor: "#CCCCCC",
    color: "#ffffff",
    padding: 10,
    width: Dimensions.get("window").width - 60,
  },
  consoleText: {
    padding: 10,
  },
  buttonArea: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 30,
  },
});
