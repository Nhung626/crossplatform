import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchValuesScreen from './src/screen/searchScreen/searchValuesScreen';
import MapScreen from './src/screen/searchScreen/mapScreen';
import HotelScreen from './src/screen/searchScreen/hotelScreen';
import SearchIcon from './src/components/searchIcon';
import SlidersScreen from './src/screen/searchScreen/slidersScreen';
import PaymentScreen from './src/screen/searchScreen/paymentScreen';
import CheckReservar from './src/screen/searchScreen/checkReservar';

import MainScreen from './src/screen/mainScreen/MainScreen';
import SaveScreen from './src/screen/mainScreen/SaveScreen';
import BookingScreen from './src/screen/mainScreen/BookingScreen';
import UserScreen from './src/screen/mainScreen/UserScreen';
import inforRoomScreen from './src/screen/searchScreen/inforRoomScreen';



import LoginScreen from './src/screen/loginscreen/loginScreen';
import StartScreen from './src/screen/loginscreen/startScreen';
import SignupScreen from './src/screen/loginscreen/signupScreen';
import InformationScreen from './src/screen/loginscreen/informationScreen';
import ForgetPassword from './src/screen/loginscreen/forgetPassword';
import NewPasswordScreen from './src/screen/loginscreen/newPassword';
import Notice from './src/screen/loginscreen/notice';

import ScreenNames from './src/utils/screenNames';
import LoadingScreen from './src/screen/loginscreen/loadingScreen';
import WebScreen from './src/screen/searchScreen/webScreen';
import InfoHotelBooked from './src/screen/searchScreen/InfoHotelBooked';
import ReviewScreen from './src/screen/searchScreen/ReviewScreen';
import ListReview from './src/screen/mainScreen/ListReview';
import InforRoomScreen from './src/screen/searchScreen/inforRoomScreen';

const Stack = createNativeStackNavigator();
const HidenHeader = {
    headerShown: false
}
export default function Navigations() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={HidenHeader} initialRouteName={ScreenNames.LOADING}

            // {/* <Stack.Navigator screenOptions={HidenHeader} initialRouteName={ScreenNames.LISTREVIEW */

            >
                <Stack.Screen name="Notice" component={Notice} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen name="InformationScreen" component={InformationScreen} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                <Stack.Screen name={ScreenNames.LOADING} component={LoadingScreen} />


                <Stack.Screen name='MainScreen' component={MainScreen} />
                <Stack.Screen name='SaveScreen' component={SaveScreen} />
                <Stack.Screen name='BookingScreen' component={BookingScreen} />
                <Stack.Screen name='UserScreen' component={UserScreen} />
                <Stack.Screen name={ScreenNames.LISTREVIEW} component={ListReview} />


                <Stack.Screen name='Map' component={MapScreen} />
                <Stack.Screen name='InforRoomScreen' component={inforRoomScreen} />
                <Stack.Screen name="SearchValue" component={SearchValuesScreen} />
                <Stack.Screen name="Hotel" component={HotelScreen} />
                <Stack.Screen name="SearchIcon" component={SearchIcon} />
                <Stack.Screen name="Slider" component={SlidersScreen} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                <Stack.Screen name='CheckReservar' component={CheckReservar} />
                <Stack.Screen name='InfoRoom' component={InforRoomScreen} />
                <Stack.Screen name='Web' component={WebScreen} />
                <Stack.Screen name='Info Hotel Booked' component={InfoHotelBooked} />


                <Stack.Screen name='Review' component={ReviewScreen} />



            </Stack.Navigator>
        </NavigationContainer>

    );
}