import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { getCredentialsFromWallet,getIssuedCredentials, storeCredentialToWallet } from "../api/services";

import {
  Heading,
  Stack,
  Input,
  Center,
  Box,
  VStack,
  Divider,
} from "native-base";
import { useIsFocused } from '@react-navigation/native';
import Card from "../../components/Card";

export default function CredentialScreen() {
  const [credentials, setCredentials] = useState();
  const isFocused = useIsFocused()

  const getStoredCredentials = () => {
    getCredentialsFromWallet()?.then((res) => {
      console.log(res)
      setCredentials(res.data?.results)
    });
  }

  useEffect(() => {
    getStoredCredentials()
  }, [isFocused]);

  // useEffect(() => {
  //   const storeCredsToWallet = async () => {
  //     try {
  //       const res = await getIssuedCredentials();
  //       const credsToBeStored = res.data.results?.filter((cred: any) => cred.state === 'credential_received') ?? [];
  //       console.log(credsToBeStored);
  //       for (const cred of credsToBeStored) {
  //         const storeRes = await storeCredentialToWallet(cred.credential_exchange_id);
  //         console.log(storeRes);
  //         getStoredCredentials()
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   storeCredsToWallet();
    
  //   return () => {};
  // }, [isFocused]);

  return (
    <Center>
      <ScrollView style={styles.cardContainer}>
   
        <Card title="Lorem Insdum Tolem" description="Lorem ispunm todasdk dsakdksajd kajdksa daksjd aksd " />
      </ScrollView>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer : {
    marginTop: 16
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    padding: 8,
    fontSize: 18,
    margin: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#efefef",
  },
  text: {
    paddingBottom: 6,
  },
});
