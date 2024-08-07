import { View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import QRCode from 'react-native-qrcode-svg'; //https://www.npmjs.com/package/react-native-qrcode-svg
import logo from '../../assets/resetta-bone-logo.png';
import { Camera } from 'expo-camera';
// import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScanQR() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState('');

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScannedData(data);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return (
            <Text>Camera permission not granted</Text>
        );
    }

    return (
        <View>
            <View>
                <Text>MyQRCode</Text>
                <QRCode value="http://awesome.link.qr" //link to current user's record
                    logo={logo}
                    // color='#6495ED'
                />

            </View>
            <View style={styles.container}>
                <Camera
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                    barCodeScannerSettings={{
                        barCodeTypes: ['qr'],
                    }}
                />
                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
                )}
                {scannedData ? <Text>{scannedData}</Text> : null}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });