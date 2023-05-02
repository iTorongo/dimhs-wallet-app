import React from "react";
import {
  Box,
  Heading,
  Text,
  Center,
  HStack,
  Stack,
} from "native-base";

// const LinearGradient = require('expo-linear-gradient').LinearGradient;
// const config = {
//     dependencies: {
//       'linear-gradient': LinearGradient
//     }
//   };
const Card = ({
  title,
  description,
  image = "https://via.placeholder.com/150",
}: Props) => {
  return (
    <Box alignItems="center" marginBottom='2'>
      <Box
        maxW="80"
        rounded="lg"
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
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {title}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              Verifiable Credentials
            </Text>
          </Stack>
          <Text fontWeight="400" >
            {description}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                6 mins ago
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Card;

interface Props {
  title: string;
  description?: string;
  image?: string;
}
