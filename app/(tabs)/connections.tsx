import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, RefreshControl } from "react-native";
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
  IconButton,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

export default function ConnectionScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [connections, setConnections] = useState();
  const isFocused = useIsFocused();

  const getConnectionList = () => {
    getConnections()
      .then((res) => {
        setConnections(res.data.results);
        console.log(res.data);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log("connection", err.config);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    console.log("Render");
    if (isFocused) {
      getConnectionList();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getConnectionList();
  }, []);

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
    <FlatList
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={connections}
      ListEmptyComponent={
        <EmptyListMessage image="process" text="No connection available!" />
      }
      renderItem={({ item }: { item: any }) => (
        <View style={styles.item}>
          <HStack justifyContent="space-between">
            <VStack>
              <Heading size="md" mb="1">
                {item.their_label}
              </Heading>
              <Text>
                <Badge
                  colorScheme={getStateStatus(item.state)}
                  variant="solid"
                  borderRadius="sm"
                  paddingX="0.5"
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                >
                  <Text color="white" fontSize="sm">
                    {item.state}
                  </Text>
                </Badge>
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
                fontSize="xs"
                marginTop="1"
              >
                Last Update: {formattedDateTime(item.updated_at)}
              </Text>
            </VStack>
            <VStack alignItems="center" justifyContent="center">
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  item: {
    padding: 8,
    fontSize: 18,
    margin: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#bae6fd",
    backgroundColor: "#bae6fd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4
  },
});
