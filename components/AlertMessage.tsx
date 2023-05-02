import {
  Alert,
  Center,
  Box,
  VStack,
  Text,
  IconButton,
  CloseIcon,
  HStack,
  Collapse,
} from "native-base";
import { useEffect, useState } from "react";

export const AlertMessage = ({
  showAlert,
  text,
  subText,
  status = "success",
}: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!!showAlert);
  }, [showAlert]);

  return (
    <Center>
      <Collapse isOpen={show}>
        <VStack space={5} maxW="400">
          <Alert w="100%" status={status}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack space={2} flexShrink={1} alignItems="center">
                  <Alert.Icon />
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    _dark={{
                      color: "coolGray.800",
                    }}
                  >
                    {text}
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                  icon={<CloseIcon size="3" />}
                  _icon={{
                    color: "coolGray.600",
                  }}
                  onPress={() => setShow(false)}
                />
              </HStack>
              <Box
                pl="6"
                _dark={{
                  _text: {
                    color: "coolGray.600",
                  },
                }}
              >
                {subText}
              </Box>
            </VStack>
          </Alert>
        </VStack>
      </Collapse>
    </Center>
  );
};

interface Props {
  showAlert: boolean;
  text: string;
  status?: string;
  subText?: string;
}
