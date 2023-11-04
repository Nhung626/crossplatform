import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { themeColor } from '../../utils/theme';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getImgCustomerUrl } from '../../services/baseUrl';
import { getAllCategoryAPI } from '../../services/useAPI';
import FeaturedRow from '../../components/showHotel';
import ShowRoom from '../../components/showRoom';
export default function HotelScreen() {
    const { params: {
        id,
        name,
        imageHotel,
        description,
        address,
    } } = useRoute();
    const navigation = useNavigation();
    const [data, setData] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllCategoryAPI(id);
                if (response.status === 200) {
                    setData(response.data)
                } else {
                    console.log(response.status)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, []);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const handleSelectRoom = (room) => {
        if (!selectedRooms.includes(room.id)) {
            // Nếu phòng chưa được chọn, thêm vào danh sách
            setSelectedRooms([...selectedRooms, room.id]);

            // Chuyển đến màn hình thanh toán và truyền thông tin phòng
            navigation.navigate('PaymentScreen', { selectedRoom: room });
        }
    };
    const screenWidth = Dimensions.get("window").width;
    return (
        <SafeAreaView style={{ backgroundColor: themeColor.bgModalColor }}>

            <StatusBar style='light' backgroundColor={themeColor.bgColor} />

            {/* Header bar */}
            <ScrollView>
                <ScrollView horizontal
                    pagingEnabled
                    contentContainerStyle={styles.contentContainer}

                >
                    {imageHotel.map((imageId, index) => (
                        <Image
                            key={index}
                            style={{
                                width: screenWidth, // Điều chỉnh kích thước theo nhu cầu của bạn
                                height: 300,
                                resizeMode: 'cover',
                            }}
                            source={{ uri: `${getImgCustomerUrl}?imageId=${imageId}` }}
                        />
                    ))}
                </ScrollView>
                <View style={styles.container}>


                    <View style={{ position: 'absolute', width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                        <TouchableOpacity style={{ padding: 8, backgroundColor: themeColor.bgColor, borderRadius: 100 }} onPress={() => navigation.goBack()}>
                            <Icon.ArrowLeft height={30} width={30} strokeWidth="2" stroke="white" />
                        </TouchableOpacity>
                        <View style={{ padding: 8, backgroundColor: themeColor.bgColor, borderRadius: 100 }}>
                            <Icon.Heart height={30} width={30} strokeWidth="2" stroke="white" style={{ marginHorizontal: 10 }} fill='white' />
                        </View>
                    </View>
                    {/* Content */}
                    <View style={{
                        backgroundColor: 'white', paddingTop: 24
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 15 }}>
                            <View style={{ flexDirection: 'column', width: "80%" }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, flexWrap: 'wrap', paddingBottom: 10, textAlign: 'center', }}>{name} </Text>

                                <Text>{description}</Text>
                            </View>


                        </View>
                        {/*Vị trí */}

                        <View style={{ marginHorizontal: 10 }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingVertical: 10 }}> Vị trí chỗ nghỉ</Text>
                            <View style={{ flexDirection: 'row', columnGap: 10, marginHorizontal: 10 }}>
                                <Icon.MapPin stroke={'grey'} height={24} width={24} />
                                <Text>{address}</Text>
                            </View>

                        </View>
                    </View>
                    <View
                        style={{ backgroundColor: 'white', }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 24,
                                marginVertical: 16,
                                paddingHorizontal: 16
                            }}>
                            Thông tin các phòng</Text>

                    </View>
                </View>


                <View style={{ backgroundColor: themeColor.bgModalColor }}>
                    {Array.isArray(data) ? (
                        data.map((item) => (
                            <ShowRoom
                                key={item.categoryId}
                                name={item.categoryName}
                                imageRoom={item.imgIdCategories}
                                description={item.description}
                                person={item.person}
                                price={item.price}
                                area={item.area}
                                bedType={item.bedType}
                                roomNumber={item.roomNumber}


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
        elevation: 5, // Cho Android
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
