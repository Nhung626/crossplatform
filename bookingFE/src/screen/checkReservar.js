import { View, Text, StatusBar, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColor } from '../../utils/theme'
import * as Icon from "react-native-feather";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function CheckReservar() {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            <StatusBar backgroundColor={themeColor.bgColor} barStyle={'light-content'} />

            <View style={{ backgroundColor: themeColor.bgColor, paddingHorizontal: 20, paddingVertical: 30, alignItems: 'center', flexDirection: 'row' }}>
                <Icon.ArrowLeft stroke={'white'} height={30} width={30} onPress={() => navigation.goBack()} />
                <Text style={{ fontSize: 18, fontWeight: '400', color: 'white', paddingLeft: 70 }}>Xem lại đặt chỗ</Text>
            </View>
            <ScrollView >
                <Text style={{ backgroundColor: '#D1EEF5', paddingHorizontal: 10, paddingVertical: 20, color: themeColor.bgColor, fontWeight: '300', borderBottomWidth: 0.6, borderBottomColor: themeColor.bgColor }}>
                    Vui lòng xem lại các chi tiết đặt phòng của bạn trước khi tiếp tục đến bước thanh toán.
                </Text>
                <View style={{ paddingHorizontal: 20, paddingVertical: 20, rowGap: 10, backgroundColor: 'white' }}>
                    <Text style={{ fontWeight: '400', fontSize: 18, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: 'grey' }}> Le Grand Hanoi Hotel - The Ruby</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'column', rowGap: 10 }}>
                            <Text style={{ fontWeight: '300', color: 'grey' }}>Nhận phòng</Text>
                            <Text> T.2, 9 Th10</Text>
                        </View>
                        <View style={{ flexDirection: 'column', rowGap: 10, alignItems: 'center' }}>
                            <MaterialCommunityIcons name="weather-night" size={24} color={themeColor.btColor} />
                            <Text> T.2, 9 Th10</Text>
                        </View>
                        <View style={{ flexDirection: 'column', rowGap: 10, alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: '300', color: 'grey', }}>Trả phòng</Text>
                            <Text style={{ color: 'grey' }}> 1 đêm</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, rowGap: 10 }}>
                    <Text style={{ fontSize: 15 }}> (1x) Standard Double Room </Text>
                    <Image source={require('../assets/images/hotelImages/hotels/rooms/room1.png')} style={{ width: 200, height: 100 }} resizeMode='cover' />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ rowGap: 10, paddingRight: 100 }}>
                            <Text>Loại giường</Text>
                            <Text>Số khách</Text>
                        </View>
                        <View style={{ rowGap: 10 }}>
                            <Text>1 giường đôi</Text>
                            <Text>2 khách/phòng</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, rowGap: 10 }}>
                    <Text style={{ fontSize: 15 }}> Chính sách lưu trú</Text>
                    <Text>
                        linh ta linh tinh .... nhân phòng sớm
                        Trả phòng sớm
                        v.v.v.v.v.v.v.v.v.v.
                    </Text>
                </View>
                <View style={{ marginVertical: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, rowGap: 10 }}>
                    <Text style={{ fontSize: 15, marginBottom: 10 }}>Thông tin khách</Text>
                    <Text style={{ color: 'grey' }}>Tên khách</Text>
                    <Text>Tran Quang Linh</Text>
                </View>
                <View style={{ marginVertical: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, rowGap: 10, borderBottomWidth: 0.6, borderBottomColor: 'grey' }}>
                    <Text style={{ fontSize: 15, marginBottom: 10 }}>Chi tiết giá</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'grey' }}>
                                (1x) Le Grand Hanoi Hotel - The Ruby, Standard Double Room</Text>
                        </View>
                        <Text style={{ textAlign: 'right', color: 'grey' }}>VND 368.204</Text>
                    </View>
                </View>
                <View style={{ paddingVertical: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.6, borderBottomColor: 'grey' }}>
                    <Text>Tổng giá tiền</Text>
                    <Text style={{ color: themeColor.bgColor, fontSize: 16 }}>VND 368.204</Text>
                </View>
                <View style={{ marginVertical: 20, marginHorizontal: 20, borderRadius: 8, backgroundColor: themeColor.bgColor, alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>Tiếp tục thanh toán</Text>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}