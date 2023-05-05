import { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button } from "native-base";
import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";
import { Text, View } from "../../components/Themed";
import queryString from "query-string";
import base64 from "react-native-base64";
import { acceptConnectionInvitation, receiveConnectionInvitation } from "../api/services";
import { ConfirmModal } from "../../components/ConfirmModal";
import { AlertMessage } from "../../components/AlertMessage";
import { useIsFocused } from '@react-navigation/native';


export default function ScanScreen() {
  const [startScan, setStartScan] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);
  const [connectionInvitation, setConnectionInvitation] = useState<any>();

  const isFocused = useIsFocused()

  console.log('render')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  const startScanning = () => {
    setStartScan(true)
    setShowConnectionAlert(false)
  }

  const handleBarCodeScanned = ({ type, data }: any) => {
    let parsed = queryString.parseUrl(data).query.c_i;
    const parsedObj = 
      JSON.parse(base64.decode(`${parsed}`))
    setConnectionInvitation(parsedObj);
    setOpenConfirmModal(true);
    setStartScan(false);
  };

  // const handleAcceptConnection =  () => {
  //   receiveConnectionInvitation(connectionInvitation).then(res => {
  //     setConnectionInvitation(res.data)
  //     acceptConnectionInvitation(res?.data?.connection_id).then(res => {
  //       setConnectionInvitation(res.data)
  //       setShowConnectionAlert(true)
  //     }).catch(err => {
  //       console.log('accept error', err)
  //     })
  //   }).catch((err) => {
  //     console.log('receive err', err)
  //   })
  // };
  const handleAcceptConnection = async () => {
    try {
      const receivedInvitation = await receiveConnectionInvitation(connectionInvitation);
      const acceptedInvitation = await acceptConnectionInvitation(receivedInvitation?.data?.connection_id);
      setConnectionInvitation(acceptedInvitation.data);
      setShowConnectionAlert(true);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const onAcceptConnection = () => {
    setOpenConfirmModal(false);
    console.log("Hey");
    handleAcceptConnection()
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button variant="subtle" onPress={() => askForCameraPermission()}>
          Allow Camera
        </Button>
      </View>
    );
  }

  // Return the View
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {startScan ? (
          <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={{ height: 400, width: 400 }}
              focusable
            />
          </View>
        ) : (
          <Button variant='solid' colorScheme='indigo' size="lg" onPress={startScanning}>
              Start Scanning...
          </Button>
        )}
      </View>
      <AlertMessage
        text={"Connection has been established!"}
        subText="You can see the list of requested and active connection in connection screen."
        showAlert={showConnectionAlert}
      />
      <ConfirmModal
        text={connectionInvitation?.label}
        openModal={openConfirmModal}
        onCloseConfirmModal={() => setOpenConfirmModal(false)}
        onConfirm={onAcceptConnection}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
