import React, { useState } from 'react';
const Stack = createStackNavigator();
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/login/loginScreen';
import CreateAccount from './src/login/createAccount';
import CreatenameScreen from './src/login/createnameScreen';
import CreatepassScreen from './src/login/createpassScreen';
import CreateroomScreen from './src/app/createroomScreen';
import Themphong from './src/app/themphong';
const Drawer = createDrawerNavigator();
export default function App() {
const [isDarkMode, setIsDarkMode] = useState(false);

  return (  
    <NavigationContainer>
    <Stack.Navigator
  screenOptions={{ headerShown: false }} 
  initialRouteName="CreateroomScreen"> 
  <Stack.Screen name="CreateAccount" component={CreateAccount} />
  <Stack.Screen name="CreatenameScreen" component={CreatenameScreen} />
  <Stack.Screen name="CreatepassScreen" component={CreatepassScreen} />
  <Stack.Screen name="LoginScreen" component={LoginScreen} />
  <Drawer.Screen name="CreateroomScreen" component={CreateroomScreen} />
  <Stack.Screen name="Themphong" component={Themphong} />
</Stack.Navigator>
  </NavigationContainer>
  );
}

