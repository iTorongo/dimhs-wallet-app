import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { EmptyListMessage } from "../../components/EmptyListMessage";
import { View } from "../../components/Themed";
import { getConnections } from "../api/services";
import { useIsFocused } from "@react-navigation/native";
import { formattedDateTime } from "../helpers/util.helpers";

import {
  Badge,
  Text,
  Heading,
  FlatList,
  HStack,
  VStack,
  ScrollView,
  IconButton,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

export default function ConnectionScreen() {
  const [connections, setConnections] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("Render");
    getConnections()
      .then((res) => {
        setConnections(res.data.results);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("connection", err.config);
      });
  }, [isFocused]);

  const getStateStatus = (
    state: "active" | "invitation" | "completed" | "request" | "response"
  ) => {
    switch (state) {
      case "active":
      case "completed":
        return "success";
      case "invitation":
        return "info";
      case "response":
        return "warning";
      default:
        return "default";
    }
  };
  return (
    <ScrollView>
      <FlatList
        data={connections}
        ListEmptyComponent={<EmptyListMessage />}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.item}>
            <HStack justifyContent='space-between'>
              <VStack>
                <Heading size="md" mb="1">
                  {item.their_label}
                </Heading>
                <Text>
                  <Badge
                    colorScheme={getStateStatus(item.state)}
                    borderRadius="md"
                    paddingX="0.5"
                  >
                    <Text>{item.state}</Text>
                  </Badge>
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                  fontSize="xs"
                >
                  Last Update: {formattedDateTime(item.updated_at)}
                </Text>
              </VStack>
              <VStack alignItems='center' justifyContent='center'>
                <IconButton
                  size="sm"
                  variant="outline"
                  colorScheme="danger"
                  _icon={{
                    as: AntDesign,
                    name: "delete",
                  }}
                />
              </VStack>
            </HStack>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  item: {
    padding: 8,
    fontSize: 18,
    margin: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#bae6fd",
    backgroundColor: "#f0f9ff",
  },
});
