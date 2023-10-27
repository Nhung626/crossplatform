import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { themeColor } from '../utils/theme'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { getImgCustomerUrl } from '../services/baseUrl';
import { continuePaymentAPI, getToken } from '../services/useAPI';
import moment from 'moment';



export default function HotelBooked({
    reservarId,
    providerId,
    providerName,
    imgProvider,
    rooms,
    reservarDate,
    total,
    statePayment,
    startDate,
    endDate,
    categoryId,
    stateReservar
}) {
    const navigation = useNavigation();
    const handlePayment = async () => {
        const token = await getToken();
        console.log("Dữ liệu truyền vào API: ", token, reservarId, total)
        const response = await continuePaymentAPI(token, reservarId, total);
        console.log("resporn: ", response)
        if (response) {
            console.log("url resporn: ", response)
            navigation.navigate("Web", { url: response })
        }
        else {
            console.log("Thanh toán ko thành công!")
            // console.log(response)
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Info Hotel Booked', {
                reservarId,
                providerId,
                providerName,
                rooms,
                reservarDate,
                total,
                statePayment,
                startDate,
                endDate,
                categoryId,
                stateReservar
            })} >
                <View style={styles.boxStyle}>
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                        <Image style={{ width: 144, height: 256, borderRadius: 30 }} source={{ uri: getImgCustomerUrl.concat(`?imageId=${imgProvider}`) }} />
                    </View>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <View style={{ rowGap: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, flexWrap: 'wrap' }}>{providerName}</Text>
                            <View style={styles.boxText}>
                                <Icon.Info color={'gray'} width={15} height={15} />
                                <Text style={styles.textInfo}>Số phòng: {rooms}</Text>
                            </View>

                            <View style={styles.boxText}>
                                <Icon.Calendar color={'gray'} width={15} height={15} />
                                <Text style={styles.textInfo}>Ngày đặt phòng: {moment(reservarDate).format('YYYY-MM-DD')}</Text>

                            </View>
                            <View style={styles.boxText}>
                                <Icon.Calendar color='gray' width={15} height={15} />
                                <Text style={styles.textInfo}>Ngày bắt đầu: {startDate}</Text>
                            </View>
                            <View style={styles.boxText}>
                                <Icon.Calendar color='gray' width={15} height={15} />
                                <Text style={styles.textInfo}>Ngày kết thúc: {endDate}</Text>
                            </View>

                            <View style={{ flex: 1, padding: 10, paddingRight: 20 }}>
                                <Text
                                    style={{ textAlign: 'right', fontWeight: "400", fontSize: 16 }}>
                                    Tổng: </Text>
                                <Text
                                    style={{ fontSize: 20, fontWeight: '500', color: themeColor.bgColor, textAlign: 'right' }}>
                                    VND {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </Text>
                            </View>
                            <View style={styles.buttonState}>
                                {/* {
                                statePayment === "Success" ? (
                                    <View
                                        style={styles.success}>
                                        <Text style={{ color: '#FFFFFF' }}>Đã thanh toán!</Text>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.buttonUnsuccess}
                                        onPress={handlePayment}>
                                        <Text style={{ color: '#FFFFFF' }}>Chưa thanh toán!</Text>
                                    </TouchableOpacity>
                                )} */}
                                {stateReservar === "CANCELED" ? (
                                    <View style={styles.success}>
                                        <Text style={{ color: '#ffffff' }}> Đã hủy </Text>
                                    </View>
                                ) : (statePayment === "Success" ? (
                                    <View
                                        style={styles.success}>
                                        <Text style={{ color: '#FFFFFF' }}>Đã thanh toán!</Text>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.buttonUnsuccess}
                                        onPress={handlePayment}>
                                        <Text style={{ color: '#FFFFFF' }}>Chưa thanh toán!</Text>
                                    </TouchableOpacity>
                                )
                                )}
                            </View>
                            <TouchableOpacity>

                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, // Cho Android
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 10,
    },
    boxStyle: {
        // margin: 5,
        flexDirection: "row"
    },
    boxText: {
        flex: 1,
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
    },

    textInfo: {
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'left'
    },
    buttonState: {
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    success: {
        padding: 10,
        backgroundColor: themeColor.bgColor,
        borderRadius: 10,
    },
    buttonUnsuccess: {
        padding: 10,
        backgroundColor: "#FFA500",
        borderRadius: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',

    }

});