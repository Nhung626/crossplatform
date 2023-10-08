import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../theme';
import * as Icon from "react-native-feather";

export default function PaymentScreen({ route }) {
    const { selectedRoom } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#dedede' }}>
            <StatusBar style='light' backgroundColor={themeColor.bgColor} />
            <View style={{ backgroundColor: themeColor.bgColor, paddingHorizontal: 20, paddingVertical: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Icon.ArrowLeft height={30} width={30} strokeWidth="2" stroke="white" />
                    <Text style={{ fontWeight: '300', fontSize: 18, color: 'white', marginLeft: 100 }}>Điền thông tin</Text>
                </View>
            </View>
            <ScrollView style={{ paddingBottom: 100 }}>
                <View style={{ backgroundColor: themeColor.bgColor, paddingHorizontal: 20, paddingVertical: 20 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, }}>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10, rowGap: 8, borderBottomWidth: 0.6, borderBlockColor: 'gray' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Tên khách sạn</Text>
                            <Text>Nhận phòng         (VD) T.2, 9 Th10 2023 (14:00)</Text>
                            <Text>Trả phòng          (VD) T.3, 9 Th10 2023 (12:00)</Text>
                        </View>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10, rowGap: 8, borderBottomWidth: 0.6, borderBlockColor: 'gray' }}>
                            <Text>(3x) {selectedRoom.name} </Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>1 giường đôi</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>2 khách/phòng</Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, rowGap: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: '300' }}>Đăng nhập dưới tên Tran Quang Linh</Text>
                    <Text style={{ fontSize: 12, fontWeight: '200' }}>bằng +84385880364</Text>
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    <Text style={{ fontWeight: '400', fontSize: 16, marginBottom: 10 }}>Thông tin liên hệ</Text>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10, backgroundColor: 'white', borderTopEndRadius: 8, borderTopStartRadius: 8, rowGap: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '300' }}>Tran Quang Linh</Text>
                        <Text style={{ fontWeight: '200' }}>asjdkm@gmail.com   +84385880364</Text>
                    </View>
                    <View style={{ paddingVertical: 15, backgroundColor: '#f5f5f5', borderBottomEndRadius: 8, borderBottomStartRadius: 8, paddingHorizontal: 10, rowGap: 10 }}>
                        <Text>Tôi đặt cho bản thân</Text>
                        <Text>Tôi đặt cho người khác</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 16, fontWeight: '400', marginHorizontal: 20, marginVertical: 10 }}>Chi tiết giá</Text>
                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.6, borderBottomColor: 'gray', paddingVertical: 20, paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '300' }}>Tổng giá tiền </Text>
                        <Text style={{ fontSize: 20, fontWeight: '500', color: themeColor.bgColor }}> VND 1.108.399</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20, }}>
                        <Text style={{ fontWeight: '200' }}>(3x) {selectedRoom.name} </Text>
                        <Text style={{ fontWeight: '200' }}>VND 977.424</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20, }}>
                        <Text style={{ fontWeight: '200' }}>Thuế và phí </Text>
                        <Text style={{ fontWeight: '200' }}>VND 130.975</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ marginHorizontal: 20, marginVertical: 20, padding: 15, alignItems: 'center', borderRadius: 8, backgroundColor: themeColor.bgColor }}>
                    <Text style={{ fontSize: 18, fontWeight: '400', color: 'white' }}>Tiếp Tục</Text>
                </TouchableOpacity>
            </ScrollView>


        </SafeAreaView>

    );
}