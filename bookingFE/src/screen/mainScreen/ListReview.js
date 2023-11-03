import { View, Text, StatusBar, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getListReview } from '../../services/useAPI'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColor } from '../../utils/theme'
import * as Icon from 'react-native-feather';
import moment from 'moment'
import { getImgCustomerUrl } from '../../services/baseUrl'
import { useNavigation } from '@react-navigation/native'
import ScreenNames from '../../utils/screenNames'

export default function ListReview() {
    const [listReview, setListReview] = useState([])
    const navigation = useNavigation()
    // const [reservar, setReservar] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await getListReview();
            if (response) {
                setListReview(response);
            }
        }
        fetchData()
    }, [])
    // console.log("reservar: ", listReview[0])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style='light' backgroundColor={themeColor.bgColor} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Đánh giá của bạn</Text>
            </View>
            <View>
                <FlatList
                    data={listReview}
                    keyExtractor={(item) => item.reviewId.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.reviewContainer}>
                            <View
                                style={{
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: "grey",
                                    rowGap: 5
                                }}>
                                <Text>{item.reservar.customerName}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {[1, 2, 3, 4, 5].map((starIndex) => {
                                        const filledStar = starIndex <= item.rate;

                                        return (
                                            <Icon.Star
                                                key={starIndex}
                                                stroke={themeColor.bgColor}
                                                height={30}
                                                width={30}
                                                strokeWidth={1}
                                                fill={filledStar ? themeColor.bgColor : "white"}
                                            />
                                        );
                                    })}
                                </View>
                                <Text style={{ color: 'grey' }}>
                                    {moment(item.reservar.reservarDate).format('DD-MM-YYYY')
                                    }  {moment(item.reservar.reservarDate).format('HH:mm:ss')}</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(ScreenNames.HOTEL, { id: item.reservar.providerId })}
                                    style={{
                                        flexDirection: 'row',
                                        columnGap: 20,
                                        alignItems: 'center',
                                        backgroundColor: themeColor.bgModalColor,
                                        marginBottom: 20
                                    }}>
                                    <Image
                                        style={{ width: 50, height: 50 }}
                                        source={{ uri: getImgCustomerUrl.concat(`?imageId=${item.reservar.imgProvider}`) }} />
                                    <Text style={{ fontSize: 18 }}>{item.reservar.providerName}</Text>
                                </TouchableOpacity>

                            </View>
                            <Text>Đánh giá: {item.description}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 10, rowGap: 10 }}>
                                {item.imgReview.map((imgId, index) => (
                                    <Image
                                        key={index}
                                        style={{
                                            width: 50, // Điều chỉnh kích thước theo nhu cầu của bạn
                                            height: 50,
                                            resizeMode: 'cover',
                                        }}
                                        source={{ uri: `${getImgCustomerUrl}?imageId=${imgId}` }}
                                    />
                                ))}
                            </View>

                        </View>
                    )}
                    ListEmptyComponent={() => <Text>Không có dữ liệu</Text>}
                    contentContainerStyle={{ paddingBottom: 90 }} />
            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: themeColor.bgColor,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        flex: 10,
        color: '#fff',
        fontSize: 24,
        marginVertical: 10
    },
    reviewContainer: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        rowGap: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        padding: 10
    }
})