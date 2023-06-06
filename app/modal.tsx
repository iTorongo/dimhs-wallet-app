import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import {
  Text,
  Heading,
  FlatList,
  HStack,
  VStack,
  IconButton,
  Button,
  Avatar,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { getCredentialsFromWallet, getPresentProofRequest, senProofPresentation } from "./api/services";
import { useEffect, useState } from "react";


const PRESENTATION_REQUEST_INDEX = 0

export default function ModalScreen() {
  const [attributes, setAttributes] = useState<any>();
  const [presentationExId, setPresentationExId] = useState<any>();
  const [credentials, setCredentials] = useState<any>([]);

  const getPresentationProofReq= () => {
    getPresentProofRequest()?.then((res) => {
      setAttributes(
        res?.data?.results[PRESENTATION_REQUEST_INDEX]?.presentation_request?.requested_attributes
      );
      setPresentationExId(res?.data?.results[PRESENTATION_REQUEST_INDEX]?.presentation_exchange_id);
    });
  };


  const getStoredCredentials = () => {
    getCredentialsFromWallet()?.then((res) => {
      console.log(res);
      setCredentials(res.data?.results);
    });
  };

  console.log(attributes);
  console.log(credentials);

  useEffect(() => {
    getPresentationProofReq();
    getStoredCredentials()
  }, []);

  const proofPresentationJson = {
    requested_predicates: {},

    trace: false,
    self_attested_attributes: {
    },

    requested_attributes: {
      // "0_SSID_uuid": {
      //   cred_id: credentials[0]?.referent,
      //   revealed: true,
      // },
      "0_email_uuid": {
        cred_id: credentials[0]?.referent,
        revealed: true,
      },
    },
  };

  const sentProofToVerifier = async () => {
    try {
      const sentProof = await senProofPresentation(
        presentationExId,
        proofPresentationJson
      );
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const displayAttributes = [{
      name: 'Email',
      value: credentials[0]?.attrs?.email
    }, {
      name: 'SSID',
      value: credentials[0]?.attrs?.SSID
    }]
  
    console.log(credentials)

  return (
    <View style={styles.container}>
      <HStack alignItems="center">
        <VStack width="100%" mt="5" mb="5" alignItems="center">
          <Text fontWeight="500" fontSize="md" mb="2" color="coolGray.500">
            Requested by Hospital
          </Text>
          <Avatar bg="lightBlue.500" size="lg">
            <Text fontWeight="600" fontSize="3xl" color="#fff">
              H
            </Text>
          </Avatar>
        </VStack>
      </HStack>
      <FlatList
        data={displayAttributes}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.item}>
            <HStack justifyContent="space-between">
              <VStack>
                {/* <Heading size="md" mb="1">
                  {item.their_label}
                </Heading> */}
                <Text fontWeight="500" fontSize="md">
                  {item?.name}
                </Text>
                <Text
                  color="coolGray.400"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                  fontSize="md"
                  marginTop="1"
                >
                  {item?.value}
                </Text>
              </VStack>
              <VStack alignItems="center" justifyContent="center">
                <IconButton
                  size="md"
                  _icon={{
                    color: "coolGray.600",
                    as: AntDesign,
                    name: "right",
                  }}
                />
              </VStack>
            </HStack>
          </View>
        )}
      />

      <HStack width="100%" justifyContent="center" mb="10">
        <VStack mt="5" space={2} width="70%">
          <Button colorScheme="green" onPress={sentProofToVerifier}>Share Attribute</Button>
          <Button variant="outline" size="sm" colorScheme="danger">
            Reject
          </Button>
        </VStack>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    paddingBottom: 4,
    fontSize: 18,
    borderWidth: 0,
    borderBottomWidth: 1.5,
    borderColor: "#efefef",
  },
});
