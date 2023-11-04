import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getCheckoutAPI } from '../../../services/useAPI';
import HotelBooked from '../../../components/hotelBooked';

export default function Checkout() {
    const [checkout, setCheckout] = useState();
    const navigation = useNavigation();
    useEffect(() => {
        navigation.addListener('focus', async () => {
            const checkoutData = await getCheckoutAPI();
            if (checkoutData) {
                setCheckout(checkoutData)
            }
        })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <FlatList
                data={checkout}
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