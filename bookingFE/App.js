/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchResultScreen from './src/screen/searchScreen';
import SlidersScreen from './src/screen/slidersScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
}
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#8EE9EF' : 'white',
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>

      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="SearchResult" component={SearchResultScreen} />
          <Stack.Screen name="SlidersScreen" component={SlidersScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;