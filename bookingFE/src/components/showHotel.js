import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { themeColor } from '../utils/theme'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { getImgCustomerUrl } from '../services/baseUrl';



export default function ShowHotel({
    id,
    name,
    imageHotel,
    description,
    address,
    providerPhone,
}) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Hotel', {
            id,
            name,
            imageHotel,
            description,
            address,
            providerPhone,
        })} style={{ marginHorizontal: 10 }}>
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
            }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginLeft: 10, marginRight: 10,
                    marginBottom: 10, marginTop: 10
                }}>
                    <View style={{ alignItems: 'center', marginRight: 4 }}>
                        <Image style={{ width: 144, height: 256, borderRadius: 30 }} source={{ uri: getImgCustomerUrl.concat(`?imageId=${imageHotel[0]}`) }} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                        <View >
                            <Text style={{ fontWeight: 'bold', fontSize: 18, flexWrap: 'wrap' }}>{name}</Text>
                            <Text>{address}</Text>
                            <Text>{description}</Text>
                            <Text>{providerPhone}</Text>
                            <Text></Text>


                            <View style={{ flexDirection: 'row' }}>
                                <Icon.MapPin color='gray' width={15} height={15} style={{ marginHorizontal: 5 }} />
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>

                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </View>

        </TouchableOpacity>



    )
}