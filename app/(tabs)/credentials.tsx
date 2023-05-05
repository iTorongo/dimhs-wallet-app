import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import {
  getCredentialsFromWallet,
  getIssuedCredentials,
  storeCredentialToWallet,
} from "../api/services";

import { useIsFocused } from "@react-navigation/native";
import Card from "../../components/Card";
import {
  capitalizeFirstLetter,
  getSchemaDetailsFromId,
} from "../helpers/util.helpers";
import { EmptyCredential } from "../../components/EmptyCredential";
import { Center, Text, VStack } from "native-base";

export default function CredentialScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [credentials, setCredentials] = useState<any>([]);
  const isFocused = useIsFocused();

  const getStoredCredentials = () => {
    getCredentialsFromWallet()?.then((res) => {
      console.log(res);
      setCredentials(res.data?.results);
      setRefreshing(false);
    });
  };

  const storeCredToWallet = async () => {
    try {
      const res = await getIssuedCredentials();
      const credentialsToBeStored =
        res.data.results?.filter(
          (cred: any) => cred.state === "credential_received"
        ) ?? [];
      console.log(credentialsToBeStored);
      for (const cred of credentialsToBeStored) {
        const existingCredential = credentials?.find(
          (credential: any) =>
            credential.referent !== cred.credential_definition_id
        );
        if (!existingCredential) {
          console.log("new");
          const storeRes = await storeCredentialToWallet(
            cred.credential_exchange_id
          );
          console.log(storeRes);
          getStoredCredentials();
        }
      }
      setRefreshing(false);
    } catch (err) {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    isFocused && getStoredCredentials();
  }, [isFocused]);

  useEffect(() => {
    console.log(credentials);
    storeCredToWallet();
    return () => {};
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    storeCredToWallet();
  }, []);

  return (
    <ScrollView
      style={styles.cardContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {credentials?.length === 0 && (
        <EmptyCredential text="No credentials in your wallet!" />
      )}
      {credentials?.map((credential: any, index: number) => {
        const schemaDetails = getSchemaDetailsFromId(credential?.schema_id);

        const sortedAttributes = Object.entries(credential?.attrs ?? {}).sort(
          ([a], [b]) => a.localeCompare(b)
        );
        const descriptionNode = (
          <VStack width="full">
            {sortedAttributes?.map(([key, value]) => {
              const readableKey = capitalizeFirstLetter(
                key?.replaceAll("_", " ")
              );
              return (
                <Text fontSize="md" key={key}>
                  <Text
                    fontWeight="600"
                    color="coolGray.700"
                  >{`${readableKey} : `}</Text>
                  {`${value}`}
                </Text>
              );
            })}
          </VStack>
        );

        return (
          <Center mb='4'>
            <Card
              key={`cred-${index}`}
              title={capitalizeFirstLetter(schemaDetails[2])}
              description={descriptionNode}
            />
          </Center>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 8,
  },
});
