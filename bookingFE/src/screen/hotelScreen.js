import React, { useState } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { themeColor } from '../theme';
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Select, CheckIcon, NativeBaseProvider } from 'native-base'
export default function HotelScreen() {
    const { params: { id, name, imageHotel, imageStar, location, description, address, reviewPoint, reviews, stars, hotelsData, lng, lat } } = useRoute();
    console.log('hotel: ', name);
    const navigation = useNavigation();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('option1'); // Đặt giá trị mặc định của mục đã chọn

    const [service, setService] = React.useState("");

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <StatusBar style='dark' />

            {/* Header bar */}
            <ScrollView>
                <View style={{ position: 'relative' }}>
                    <Image style={{ width: '', height: 256 }} source={imageHotel} />
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
                            <View style={{ flexDirection: 'row' }}>
                                {Array.from({ length: stars }, (v, i) => (
                                    <Image
                                        key={i}
                                        style={{ width: 20, height: 20, marginRight: 2 }}
                                        source={imageStar} // Ảnh sao
                                    />
                                ))}
                                <Text> ( {reviews} reviews)</Text>
                            </View>

                        </View>
                        <View style={{ padding: 10, borderRadius: 10, backgroundColor: themeColor.bgColor }}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>{reviewPoint}</Text>
                        </View>


                    </View>
                    {/*Vị trí */}

                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 10 }}> Vị trí chỗ nghỉ</Text>
                        <Text>{address}</Text>
                        <Text>{location}</Text>
                    </View>



                </View>
                <View style={{ backgroundColor: 'white', paddingBottom: 144 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24, marginVertical: 16, paddingHorizontal: 16 }}> Thông tin các phòng</Text>
                    {/* Hiển thị các thông tin khác của khách sạn */}
                    {hotelsData && hotelsData.map((hotel) => (
                        <View key={hotel.id} style={{
                            flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10,
                            marginBottom: 10
                        }}>
                            <View>
                                <Image style={{ width: 144, height: 256, borderRadius: 30 }} source={hotel.image} />
                                {/* Hiển thị các thông tin khác của mỗi phòng */}
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <View style={{ width: 210 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, flexWrap: 'wrap', marginBottom: 5 }}>{hotel.name}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon.MapPin color='gray' width={15} height={15} style={{ marginHorizontal: 5 }} />
                                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'gray', fontSize: 12, flexWrap: 'wrap' }}>{hotel.address}</Text>

                                        </View>

                                    </View>
                                </View>
                                <Text style={{ color: 'gray' }}> Giá cho 1 đêm </Text>
                                <Text style={{ color: themeColor.bgColor, fontSize: 12, flexWrap: 'wrap', fontWeight: 'bold', fontSize: 18 }}>VND {hotel.price}</Text>
                                <Text style={{}}> { }</Text>
                                <TouchableOpacity onPress={() => setIsOpen(!isOpen)}
                                    style={{ width: '50%', backgroundColor: themeColor.bgColor, alignItems: 'center', marginHorizontal: 20, borderRadius: 100, padding: 16, paddingVertical: 12 }}>
                                    <Text>
                                        {isOpen ? "Chọn" : "Show"}

                                    </Text>

                                </TouchableOpacity>
                                <NativeBaseProvider>
                                    <Select selectedValue={service} minWidth={200} accessibilityLabel='Chọn phòng'
                                        placeholder='Chọn phòng' _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5" />
                                        }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                        <Select.Item label="UX Research" value="ux" />
                                        <Select.Item label="Web Development" value="web" />
                                        <Select.Item label="Cross Platform Development" value="cross" />
                                        <Select.Item label="UI Designing" value="ui" />
                                        <Select.Item label="Backend Development" value="backend" />
                                    </Select>
                                </NativeBaseProvider>



                            </View>

                        </View>

                    ))}
                </View>

            </ScrollView>

        </SafeAreaView >
    );
}
