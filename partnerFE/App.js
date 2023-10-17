
import React, { useState } from 'react';
const Stack = createStackNavigator();
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/login/loginScreen';
import CreateAccount from './src/login/createAccount';
import CreateroomScreen from './src/app/createroomScreen';
import Themphong from './src/app/themphong';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Drawer = createDrawerNavigator();
export default function App() {
const [isDarkMode, setIsDarkMode] = useState(false);
// const Tab = createBottomTabNavigator();
  return (  
    <NavigationContainer>
    <Stack.Navigator    
  screenOptions={{ headerShown: false }} 
  initialRouteName="LoginScreen"> 
  <Stack.Screen name="CreateAccount" component={CreateAccount} />
  <Stack.Screen name="LoginScreen" component={LoginScreen} />
  <Stack.Screen name="CreateroomScreen" component={CreateroomScreen} />
  <Stack.Screen name="Themphong" component={Themphong} />
</Stack.Navigator>
  </NavigationContainer>
  );
}