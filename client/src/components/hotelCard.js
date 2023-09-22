import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function HotelCard({ item }) {
    return (

        <TouchableWithoutFeedback>
            <View style={{
                marginRight: 24,
            }}>
                <Image style={{ height: 256, width: 144, borderRadius: 30 }} source={item.image} />
                <View style={{ paddingHorizontal: 12, paddingBottom: 16, marginVertical: 8 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 8 }}> {item.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 4 }}>
                        <Image source={require('../images/fullStar.png')} style={{ height: 16, width: 16 }} />
                    </View>
                </View>
            </View>


        </TouchableWithoutFeedback>

    )
}