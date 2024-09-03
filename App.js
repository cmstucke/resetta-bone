import '@expo/metro-runtime'; //allows for auto refresh on web in development
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
// import Chat from './src/components/chat';
import Chat from './src/components/Chat';
import NavButtons from './src/components/NavButtons';
import SignUp from './src/components/SignUp';
import configureStore from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCurrentUser } from './store/session';
import Profile from './src/components/Profile';
import RecordForm from './src/components/RecordForm';
import ScanQR from './src/components/ScanQR';
import ExpandChat from './src/components/ExpandChat';
let store = configureStore({});

function App() {
  const [loaded, setLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const currentRecord = useSelector(state => state.entities.records)
  const dispatch = useDispatch();

  const [page, setPage] = useState('record');

  const pageDisplay = () => {
    if (page === 'record') {
      return <RecordForm />
    } else if (page === 'scanQR') {
      return <ScanQR />
    } else if (page === 'profile') {
      return <Profile />
    }
  }


  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <View style={styles.container}>
      {!currentUser ?
        (
          <View style={styles.content}>
            <SignUp />
          </View>
        )
        : (
          <View style={styles.content}>
            <View style={{ flex: 1, marginBottom: 100, width: Dimensions.get('window').width }}>
              {pageDisplay()}
            </View>
            <Chat style={{}} />
            {/* <ExpandChat style={{}} /> */}
            <NavButtons style={{}} page={page} setPage={setPage} />
          </View>
        )}
      <StatusBar style="auto" />
    </View>
  );

}


export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end', // Ensure content is pushed up
  },
  content: {
    flex: 1, // Take up remaining space
    justifyContent: 'center',
    alignItems: 'center',
  },

});
