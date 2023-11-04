import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { themeColor } from '../../utils/theme';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getImgCustomerUrl } from '../../services/baseUrl';
import ShowRoom from '../../components/showRoom';
import { addFavoriteAPI, deleteFavorite, getAllCategory, getAllRoomAPI, getIdFavor, getProviderAPI, getToken } from '../../services/useAPI';

export default function HotelScreen() {
    const { params: {
        id,
        name,
        imageHotel,
        description,
        address,
        start, end, person

    } } = useRoute();

    const [data, setData] = useState("");
    const [favorite, setFavorite] = useState(false);
    const [provider, setProvider] = useState([]);
    const [imgProvider, setImgProvider] = useState();

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            const providerData = await getProviderAPI(id)

            const token = await getToken();
            setProvider(providerData);
            setImgProvider(providerData.imgIdProviders)
            if (start, end, person) {
                const response = await getAllRoomAPI(id, start, end, person, token);
                setData(response)
            } else {
                const response = await getAllCategory(token, id);
                setData(response)
            }

            const favor = await getIdFavor(id);
            if (favor === true) {
                setFavorite(true);
            }
            else {
                setFavorite(false)
            }
        };
        fetchDataFromAPI();
    }, []);
    // console.log("data: ", data, id, start, end, person)
    const handleFavorite = async () => {
        const token = await getToken()
        try {
            if (favorite) {
                // Nếu đã là yêu thích, thì xóa khỏi danh sách yêu thích
                await deleteFavorite(id, token);
                setFavorite(false);
            } else {
                await addFavoriteAPI(id, token);
                setFavorite(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const heartColor = favorite ? themeColor.bgColor : 'white';
    console.log("hotel: ", imgProvider, id)
    const screenWidth = Dimensions.get("window").width;
    return (
        <SafeAreaView style={{ backgroundColor: "#f0f0f0" }}>
            <StatusBar style='light' backgroundColor={themeColor.bgColor} />
            <View style={{ position: 'absolute', width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 50, zIndex: 1000, paddingHorizontal: 10 }}>
            </View>
            {/* Header bar */}
            <ScrollView>
                <ScrollView horizontal
                    pagingEnabled
                    contentContainerStyle={styles.contentContainer}

                >
                    {imgProvider ? (
                        imgProvider.map((imageId, index) => (
                            <Image
                                key={index}
                                style={{
                                    width: screenWidth, // Điều chỉnh kích thước theo nhu cầu của bạn
                                    height: 400,
                                    resizeMode: 'cover',
                                }}
                                source={{ uri: `${getImgCustomerUrl}?imageId=${imageId}` }}
                            />
                        ))) : (<></>)}
                </ScrollView>
                <View style={styles.container}>



                    {/* Content */}
                    <View style={{
                        backgroundColor: themeColor.bgModalColor,
                        paddingTop: 24,
                        flex: 1,
                        borderRadius: 30
                    }}>
                        <View style={{ flex: 1, marginHorizontal: 10, }}>
                            <View style={{
                                flexDirection: 'row',
                                flex: 1,
                                alignItems: 'center'
                            }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontWeight: 'bold',
                                        fontSize: 24,
                                        flexWrap: 'wrap',
                                        paddingBottom: 10,
                                        textAlign: 'left',
                                    }}>
                                    {provider.providerName}
                                </Text>
                                <TouchableOpacity onPress={handleFavorite} >
                                    <Icon.Heart
                                        height={30}
                                        width={30}
                                        strokeWidth="2"
                                        stroke={themeColor.bgColor}
                                        style={{ justifyContent: 'flex-end' }}
                                        fill={heartColor} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', flex: 1, columnGap: 10, paddingVertical: 10, borderBottomWidth: 0.2, paddingBottom: 10 }}>
                                <Icon.Info
                                    height={25}
                                    width={25}
                                    stroke={"grey"}
                                    style={{ justifyContent: "flex-start", flex: 1 }} />

                                <Text style={{ flexWrap: 'wrap', textAlign: 'left', flex: 1 }}>{provider.description}</Text>
                            </View>


                        </View>
                        {/*Vị trí */}

                        <View style={{ marginHorizontal: 10, marginBottom: 10 }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 10 }}> Vị trí chỗ nghỉ</Text>
                            <View style={{ flexDirection: 'row', columnGap: 10, marginHorizontal: 10 }}>
                                <Icon.MapPin stroke={'grey'} height={24} width={24} />
                                <Text>{provider.address}</Text>
                            </View>

                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: 'white',
                            paddingVertical: 16,
                            paddingHorizontal: 16,
                            borderRadius: 30,

                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 24,

                            }}>
                            Thông tin các phòng</Text>

                    </View>
                </View>


                <View style={{ backgroundColor: "#f0f0f0" }}>
                    {Array.isArray(data) ? (
                        data.map((item) => (
                            <ShowRoom
                                key={item.categoryId}
                                id={item.categoryId}
                                name={item.categoryName}
                                imageRoom={item.imgIdCategories}
                                description={item.description}
                                person={item.person}
                                price={item.price}
                                area={item.area}
                                bedType={item.bedType}
                                countRoom={item.countRoom}
                                dataRoom={item}
                                start={start}
                                end={end}
                                personNum={person}

                            />

                        ))
                    ) : (
                        <Text>Data is not an array.</Text>
                    )}
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
        elevation: 5,
        marginTop: -30,
        borderRadius: 30,
        backgroundColor: '#fff',
        marginBottom: 10
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

})
