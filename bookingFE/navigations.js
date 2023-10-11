import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchValuesScreen from './src/screen/searchScreen/searchValuesScreen';
import MapScreen from './src/screen/searchScreen/mapScreen';
import HotelScreen from './src/screen/searchScreen/hotelScreen';
import SearchIcon from './src/components/searchIcon';
import NumOfPeople from './src/components/numOfPeople';
import SlidersScreen from './src/screen/searchScreen/slidersScreen';
import Calendar from './src/components/calendarPicker';
import PaymentScreen from './src/screen/searchScreen/paymentScreen';
import CheckReservar from './src/screen/searchScreen/checkReservar';

import MainScreen from './src/screen/mainScreen/MainScreen';
import SaveScreen from './src/screen/mainScreen/SaveScreen';
import BookingScreen from './src/screen/mainScreen/BookingScreen';
import UserScreen from './src/screen/mainScreen/UserScreen';

import LoginScreen from './src/screen/loginscreen/loginScreen';
import StartScreen from './src/screen/loginscreen/startScreen';
import SignupScreen from './src/screen/loginscreen/signupScreen';
import SignupSuccess from './src/screen/loginscreen/signupSuccess';
import InformationScreen from './src/screen/loginscreen/informationScreen';
import ForgetPassword from './src/screen/loginscreen/forgetPassword';
import NewPasswordScreen from './src/screen/loginscreen/newPassword';
import Notice from './src/screen/loginscreen/notice';


const Stack = createNativeStackNavigator();
const HidenHeader = {
    headerShown: false
}
export default function Navigations() {
    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={HidenHeader} initialRouteName='LoginScreen'>
                <Stack.Screen name="Notice" component={Notice} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen name="SignupSuccess" component={SignupSuccess} />
                <Stack.Screen name="InformationScreen" component={InformationScreen} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="NewPassword" component={NewPasswordScreen} />


                <Stack.Screen name='MainScreen' component={MainScreen} />
                <Stack.Screen name='SaveScreen' component={SaveScreen} />
                <Stack.Screen name='BookinhScreen' component={BookingScreen} />
                <Stack.Screen name='UserScreen' component={UserScreen} />
                <Stack.Screen name='Map' component={MapScreen} />

                <Stack.Screen name="SearchValue" component={SearchValuesScreen} />
                <Stack.Screen name="Hotel" component={HotelScreen} />
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