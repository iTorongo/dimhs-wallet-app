
import { StatusBar, Box, HStack, Text, IconButton, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export const  AppHeader = () => {
    return <>
        <StatusBar  barStyle="light-content" />
        <Box safeAreaTop bg="blue.500" />
        <HStack bg="blue.600" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" >
          <HStack alignItems="center">
            <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
            <Text color="white" fontSize="20" fontWeight="bold">
              Home
            </Text>
          </HStack>
          <HStack>
            <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
          </HStack>
        </HStack>
      </>;
  }