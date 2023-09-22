import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './src/startScreen';
import SignupScreen from './src/signupScreen';
import SignupSuccess from './src/signupSuccess';
import InformationScreen from './src/informationScreen';
import ForgetPassword from './src/forgetPassword';
import NewPassword from './src/newPassword';
import Notice from './src/notice';
import LoginScreen from './src/loginScreen';
const Stack = createStackNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }} // Ẩn tiêu đề trên tất cả các màn hình
        initialRouteName="Notice"
      >
        <Stack.Screen name ="Notice" component={Notice}/>
        <Stack.Screen name ="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="SignupSuccess" component={SignupSuccess} />
        <Stack.Screen name="InformationScreen" component={InformationScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   backgroundColor: '#ecf0f1',
  //   padding: 8,
  // },
});
