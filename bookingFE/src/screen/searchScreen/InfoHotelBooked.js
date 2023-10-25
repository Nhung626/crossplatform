import { View, Text, StyleSheet, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { continuePaymentAPI, getCategoryAPI, getProviderAPI, getToken } from '../../services/useAPI';
import { themeColor } from '../../utils/theme';
import * as Icon from "react-native-feather";
import { getImgCustomerUrl } from '../../services/baseUrl';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function InfoHotelBooked() {
    const { params: { reservarId,
        providerId,
        providerName,
        rooms,
        reservarDate,
        total,
        statePayment,
        startDate,
        endDate,
        categoryId } } = useRoute();
    const [provider, setProvider] = useState([])
    const [idImgProvider, setIdImgProvider] = useState([])
    const [category, setCategory] = useState([])
    const [imageRoom, setImageRoom] = useState([])
    const [containerWidth, setContainerWidth] = useState(0);
    const navigation = useNavigation()

    // const [providerName, setProviderName] = useState()
    // const [description, setDescription] = useState()
    // const [address, setAddress] = useState()
    const handlePayment = async () => {
        const token = await getToken();
        console.log("Dữ liệu truyền vào API: ", token, reservarId, total)
        const response = await continuePaymentAPI(token, reservarId, total);
        if (response) {
            navigation.navigate("Web", { url: response })
        }
        else {
            console.log("Thanh toán ko thành công!")
            // console.log(response)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = await getToken();
            const provider = await getProviderAPI(token, providerId);
            const category = await getCategoryAPI(token, categoryId)
            if (provider && category) {
                setProvider(provider);
                setIdImgProvider(provider.imgIdProviders);
                setCategory(category)
                setImageRoom(category.imgIdCategories)
                // setProviderName(resporn.providerName);
                // setDescription(resporn.description);
                // setAddress(resporn.address);
            }
        }
        fetchData()
    }, [])
    const onContainerLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
    };
    const screenWidth = Dimensions.get("window").width;
    console.log("resporn data: ", category)
    return (
        <SafeAreaView style={{ backgroundColor: themeColor.bgModalColor }}>
            <StatusBar style='light' backgroundColor={themeColor.btColor} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Reservar</Text>
            </View>
            {/* Header bar */}
            <ScrollView contentContainerStyle={{
                paddingBottom: 90,
            }}>
                <ScrollView horizontal
                    pagingEnabled
                    contentContainerStyle={styles.contentContainer}
                >
                    {idImgProvider.map((id, index) => (
                        <Image
                            key={index}
                            style={{
                                width: screenWidth, // Điều chỉnh kích thước theo nhu cầu của bạn
                                height: 300,
                                resizeMode: 'cover',
                            }}
                            source={{ uri: `${getImgCustomerUrl}?imageId=${id}` }}
                        />
                    ))}
                </ScrollView>

                <View style={styles.container}>



                    <View style={{
                        backgroundColor: 'white',
                        paddingTop: 24,
                        flex: 1,
                    }}>
                        <View style={{ flex: 1, paddingHorizontal: 10, }}>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Text style={{
                                    flex: 1,
                                    fontWeight: 'bold',
                                    fontSize: 24,
                                    flexWrap: 'wrap',
                                    paddingBottom: 10,
                                    textAlign: 'left',
                                    justifyContent: 'flex-start'
                                }}>
                                    {provider.providerName}
                                </Text>
                            </View>

                            <View style={{ flex: 1, paddingVertical: 10, paddingBottom: 10, rowGap: 10 }}>
                                <View style={styles.boxInfo}>
                                    <Icon.Info
                                        height={25}
                                        width={25}
                                        stroke={"grey"}
                                        style={{ justifyContent: "flex-start", flex: 1 }} />

                                    <Text
                                        style={styles.textBox}>{provider.description}</Text>
                                </View>
                                <View style={styles.boxInfo}>
                                    <Icon.Phone stroke={'grey'} height={24} width={24} />
                                    <Text style={styles.textBox}>{provider.providerPhone}</Text>
                                </View>
                                <View style={styles.boxInfo}>
                                    <Icon.MapPin stroke={'grey'} height={24} width={24} />
                                    <Text style={styles.textBox}>{provider.address}</Text>
                                </View>
                            </View>
                        </View>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 24,
                                paddingVertical: 16,
                                paddingHorizontal: 16,
                                borderTopColor: 'grey',
                                borderTopWidth: 0.5
                            }}>
                            Thông tin đặt phòng
                        </Text>
                        <View style={{ rowGap: 5, paddingHorizontal: 10 }}>
                            <View style={styles.boxTextRoom}>
                                <Icon.Info color={'gray'} width={15} height={15} />
                                <Text style={styles.textInfo}>Số phòng: {rooms}</Text>
                            </View>

                            <View style={styles.boxTextRoom}>
                                <Icon.Calendar color={'gray'} width={15} height={15} />
                                <Text style={styles.textInfo}>Ngày đặt phòng: {reservarDate}</Text>

                            </View>
                            <View style={styles.boxTextRoom}>
                                <Icon.Calendar color='gray' width={15} height={15} />
                                <Text style={styles.textInfo}>Ngày bắt đầu: {startDate}</Text>
                            </View>
                            <View style={styles.boxTextRoom}>
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
                                {statePayment === "Success" ? (
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
                                )}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

                </View>

                <View style={styles.containerRoom}>
                    <View style={styles.boxImage} onLayout={onContainerLayout}>
                        <ScrollView horizontal pagingEnabled>
                            {imageRoom.map((imageId, index) => (
                                <Image
                                    key={index}
                                    style={{
                                        width: containerWidth, // Lấy width của thẻ chứa hình ảnh
                                        height: 200,
                                        resizeMode: 'cover',
                                        borderRadius: 20,
                                    }}
                                    source={{ uri: `${getImgCustomerUrl}?imageId=${imageId}` }}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.boxStyle}>
                        <View style={styles.boxInfoRoom}>
                            <View>
                                <Text style={styles.nameRoom}>{category.categoryName}</Text>
                                <View style={styles.viewInfo}>
                                    <Text>Diện tích: {category.area} m²</Text>
                                </View>
                                <View style={styles.viewInfo}>
                                    <Icon.Users stroke={'grey'} height={20} width={20} />
                                    <Text>{category.person} khách/phòng</Text>
                                </View>
                                <View style={styles.viewInfo}>
                                    <Ionicons name="bed-outline" size={20} color="grey" />
                                    <Text>{category.bedType}</Text>
                                </View>
                                {/* <Text style={styles.textPrice}>VND {(category.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text> */}
                                <Text style={styles.textRoomNight}>/phòng/đêm</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );

}
const styles = StyleSheet.create({
    container: {
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5, // Cho Android
    },
    header: {
        backgroundColor: themeColor.btColor,
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
    img: {
        height: 300,
        resizeMode: 'cover', // Chọn loại scale cho hình ảnh
    },
    contentContainer: {
        alignItems: 'center',
    },
    box: {
        width: 200,
        height: 200,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxInfo: {
        flexDirection: 'row',
        flex: 1,
        columnGap: 10,
    },
    textBox: {
        flexWrap: 'wrap',
        textAlign: 'left',
        flex: 1
    },
    containerRoom: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, // Cho Android
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 10,
    },

    boxInfoRoom: {
        flex: 1,
        paddingHorizontal: 10,
    },
    nameRoom: {
        fontWeight: 'bold',
        fontSize: 18,
        flexWrap: 'wrap',
        borderBottomWidth: 0.6,
        borderBottomColor: 'grey',
        paddingBottom: 10,
    },
    viewInfo: {
        flexDirection: 'row',
        columnGap: 10,
        marginVertical: 5,
    },
    textPrice: {
        color: themeColor.bgColor,
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'right',
    },
    textRoomNight: {
        color: 'grey',
        fontSize: 12,
        textAlign: 'right',
        paddingBottom: 10,
    },

    boxImage: {
        overflow: 'hidden',
        borderRadius: 20,
        margin: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, // Cho Android
    },
    boxStyle: {
        margin: 10
    },
    boxStyleRoom: {
        margin: 10,
        flexDirection: "row"
    },
    boxTextRoom: {
        flex: 1,
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
    },
    success: {
        padding: 8,
        backgroundColor: themeColor.bgColor,
        borderRadius: 10,
    },
    buttonUnsuccess: {
        padding: 8,
        backgroundColor: "#FFA500",
        borderRadius: 10,
    },
    buttonState: {
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
})
