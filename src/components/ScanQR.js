import { View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg'; //https://www.npmjs.com/package/react-native-qrcode-svg
import logo from '../../assets/resetta-bone-logo.png';
import { Camera, CameraView } from 'expo-camera';
import RecordForm from './RecordForm';
import { updateCurrentUserScannedRecords } from '../../store/session';
import moment from 'moment';
// import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScanQR() {
    const sessionUser = useSelector(state => state.session.user)
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState('');
    const [currentRecord, setCurrentRecord] = useState('');
    const [page, setPage] = useState('my-qr') //or 'camera' or 'scan history' or 'my-qr'
    const dispatch = useDispatch();

    useEffect(() => {
        if(page === 'camera'){
            (async () => {
              const { status } = await Camera.requestCameraPermissionsAsync();
              setHasPermission(status === 'granted');
            })();
        }
    }, [page]);

    const handleBarCodeScanned = ({nativeEvent}) => {
        const {data, type} = nativeEvent;
        console.log(nativeEvent)
        setScanned(true);
        setScannedData(data);
        dispatch(updateCurrentUserScannedRecords(data));
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
    const isExpired = (dateTime) => {
        const now = new Date();
        const givenTime = new Date(dateTime);
        const diffInMS = now - givenTime; //difference in ms
        const diffInHours = diffInMS / (1000 * 60 * 60) //convert ms to hours
        return diffInHours > 2;
    } 

    if (page === 'camera' && hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (page === 'camera' && hasPermission === false) {
        return (
            <Text>Camera permission not granted</Text>
        );
    }
    if(scannedData){
        return (
            <View>
                <RecordForm userId={scannedData}/>
                <Pressable onPress={()=> setScannedData('')}><Text>Go Back</Text></Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            {page === 'my-qr' ? 
            (<View>
                <Text>My QRCode</Text>
                <QRCode value={sessionUser._id}//link to current user's record
                    logo={logo}
                    // color='#6495ED'
                />
                <Pressable onPress={()=> setPage('camera')}><Text>Scan QR</Text></Pressable>
                <Pressable onPress={()=> setPage('scan-history')}><Text>Scan History</Text></Pressable>
            </View>): 
            page === 'camera' ?
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
                    <Pressable title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
                )}
                {scannedData ? <Text>{scannedData}</Text> : null}
                <View style={{flex: 2}}> 
                    <Pressable onPress={()=> setPage('my-qr')}><Text>Go Back</Text></Pressable>
                </View>
            </View>):
            //page === 'scan-history'
            (<View>
                <View>
                    {sessionUser.scannedRecords.map((record) => (
                        <Pressable key={record._id} onPress={()=> setScannedData(record.recordUserId)} disabled={isExpired(record.scannedAt)}>
                            <Text>{moment(record.scannedAt).format("hh:mm:ss MMM/DD/YYYY")}</Text>
                            <Text>{record.fullName}</Text>
                            {isExpired(record.scannedAt) && <Text>Expired</Text>}
                        </Pressable>
                    ))}
                </View>

                <View style={{flex: 2}}> 
                    <Pressable onPress={()=> setPage('my-qr')}><Text>Go Back</Text></Pressable>
                </View>
            </View>)}
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