import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColor } from '../../utils/theme'
import * as Icon from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps';
import { featured } from '../constains'

export default function MapScreen() {
    const navigation = useNavigation();
    const hotels = featured.find(item => item.id === 1);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>


            <MapView
                style={{ width: '100%', height: '98%', top: '4.5%', position: 'absolute' }}
                initialRegion={{
                    latitude: hotels.lat,
                    longitude: hotels.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                mapType='standard'
            >
                <Marker
                    coordinate={{
                        latitude: hotels.lat,
                        longitude: hotels.lng
                    }}
                    title={hotels.name}
                    pinColor={themeColor.btColor}
                ></Marker>

            </MapView>

            <TouchableOpacity
                style={{
                    flexDirection: 'row', flex: 1, alignItems: 'center', top: "10%", left: '5%', width: '75%',
                    borderRadius: 20, borderWidth: 4, padding: 12, borderColor: themeColor.btColor, position: 'absolute', backgroundColor: 'white'
                }}
                onPress={() => navigation.navigate('SearchIcon')}>
                <Icon.Search height="25" width="25" stroke="gray" />
                <Text style={{ marginLeft: 2, flex: 1, color: 'gray' }} > Tìm kiếm </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ position: 'absolute', padding: 12, borderRadius: 200, top: "11%", right: '5%', backgroundColor: themeColor.btColor }}>
                <Icon.Sliders height={20} width={20} strokeWidth="2.5" stroke="white" />
            </TouchableOpacity>

        </SafeAreaView>

    )
}