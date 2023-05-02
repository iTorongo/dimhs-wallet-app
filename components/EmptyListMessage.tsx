import { StyleSheet } from "@bacons/react-views";
import { Text, View, Center } from "native-base";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const EmptyListMessage = ({ text }: Props) => {
  return (
    <View style={styles.emptyListContainer}>
        <Center>
      <FontAwesome size={28}  name='folder-open' />
      <Text style={styles.emptyListStyle}>{text ?? "No Data Found"}</Text></Center>
    </View>
  );
};

const styles = StyleSheet.create({
    emptyListContainer: {
        marginTop: 16
    },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: "center",
  },
});

interface Props {
  text?: string;
}
