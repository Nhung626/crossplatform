import { View, Text, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { getToken } from '../../services/useAPI'
import ScreenNames from '../../utils/screenNames';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingScreen({ navigation }) {

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = await getToken();
            console.log(token)
            if (token != null) {
                navigation.replace(ScreenNames.MAIN);
            } else {
                navigation.replace(ScreenNames.LOGIN);
            }
        }
        const timer = setTimeout(() => {
            checkTokenValidity();
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/images/background/background.png')}>
                <Text>loadingScreen</Text>

            </ImageBackground>
        </SafeAreaView>

    )
}