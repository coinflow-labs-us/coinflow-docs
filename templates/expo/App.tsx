import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import Web3Auth, { OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import RPC from "./solanaRPC";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { CoinflowWithdraw } from "@coinflowlabs/react-native";

const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo ||
  Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: "coinflow" }); // Replace Coinflow with your app's scheme

const clientId =
  "BKPNPUxXPoDfsjTw6AF1dfMJdyzYeXMskYWmObAcicEdSYS91NVb_cMeIVZIi_M55jF-i3wiNRaVblr5347Clss";

export default function App() {
  const [key, setKey] = useState<string | undefined>(undefined);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);

  const login = async () => {
    try {
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.TESTNET, // MAINNET, AQUA, CELESTE, CYAN or TESTNET
      });

      const info = await web3auth.login({
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: "default", // Pass on the mfa level of your choice: default, optional, mandatory, none
        loginProvider: "google", // Pass on the login provider of your choice: google, facebook, discord, twitch, twitter, github, linkedin, apple, etc.
        curve: "ED25519", // This is the scheme for solana
      });
      setKey(info.ed25519PrivKey);
      console.log("Logged In");

      if (!info.ed25519PrivKey) return;
      const publicKey = await RPC.getAccounts(info.ed25519PrivKey);
      setPublicKey(publicKey);
    } catch (e) {
      console.log(e);
    }
  };

  const sendTransaction = async (transaction: Transaction) => {
    if (!key) return "";
    const tx = await RPC.sendTransaction(key, transaction);
    console.log(tx);
    return tx;
  };

  const connection = useMemo(
    () => new Connection("https://api.devnet.solana.com", "confirmed"),
    []
  );

  useEffect(() => {
    console.log(publicKey?.toString());
  }, [publicKey]);

  const loggedInView = (
    <View>
      <Text>Public key: {publicKey?.toString()}</Text>
      <CoinflowWithdraw
        style={styles.container}
        wallet={{
          publicKey,
          sendTransaction,
        }}
        merchantId={"paysafe"}
        connection={connection}
        blockchain={"solana"}
        env={"staging"}
      />
    </View>
  );

  const unloggedInView = (
    <View style={styles.buttonArea}>
      <Button title="Login with Web3Auth" onPress={login} />
    </View>
  );

  return (
    <View style={styles.container}>{key ? loggedInView : unloggedInView}</View>
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
