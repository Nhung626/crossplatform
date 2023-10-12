import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { themeColor } from '../../utils/theme';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getImgCustomerUrl } from '../../services/baseUrl';
import { getAllCategoryAPI } from '../../services/useAPI';
import FeaturedRow from '../../components/featuredRow';
export default function TestHotelScreen() {
    const { params: {
        id,
        name,
        imageHotel,
        description,
        address,
        providerPhone, } } = useRoute();
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

    return (
        <SafeAreaView>

            <StatusBar style='light' backgroundColor={themeColor.bgColor} />

            {/* Header bar */}
            <ScrollView>
                <View style={{ position: 'relative' }}>
                    <Image style={{ width: '', height: 256 }} source={{ uri: getImgCustomerUrl.concat(`?imageId=${imageHotel[0]}`) }} />
                    <View style={{ position: 'absolute', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity style={{ padding: 8, backgroundColor: themeColor.bgColor, borderRadius: 100 }} onPress={() => navigation.goBack()}>
                            <Icon.ArrowLeft height={30} width={30} strokeWidth="2" stroke="white" />
                        </TouchableOpacity>
                        <View style={{ padding: 8, backgroundColor: themeColor.bgColor, borderRadius: 100 }}>
                            <Icon.Heart height={30} width={30} strokeWidth="2" stroke="white" style={{ marginHorizontal: 10 }} fill='white' />
                        </View>
                    </View>
                </View>
                {/* Content */}
                <View style={{
                    borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: 'white', marginTop: -48, paddingTop: 24
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        <View style={{ flexDirection: 'column', width: "80%" }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24, flexWrap: 'wrap', marginBottom: 10 }}>{name} </Text>


                        </View>


                    </View>
                    {/*Vị trí */}

                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 10 }}> Vị trí chỗ nghỉ</Text>
                        <Text>{address}</Text>
                    </View>



                </View>
                <View style={{ backgroundColor: 'white', paddingBottom: 144 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24, marginVertical: 16, paddingHorizontal: 16 }}> Thông tin các phòng</Text>

                </View>
                <View style={{ backgroundColor: "white" }}>
                    {Array.isArray(data) ? (
                        data.map((item) => (
                            <FeaturedRow
                                key={item.categoryId}
                                name={item.categoryName}
                                imageHotel={item.imgIdCategories}
                                description={item.description}
                                address={item.address}
                                providerPhone={item.providerPhone || 0} />
                        ))
                    ) : (
                        <Text>Data is not an array.</Text>
                    )}
                </View>

            </ScrollView>

        </SafeAreaView >
    );
}
