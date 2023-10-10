import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchValuesScreen from './src/screen/searchValuesScreen';
import MapScreen from './src/screen/mapScreen';
import HotelScreen from './src/screen/hotelScreen';
import SearchScreen from './src/screen/searchScreen';
import SearchIcon from './src/components/searchIcon';
import NumOfPeople from './src/components/numOfPeople';
import SlidersScreen from './src/screen/slidersScreen';
import Calendar from './src/components/calendarPicker';
import LoginScreen from './src/screen/loginScreen';
import PaymentScreen from './src/screen/paymentScreen';
import CheckReservar from './src/screen/checkReservar';


const Stack = createNativeStackNavigator();
const HidenHeader = {
    headerShown: false
}
export default function Navigations() {
    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={HidenHeader} initialRouteName='SearchValue'>
                <Stack.Screen name="SearchValue" component={SearchValuesScreen} />
                <Stack.Screen name="Hotel" component={HotelScreen} />
                <Stack.Screen name="Map" component={MapScreen} />
                <Stack.Screen name="SearchIcon" component={SearchIcon} options={{ presentation: 'modal' }} />
                <Stack.Screen name="NumOfPeople" component={NumOfPeople} />
                <Stack.Screen name="Slider" component={SlidersScreen} />
                <Stack.Screen name="Calendar" component={Calendar} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                <Stack.Screen name='CheckReservar' component={CheckReservar} />







            </Stack.Navigator>
        </NavigationContainer>
    );
}