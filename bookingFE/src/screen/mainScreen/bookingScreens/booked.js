import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getBookedAPI } from '../../../services/useAPI';
import HotelBooked from '../../../components/hotelBooked';
import { useEffect } from 'react';

export default function Booked() {
    const [booked, setBooked] = useState();
    const navigation = useNavigation()
    useEffect(() => {
        navigation.addListener('focus', async () => {
            const bookedData = await getBookedAPI();

            if (bookedData) {
                setBooked(bookedData);
            }
        })
        // const fetchData = async () => {
        //   const token = await getToken();
        //   const bookedData = await getBookedAPI(token);

        //   if (bookedData) {
        //     setBooked(bookedData);
        //   }
        // };

        // fetchData();
    }, [])
    console.log("booked Data: ", booked)
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <FlatList
                data={booked}
                keyExtractor={(item) => item.reservarId.toString()}
                renderItem={({ item }) => (
                    <HotelBooked
                        reservarId={item.reservarId}
                        providerId={item.providerId}
                        providerName={item.providerName}
                        imgProvider={item.imgProvider}
                        rooms={item.rooms}
                        reservarDate={item.reservarDate}
                        total={item.total}
                        statePayment={item.statePayment}
                        startDate={item.startDate}
                        endDate={item.endDate}
                        categoryId={item.categoryId}
                        stateReservar={item.stateReservar}
                    />
                )}
                ListEmptyComponent={() => <Text>Không có dữ liệu booked</Text>}
                contentContainerStyle={{ paddingBottom: 90 }}
            />

        </View>
    );
}