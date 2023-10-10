import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen';
import AddScreen from './src/screens/AddScreen';
import SaveScreen from './src/screens/SaveScreen';
import BookingScreen from './src/screens/BookingScreen';
import UserScreen from './src/screens/UserScreen';

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
        initialRouteName="MainScreen"
      >
        <Stack.Screen name='MainScreen' component={MainScreen} />
        <Stack.Screen name='AddScreen' component={AddScreen} />
        <Stack.Screen name='SaveScreen' component={SaveScreen} />
        <Stack.Screen name='BookingScreen' component={BookingScreen} />
        <Stack.Screen name='UserScreen' component={UserScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>

  );
}

const styles = StyleSheet.create({

});
