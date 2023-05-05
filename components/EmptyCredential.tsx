import { StyleSheet } from "@bacons/react-views";
import { Text, View, Center, Image } from "native-base";

export const EmptyCredential= ({ text, image }: Props) => {
 

  return (
    <View style={styles.emptyListContainer}>
      <Center>
        {/* <FontAwesome size={28}  name='folder-open' /> */}
        <Center>
          <Image
            source={ require('./img/card.png')}
            alt="Alternate Text"
            size="2xl"
          />
        </Center>
        <Text color='#6C63FF' style={styles.emptyListStyle}>{text ?? "No Data Found!"}</Text>
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyListContainer: {
    marginTop: 16,
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: "center",
  },
});

interface Props {
  text?: string;
  image?: 'connection' | 'card' | 'encrypt' | 'auth' | 'empty' | 'process'
}
