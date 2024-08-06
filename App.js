import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Chat from './src/components/chat';
import Splash from './src/components/Splash';
import RecordForm from './src/components/RecordForm'
import NavButtons from './src/components/NavButtons';
import SignUp from './src/components/SignUp';
import configureStore from './store/store';
import { Provider, useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { getCurrentUser } from './store/session';

let store = configureStore({});

function App(){
  const [loaded, setLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  return loaded && (
    <View style={styles.container}>
      {!currentUser && <SignUp />}
      {/* <Chat /> */}
      {currentUser && <RecordForm />}
      <StatusBar style="auto" />
      <NavButtons />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

