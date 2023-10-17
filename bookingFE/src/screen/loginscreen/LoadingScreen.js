import { View, Text, ImageBackground, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { getToken } from '../../services/useAPI'
import ScreenNames from '../../utils/screenNames';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../utils/theme';
import jwtDecode
    from 'jwt-decode';
export default function LoadingScreen({ navigation }) {

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = await getToken();
            const decodedToken = jwtDecode(token);
            // Lấy thời gian hết hạn từ JWT
            const expirationTime = decodedToken.exp * 1000; // Chuyển giây thành mili giây
            // So sánh với thời gian hiện tại
            const currentTime = new Date().getTime();
            console.log(expirationTime, currentTime)

            // Kiểm tra xem JWT đã hết hạn chưa

            if (expirationTime > currentTime) {
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
            <ImageBackground
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                source={require('../../assets/images/background/background.png')}>

                <Image source={require('../../assets/logoReservar.png')} style={{ height: 240, width: 240 }} />
            </ImageBackground>
        </SafeAreaView>

    )
}