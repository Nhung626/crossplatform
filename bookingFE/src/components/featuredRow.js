import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { themeColor } from '../theme'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';



export default function FeaturedRow({
    name,
    imageHotel,
    imageStar,
    stars,
    hotelsData,
    description,
    location,
    reviewPoint,
    reviews,
    address }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Hotel', {
            name,
            imageHotel,
            imageStar,
            stars,
            hotelsData,
            description,
            location,
            reviewPoint,
            reviews,
            address
        })}>
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
            }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginLeft: 10, marginRight: 10,
                    marginBottom: 10, marginTop: 10
                }}>
                    <View style={{ alignItems: 'center', marginRight: 4 }}>
                        <Image style={{ width: 144, height: 256, borderRadius: 30 }} source={imageHotel} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <View >
                            <Text style={{ fontWeight: 'bold', fontSize: 18, flexWrap: 'wrap' }}>{name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon.MapPin color='gray' width={15} height={15} style={{ marginHorizontal: 5 }} />
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'gray', fontSize: 12, flexWrap: 'wrap' }}>{location}</Text>
                                    <Text style={{ color: 'gray', fontSize: 12, flexWrap: 'wrap' }}>{reviewPoint}</Text>

                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </View>

        </TouchableOpacity>



    )
}