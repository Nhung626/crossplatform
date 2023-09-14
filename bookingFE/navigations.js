import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchValuesScreen from './src/screen/searchValuesScreen';
import SlidersScreen from './src/screen/slidersScreen';


const Stack = createNativeStackNavigator();
const HidenHeader = {
    headerShown: false
}
export default function Navigations() {
    return (
        
        <NavigationContainer>
            <Stack.Navigator screenOptions={HidenHeader}>
                <Stack.Screen name="Search" component={SearchValuesScreen} />
                <Stack.Screen name="Slider" component={SlidersScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}