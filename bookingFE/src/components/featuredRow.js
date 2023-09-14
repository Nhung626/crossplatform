import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { themeColor } from '../theme'
import * as Icon from "react-native-feather";
import HotelCard from './hotelCard';


export default function FeaturedRow({ id, title, description, hotels }) {

    return (
        <View>
            <ScrollView>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
                            <Text style={{ color: 'gray', fontSize: 12 }}> {description}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={{ color: themeColor.text, fontWeight: 'bold' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false} contentContainerStyle={{
                    paddingHorizontal: 15,
                    overflow: 'visible',
                    paddingVertical: 20,
                }}>
                {hotels.map((hotel, index) => {
                    return (
                        <HotelCard
                            item={hotel}
                            key={index}
                        />
                    )
                })}

            </ScrollView>
        </View>


    )
}