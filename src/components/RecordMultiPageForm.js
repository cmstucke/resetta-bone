// // App.js
// import * as React from 'react';
// import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import PersonalInfoPage from '../screens/PersonalInfoPage';
// // import AllergiesPage from '../screens/AllergiesPage';
// // import HeartRatesPage from '../screens/HeartRatesPage';
// // import BloodPressuresPage from '../screens/BloodPressuresPage';
// // import ConditionsPage from '../screens/ConditionsPage';
// // import MedicationsPage from '../screens/MedicationsPage';
// // import ProceduresPage from '../screens/ProceduresPage';
// // import { useDispatch } from 'react-redux';
// // import { enableScreens } from 'react-native-screens';
// // // enableScreens();

// const Stack = createStackNavigator();
// // const windowWidth = Dimensions.get('window').width;
// const globalScreenOptions = {
//   headerStyle: { backgroundColor: "#2C6BED" },
//   headerTitleStyle: { color: "white" },
//   headerTintColor: "white",
//   flex: 1
// };


// export default function App() {
//   return (
//     <NavigationContainer>
//       <Text>Hello</Text>
//       <Stack.Navigator initialRouteName="PersonalInfo" screenOptions={globalScreenOptions}>
//         <Stack.Screen name="Personal Info" component={PersonalInfoPage} />
//         {/* <Stack.Screen name="Allergies" component={AllergiesPage} /> */}
//         {/* <Stack.Screen name="HeartRates" component={HeartRatesPage} />
//         <Stack.Screen name="BloodPressures" component={BloodPressuresPage} />
//         <Stack.Screen name="Conditions" component={ConditionsPage} />
//         <Stack.Screen name="Medications" component={MedicationsPage} />
//         <Stack.Screen name="Procedures" component={ProceduresPage} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from './styles';
import PersonalInfoPage from '../screens/PersonalInfoPage';
import AllergiesPage from '../screens/AllergiesPage';

export default function RecordMultiPageForm() {
  const dispatch = useDispatch();
  const userRecord = useSelector((state) => state.entities.records);
  const [formData, setFormData] = useState({});
  const [screen, setScreen] = useState(1);
 
  useEffect(()=> {
    //fetch user record and update formData
    //useDispatch()
    if(userRecord){
      setFormData(userRecord);
    }
  }, [userRecord])

  

  const ScreenDisplay = () => {
    if(screen === 0){
      return <PersonalInfoPage formData={formData} setFormData={setFormData}/>
    } else if (screen === 1){
      return <AllergiesPage formData={formData} setFormData={setFormData}/>
    } else if (screen === 2){
      return <AllergiesPage />
    }
  }
  return (
    <View style={{justifyContent: 'center', alignContent: 'center',}}>
      <View>{ScreenDisplay()}</View>
      <View style={{backgroundColor: 'red', flexDirection:'row', justifyContent: 'space-between'}}>
        <View style={globalStyles.buttonContainer}>
          <Pressable disabled={screen === 0} onPress={() => setScreen((currScreen) => currScreen - 1)}>
            <Text>Prev</Text>
          </Pressable>
        </View>
        <View style={globalStyles.buttonContainer}>
          <Pressable disabled={screen === 2} onPress={() => setScreen((currScreen) => currScreen + 1)}>
            <Text>Next</Text>
          </Pressable >
        </View>
      </View>
    </View>
  )
}