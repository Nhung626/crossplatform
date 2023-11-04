import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColor } from '../../utils/theme'
import * as Icon from "react-native-feather";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getToken, orderAPI } from '../../services/useAPI';
import { getImgCustomerUrl } from '../../services/baseUrl';
export default function CheckReservar() {
    const route = useRoute();
    const [url, setUrl] = useState('');
    const {
        dataRoom,
        night,
        totalRoom,
        start,
        end,
        customer,
        totalPrice

    } = route.params ?? {}
    const navigation = useNavigation()

    const handleOder = async () => {
        const token = await getToken()
        const response = await orderAPI(dataRoom, totalRoom, start, end, token);
        if (response) {
            // console.log("url resporn: ", response.paymentURL)
            navigation.navigate("Web", { url: response.paymentURL })
        }
        else {
            console.log("đặt phòng ko thành công!")
            console.log(response)
        }


    }

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
                            <Text>{start}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', rowGap: 10, alignItems: 'center' }}>
                            <MaterialCommunityIcons name="weather-night" size={24} color={themeColor.btColor} />
                            <Text> {night} đêm</Text>
                        </View>
                        <View style={{ flexDirection: 'column', rowGap: 10, alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: '300', color: 'grey', }}>Trả phòng</Text>
                            <Text >{end}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, rowGap: 10 }}>
                    <Text style={{ fontSize: 15 }}> {dataRoom.categoryName}</Text>
                    <Image source={{ uri: `${getImgCustomerUrl}?imageId=${dataRoom.imgIdCategories[0]}` }} style={{ width: 200, height: 100 }} resizeMode='cover' />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ rowGap: 10, paddingRight: 100 }}>
                            <Text>Loại giường</Text>
                            <Text>Số khách</Text>
                        </View>
                        <View style={{ rowGap: 10 }}>
                            <Text>{dataRoom.bedType}</Text>
                            <Text>{dataRoom.person} khách/phòng</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, rowGap: 10 }}>
                    <Text style={{ fontSize: 15 }}> Chính sách lưu trú</Text>
                    <Text>
                        {dataRoom.description}
                    </Text>
                </View>
                <View style={{ marginVertical: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, rowGap: 10 }}>
                    <Text style={{ fontSize: 15, marginBottom: 10 }}>Thông tin khách</Text>
                    <Text style={{ color: 'grey' }}>Tên khách</Text>
                    <Text>{customer.fullName}</Text>
                </View>
                <View style={{ marginVertical: 10, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, rowGap: 10, borderBottomWidth: 0.6, borderBottomColor: 'grey' }}>
                    <Text style={{ fontSize: 15, marginBottom: 10 }}>Chi tiết giá</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'grey' }}>
                                ({totalRoom}x) {dataRoom.categoryName}</Text>
                        </View>
                        <Text style={{ textAlign: 'right', color: 'grey' }}>VND {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                </View>
                <View style={{ paddingVertical: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.6, borderBottomColor: 'grey' }}>
                    <Text>Tổng giá tiền</Text>
                    <Text style={{ color: themeColor.bgColor, fontSize: 16 }}>VND {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                </View>
                <TouchableOpacity
                    onPress={handleOder}
                    style={{ marginVertical: 20, marginHorizontal: 20, borderRadius: 8, backgroundColor: themeColor.bgColor, alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>Tiếp tục thanh toán</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )
}