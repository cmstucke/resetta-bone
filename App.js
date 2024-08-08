import '@expo/metro-runtime'; //allows for auto refresh on web in development
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Chat from './src/components/chat';
import Splash from './src/components/Splash';
import RecordMultiPageForm from './src/components/RecordMultiPageForm'
import NavButtons from './src/components/NavButtons';
import SignUp from './src/components/SignUp';
import configureStore from './store/store';
import { Provider, useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { getCurrentUser } from './store/session';
import Profile from './src/components/Profile';
import RecordForm from './src/components/RecordForm';
import ScanQR from './src/components/ScanQR';

let store = configureStore({});

function App(){
  const [loaded, setLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const currentRecord = useSelector(state => state.entities.records)
  const dispatch = useDispatch();
  
  const [page, setPage] = useState('record');
  
  const pageDisplay = () => {
    if(page === 'record'){
      return <RecordForm />
    } else if(page === 'scanQR'){
      return <ScanQR />
    } else if (page === 'profile'){
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
          {pageDisplay()}
          {/* <Chat /> */}
          <NavButtons style={{}} page={page} setPage={setPage}/>
        </View>
      )}
      {/* {currentUser && !currentRecord._id && <RecordMultiPageForm />} */}
      <StatusBar style="auto" />
    </View>
  );

}


export default function Root() {
  return(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Ensure content is pushed up
  },
  content: {
    flex: 1, // Take up remaining space
    justifyContent: 'center',
    alignItems: 'center',
  },

});

