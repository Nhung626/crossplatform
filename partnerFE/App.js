import React, { useState } from 'react';
const Stack = createStackNavigator();
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/loginScreen';
import CreateAccount from './src/createAccount';
import CreatenameScreen from './src/createnameScreen';
import CreatepassScreen from './src/createpassScreen';
export default function App() {
const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <NavigationContainer>
    <Stack.Navigator
  screenOptions={{ headerShown: false }} 
  initialRouteName="CreateAccount"> 
  <Stack.Screen name="CreateAccount" component={CreateAccount} />
  <Stack.Screen name="CreatenameScreen" component={CreatenameScreen} />
  <Stack.Screen name="CreatepassScreen" component={CreatepassScreen} />
  <Stack.Screen name="LoginScreen" component={LoginScreen} />
</Stack.Navigator>
  </NavigationContainer>
  );
}

