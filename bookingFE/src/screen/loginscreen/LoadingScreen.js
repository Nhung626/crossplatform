import { View, Text, ImageBackground, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { getToken } from '../../services/useAPI'
import ScreenNames from '../../utils/screenNames';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../utils/theme';

export default function LoadingScreen({ navigation }) {

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = await getToken();
            if (token != null) {
                navigation.replace(ScreenNames.MAIN, { token: token });
            } else {
                navigation.replace(ScreenNames.LOGIN);
            }
        }
        const timer = setTimeout(() => {
            checkTokenValidity();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style='light' backgroundColor={themeColor.bgColor} />

            <ImageBackground
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                source={require('../../assets/images/background/background.png')}>

                <Image source={require('../../assets/logoReservar.png')} style={{ height: 240, width: 240 }} />
                <Text style={{ color: themeColor.bgColor, fontSize: 25, fontWeight: '500' }}>Reservar</Text>
                <Text style={{ color: themeColor.bgColor, fontSize: 23, fontWeight: '500' }}> Hãy sống theo cách của bạn!</Text>
            </ImageBackground>
        </SafeAreaView>

    )
}