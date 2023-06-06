import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Center, Text, VStack, Badge, Button } from "native-base";
import Colors from "../../constants/Colors";
import { getPresentProofRequest } from "../api/services";
import { useState } from "react";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const [notification, setNotification] = useState();

  const colorScheme = useColorScheme();

  const getStoredCredentials = () => {
    getPresentProofRequest()?.then((res) => {
      console.log(res);
      if (res.data?.results?.length > 0) {
         setNotification(res.data?.results?.length);
      }
    });
  };

  getStoredCredentials();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6366f1",
      }}
    >
      <Tabs.Screen
        name="credentials"
        options={{
          title: "Credentials",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="vcard-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Scan QR",
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <VStack>
                    {!!notification && (
                      <Badge
                        colorScheme="danger"
                        rounded="full"
                        mb={-3.5}
                        mr={3}
                        zIndex={1}
                        variant="solid"
                        alignSelf="flex-end"
                        _text={{
                          fontSize: 12,
                        }}
                      >
                        {notification}
                      </Badge>
                    )}

                    <FontAwesome
                      name="bell"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 25, opacity: pressed ? 0.5 : 1 }}
                    />
                  </VStack>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: "Connections",
          tabBarIcon: ({ color }) => <TabBarIcon name="link" color={color} />,
        }}
      />
    </Tabs>
  );
}
