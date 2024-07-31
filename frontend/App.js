import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './components/Splash';
import Chat from './components/chat';
import configureStore from './store/store';
import { Provider, useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';
import { getCurrentUser } from './store/session';

let store = configureStore({});

function App(){
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  return loaded && (
    <View style={styles.container}>
      <Splash />
      <Chat />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
