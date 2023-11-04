import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getCancelAPI } from '../../../services/useAPI';
import HotelBooked from '../../../components/hotelBooked';
import { useEffect } from 'react';

export default function Cancel() {
  const [cancel, setCancel] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', async () => {
      const cancelData = await getCancelAPI();

      if (cancelData) {
        setCancel(cancelData)
      }
    })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <FlatList
        data={cancel}
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