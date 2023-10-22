
import React, { useState } from 'react';
const Stack = createStackNavigator();
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/login/loginScreen';
import CreateAccount from './src/login/createAccount';
import CreateroomScreen from './src/app/createroomScreen';
import Themphong from './src/app/themphong';
import PersonDetail from './src/app/personDetail';
import ThongtinKS from './src/app/thongtinKS';
// import RoomDetail from './src/app/roomDetail';

// import { TokenProvider } from './src/token/tokenContext';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Drawer = createDrawerNavigator();
export default function App() {
const [isDarkMode, setIsDarkMode] = useState(false);
// const Tab = createBottomTabNavigator();
  return (  
    // <TokenProvider>
    <NavigationContainer>
    <Stack.Navigator    
  screenOptions={{ headerShown: false }} 
  initialRouteName="LoginScreen"> 
  <Stack.Screen name="CreateAccount" component={CreateAccount} />
  <Stack.Screen name="LoginScreen" component={LoginScreen} />
  <Stack.Screen name="CreateroomScreen" component={CreateroomScreen} />
  <Stack.Screen name="Themphong" component={Themphong} />
  <Stack.Screen name="PersonDetail" component={PersonDetail} />
  <Stack.Screen name="ThongtinKS" component={ThongtinKS} />
  {/* <Stack.Screen name="RoomDetail" component={RoomDetail} /> */}
</Stack.Navigator>
  </NavigationContainer>
  // </TokenProvider>
  );
}