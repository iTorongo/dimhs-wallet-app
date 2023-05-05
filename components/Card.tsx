import React from "react";
import { Box, Heading, Text, Center, HStack, Stack } from "native-base";
import { StyleSheet } from "react-native";

const Card = ({
  title,
  description,
  image = "https://via.placeholder.com/150",
}: Props) => {
  return (
    <Box rounded="2xl" style={styles.card}>
      <Box
        width="sm"
        rounded="2xl"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "tertiary.400",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "tertiary.400",
        }}
      >
        <HStack alignItems="center" backgroundColor="indigo.600" px="4" py="1">
          <Heading size="sm" ml="-1" color="white">
            Credentials of {title}
          </Heading>
        </HStack>
        <Stack p="4">
          {/* <Stack space={2}>
            <Text
              fontSize="sm"
              _light={{
                color: "violet.700",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
            </Text>
          </Stack> */}
          <Text fontWeight="400">{description}</Text>
          {/* <HStack alignItems="center" space={4} justifyContent="space-between" mt='2'>
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                0 mins ago
              </Text>
            </HStack>
          </HStack> */}
        </Stack>
      </Box>
    </Box>
  );
};

export default Card;

interface Props {
  title: string;
  description?: string | JSX.Element;
  image?: string;
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
});
