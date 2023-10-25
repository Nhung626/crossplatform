import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../utils/theme';
import * as Icon from "react-native-feather";
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCustomerApi, getEndBooking, getNight, getStartBooking, getToken, orderAPI, saveCategory } from '../../services/useAPI';

export default function PaymentScreen() {
    const route = useRoute()
    const {
        name,
        dataRoom,
        totalRoom

    } = route.params ?? {}
    const navigation = useNavigation();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [customer, setCustomer] = useState([]);
    const [night, setNight] = useState();
    useEffect(() => {
        fetchData = async () => {
            if (dataRoom) {
                await saveCategory(dataRoom)
                const startDay = await getStartBooking();
                const endDay = await getEndBooking();
                const nightt = await getNight();
                setNight(nightt);
                setStart(startDay);
                setEnd(endDay)

                console.log("night: ", night)
                const token = await getToken();
                const customerInfo = await getCustomerApi(token)
                if (customerInfo) {
                    setCustomer(customerInfo)
                }
            }
        }
        fetchData()
    }, [])
    const sumPrice = totalRoom * parseInt(dataRoom.price) * parseInt(night);
    console.log("night: ", night)
    const tax = sumPrice / 10;
    const totalPrice = sumPrice + tax;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#dedede' }}>
            <StatusBar style='light' backgroundColor={themeColor.bgColor} />
            <View style={{ backgroundColor: themeColor.bgColor, paddingHorizontal: 20, paddingVertical: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Icon.ArrowLeft height={30} width={30} strokeWidth="2" stroke="white" onPress={() => navigation.goBack()} />
                    <Text style={{ fontWeight: '300', fontSize: 18, color: 'white', marginLeft: 100 }}>Điền thông tin</Text>
                </View>
            </View>
            <ScrollView style={{ paddingBottom: 100 }}>
                <View style={{ backgroundColor: themeColor.bgColor, paddingHorizontal: 20, paddingVertical: 20 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, }}>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10, rowGap: 8, borderBottomWidth: 0.6, borderBlockColor: 'gray' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>{dataRoom.categoryName}</Text>
                            <Text>Nhận phòng                    {start}</Text>
                            <Text>Trả phòng                       {end}</Text>
                        </View>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10, rowGap: 8, borderBottomWidth: 0.6, borderBlockColor: 'gray' }}>
                            <Text>{name}</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>{dataRoom.bedType}</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>{dataRoom.person} khách/phòng</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                    <Text style={{ fontWeight: '400', fontSize: 16, marginBottom: 10 }}>Thông tin liên hệ</Text>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 10, rowGap: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '300' }}>{customer.fullName}</Text>
                        <Text style={{ fontWeight: '200' }}>Số điện thoại: {customer.phoneNumber}</Text>
                    </View>

                </View>
                <Text style={{ fontSize: 16, fontWeight: '400', marginHorizontal: 20, marginVertical: 10 }}>Chi tiết giá</Text>
                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.6, borderBottomColor: 'gray', paddingVertical: 20, alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-between' }}>
                        <Icon.Info stroke={themeColor.bgColor} height={30} width={30} />
                        <Text style={{ fontSize: 11.5, fontWeight: '300', paddingHorizontal: 20 }}>
                            Thuế và phí là các khoản được Reservar chuyển trả cho khách sạn.
                            Mọi thắc mắc về thuế và hóa đơn, vui lòng tham khảo Điều khoản và Điều kiện của Reservar để được giải đáp
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.6, borderBottomColor: 'gray', paddingVertical: 20, paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '300' }}>Tổng giá tiền </Text>
                        <Text style={{ fontSize: 20, fontWeight: '500', color: themeColor.bgColor }}> {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20, }}>
                        <Text style={{ fontWeight: '200' }}>({totalRoom}x) {name}</Text>
                        <Text style={{ fontWeight: '200' }}>VND {sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20, }}>
                        <Text style={{ fontWeight: '200' }}>Thuế và phí </Text>
                        <Text style={{ fontWeight: '200' }}>VND {tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CheckReservar',
                        {
                            dataRoom,
                            night: night,
                            totalRoom,
                            start: start,
                            end: end,
                            customer: customer,
                            totalPrice: totalPrice
                        })}
                    style={{ marginHorizontal: 20, marginVertical: 20, padding: 15, alignItems: 'center', borderRadius: 8, backgroundColor: themeColor.bgColor }}>
                    <Text style={{ fontSize: 18, fontWeight: '400', color: 'white' }}>Tiếp Tục</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>

    );
}