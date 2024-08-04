// App.js
import * as React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalInfoPage from '../screens/PersonalInfoPage';
import AllergiesPage from '../screens/AllergiesPage';
import HeartRatesPage from '../screens/HeartRatesPage';
import BloodPressuresPage from '../screens/BloodPressuresPage';
import ConditionsPage from '../screens/ConditionsPage';
import MedicationsPage from '../screens/MedicationsPage';
import ProceduresPage from '../screens/ProceduresPage';
import { signup } from '../../store/session';
import { useDispatch } from 'react-redux';

const Stack = createStackNavigator();

export default function App() {
  const dispatch = useDispatch();
  return (
    // <View>
      // <Text>Hello</Text>
      <Pressable onPress={dispatch(signup)}><Text>Press</Text></Pressable>
    // </View>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="PersonalInfo">
    //     <Stack.Screen name="PersonalInfo" component={PersonalInfoPage} />
    //     <Stack.Screen name="Allergies" component={AllergiesPage} />
    //     {/* <Stack.Screen name="HeartRates" component={HeartRatesPage} />
    //     <Stack.Screen name="BloodPressures" component={BloodPressuresPage} />
    //     <Stack.Screen name="Conditions" component={ConditionsPage} />
    //     <Stack.Screen name="Medications" component={MedicationsPage} />
    //     <Stack.Screen name="Procedures" component={ProceduresPage} /> */}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
