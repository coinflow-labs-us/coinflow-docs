import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import Web3Auth, { OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import RPC from "./solanaRPC";
import { State } from "@web3auth/react-native-sdk/src/types/State";
import { Transaction } from "@solana/web3.js";

const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo ||
  Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: "coinflow" }); // Replace Coinflow with your app's scheme

const clientId =
  "BKPNPUxXPoDfsjTw6AF1dfMJdyzYeXMskYWmObAcicEdSYS91NVb_cMeIVZIi_M55jF-i3wiNRaVblr5347Clss";

export default function App() {
  const [key, setKey] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<State | null>(null);
  const [web3AuthConsole, setWeb3AuthConsole] = useState("");

  const login = async () => {
    try {
      setWeb3AuthConsole("Logging in");
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.TESTNET, // MAINNET, AQUA, CELESTE, CYAN or TESTNET
      });

      console.log({ resolvedRedirectUrl });

      const info = await web3auth.login({
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: "default", // Pass on the mfa level of your choice: default, optional, mandatory, none
        loginProvider: "google", // Pass on the login provider of your choice: google, facebook, discord, twitch, twitter, github, linkedin, apple, etc.
        curve: "ED25519", // This is the scheme for solana
      });

      setUserInfo(info);
      console.log({ info });
      setKey(info.ed25519PrivKey);
      uiConsole("Logged In");
    } catch (e) {
      uiConsole(e);
    }
  };

  const getAccounts = async () => {
    setWeb3AuthConsole("Getting account");
    if (!key) return;
    const address = await RPC.getAccounts(key);
    uiConsole(address);
  };
  const sendTransaction = async () => {
    setWeb3AuthConsole("Sending transaction");
    if (!key) return;
    const tx = await RPC.sendTransaction(key, new Transaction());
    uiConsole(tx);
  };

  const uiConsole = (...args: unknown[]) => {
    console.log(args);
    setWeb3AuthConsole(
      JSON.stringify(args || {}, null, 2) + "\n\n\n\n" + web3AuthConsole
    );
  };

  const loggedInView = (
    <View style={styles.buttonArea}>
      <Button title="Get User Info" onPress={() => uiConsole(userInfo)} />
      <Button title="Get Accounts" onPress={() => getAccounts()} />
      <Button title="Send Transaction" onPress={() => sendTransaction()} />
      <Button title="Get Private Key" onPress={() => uiConsole(key)} />
      <Button title="Log Out" onPress={() => setKey("")} />
    </View>
  );

  const unloggedInView = (
    <View style={styles.buttonArea}>
      <Button title="Login with Web3Auth" onPress={login} />
    </View>
  );

  return (
    <View style={styles.container}>
      {key ? loggedInView : unloggedInView}
      <View style={styles.consoleArea}>
        <Text style={styles.consoleText}>Console:</Text>
        <ScrollView style={styles.console}>
          <Text>{web3AuthConsole}</Text>
        </ScrollView>
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
