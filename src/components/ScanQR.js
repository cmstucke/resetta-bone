import { View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import QRCode from 'react-native-qrcode-svg'; //https://www.npmjs.com/package/react-native-qrcode-svg
import logo from '../../assets/resetta-bone-logo.png';
import { Camera, CameraView } from 'expo-camera';
// import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScanQR() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState('');
    const [page, setPage] = useState('my-qr') //or 'camera'

    useEffect(() => {
        if(page === 'camera'){
            (async () => {
              const { status } = await Camera.requestCameraPermissionsAsync();
              setHasPermission(status === 'granted');
            })();
        }
    }, [page]);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScannedData(data);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (page === 'camera' && hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (page === 'camera' && hasPermission === false) {
        return (
            <Text>Camera permission not granted</Text>
        );
    }

    return (
        <View style={styles.container}>
            {page === 'my-qr' ? 
            (<View>
                <Text>MyQRCode</Text>
                <QRCode value="http://awesome.link.qr" //link to current user's record
                    logo={logo}
                    // color='#6495ED'
                />
                <Pressable onPress={()=> setPage('camera')}><Text>Scan QR</Text></Pressable>
            </View>):
            (<View style={{flex: 1, backgroundColor: '#DCDCDC', width: 425}}>
                <View style={{flex: 1}}> 

                </View>
                <CameraView
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{flex: 14}}
                    barCodeScannerSettings={{
                        barCodeTypes: ['qr'],
                    }}
                />
                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
                )}
                {scannedData ? <Text>{scannedData}</Text> : null}
                <View style={{flex: 2}}> 
                    <Pressable onPress={()=> setPage('my-qr')}><Text>Go Back</Text></Pressable>
                </View>
            </View>)
            }
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