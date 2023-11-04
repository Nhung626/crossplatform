// WebScreen.js

import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const WebScreen = () => {
    const route = useRoute()
    const { url } = route.params ?? {};
    const navigation = useNavigation();
    const [falseCount, setFalseCount] = useState(0);
    console.log(url)
    const handleNavigationStateChange = (navState) => {
        // Kiểm tra xem người dùng có thể quay lại trang trước đó trong WebView hay không
        const canGoForwardNow = navState.loading;

        if (!canGoForwardNow) {
            // Nếu canGoForwardNow là false, tăng falseCount lên 1
            setFalseCount(falseCount + 1);

            if (falseCount >= 2) {
                Alert.alert(
                    'Thanh toán thành công!!! Nhấn OK để trở về màn hình chính',
                    null,
                    [
                        {
                            text: 'Hủy',
                            onPress: () => { }, // Không làm gì nếu hủy
                        },
                        {
                            text: 'OK',

                            onPress: () => {
                                setTimeout(() => {
                                    navigation.navigate("MainScreen")
                                }, 500);
                            },
                        },
                    ]
                );
            }
        }
    };
    console.log("số lần false: ", falseCount)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                source={{ uri: url }}
                onNavigationStateChange={handleNavigationStateChange}

            />
        </SafeAreaView>
    )
};

export default WebScreen;
