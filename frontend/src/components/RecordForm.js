// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalInfoPage from '../screens/PersonalInfoPage';
import AllergiesPage from '../screens/AllergiesPage';
import HeartRatesPage from '../screens/HeartRatesPage';
import BloodPressuresPage from '../screens/BloodPressuresPage';
import ConditionsPage from '../screens/ConditionsPage';
import MedicationsPage from '../screens/MedicationsPage';
import ProceduresPage from '../screens/ProceduresPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PersonalInfo">
        <Stack.Screen name="PersonalInfo" component={PersonalInfoPage} />
        <Stack.Screen name="Allergies" component={AllergiesPage} />
        {/* <Stack.Screen name="HeartRates" component={HeartRatesPage} />
        <Stack.Screen name="BloodPressures" component={BloodPressuresPage} />
        <Stack.Screen name="Conditions" component={ConditionsPage} />
        <Stack.Screen name="Medications" component={MedicationsPage} />
        <Stack.Screen name="Procedures" component={ProceduresPage} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
