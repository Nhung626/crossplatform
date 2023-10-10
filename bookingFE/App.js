import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './src/loginscreen/startScreen';
import SignupScreen from './src/loginscreen/signupScreen';
import SignupSuccess from './src/loginscreen/signupSuccess';
import InformationScreen from './src/loginscreen/informationScreen';
import ForgetPassword from './src/loginscreen/forgetPassword';
import NewPassword from './src/loginscreen/newPassword';
import Notice from './src/loginscreen/notice';
import LoginScreen from './src/loginscreen/loginScreen';
// import { Provider } from 'react-redux';
// import store from './redux/store'; 

const Stack = createStackNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="StartScreen"
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
    // </Provider>
    
  );
}

const styles = StyleSheet.create({

});
