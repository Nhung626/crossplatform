import { Text, StyleSheet, View, useWindowDimensions, StatusBar, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { themeColor } from "../../utils/theme";
import { useState } from "react";
import { useEffect } from "react";
import { getBookedAPI, getCancelAPI, getCheckoutAPI, getToken } from "../../services/useAPI";
import HotelBooked from "../../components/hotelBooked";

const FirstRoute = () => {
  const [booked, setBooked] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const bookedData = await getBookedAPI(token);

      if (bookedData) {
        setBooked(bookedData)
      }
    }
    fetchData()
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <ScrollView contentContainerStyle={{
        paddingBottom: 90,
      }}>
        <View>
          {Array.isArray(booked) ? (
            booked.map((item) => (
              <HotelBooked
                key={item.reservarId}
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
              />
            ))
          ) : (
            <Text> Không có dữ liệu booked</Text>
          )}
        </View>
      </ScrollView>

    </View>
  );
}

const SecondRoute = () => {
  const [checkout, setCheckout] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const checkoutData = await getCheckoutAPI(token);

      if (checkoutData) {
        setCheckout(checkoutData)
      }
    }
    fetchData()
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <ScrollView contentContainerStyle={{
        paddingBottom: 90,
      }}>
        <View>
          {Array.isArray(checkout) && checkout.length > 0 ? (
            checkout.map((item) => (
              <HotelBooked
                key={item.reservarId}
                providerId={item.providerId}
                providerName={item.providerName}
                imgId={item.imgId}
                rooms={item.rooms}
                reservarDate={item.reservarDate}
                total={item.total}
                statePayment={item.statePayment}
              />
            ))
          ) : (
            <View
              style={{ alignItems: 'center', flex: 1, margin: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: '500', margin: 20 }}>Chưa có danh sách đã đặt!</Text>
              <Image
                source={require('../../assets/images/icons/meme.png')}
                style={{ height: 144, width: 144, resizeMode: 'cover' }} />
            </View>
          )}
        </View>
      </ScrollView>

    </View>
  );
}



const ThirdRoute = () => {
  const [cancel, setCancel] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const cancelData = await getCancelAPI(token);

      if (cancelData) {
        setCancel(cancelData)
      }
    }
    fetchData()
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <ScrollView contentContainerStyle={{
        paddingBottom: 90,
      }}>
        <View>
          {Array.isArray(cancel) ? (
            cancel.map((item) => (
              <HotelBooked
                key={item.reservarId}
                providerId={item.providerId}
                providerName={item.providerName}
                imgId={item.imgId}
                rooms={item.rooms}
                reservarDate={item.reservarDate}
                total={item.total}
                statePayment={item.statePayment}

              />
            ))
          ) : (
            <Text> Không có dữ liệu booked</Text>
          )}
        </View>
      </ScrollView>

    </View>
  );
}

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});


export default function BookingScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Đang đặt' },
    { key: 'second', title: 'Đã đặt' },
    { key: 'third', title: 'Đã hủy' },
  ]);


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Trạng thái</Text>
      </View>


      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>

  )
}
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#0891b2' }}
  />
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: themeColor.bgColor,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 10,
    color: '#fff',
    fontSize: 24,
    marginVertical: 10
  },
  iconhelp: {
    flex: 1.5,
    fontSize: 32,
    color: '#fff',
    marginBottom: 10,
    marginRight: 20,
  },
})