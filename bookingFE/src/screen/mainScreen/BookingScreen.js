import { Text, StyleSheet, View, useWindowDimensions, StatusBar, ScrollView, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { themeColor } from "../../utils/theme";
import { useState } from "react";
import { useEffect } from "react";
import { getBookedAPI, getCancelAPI, getCheckoutAPI, getToken } from "../../services/useAPI";
import HotelBooked from "../../components/hotelBooked";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenNames from "../../utils/screenNames";
import Booked from "./bookingScreens/booked";
import Checkout from "./bookingScreens/checkout";
import Cancel from "./bookingScreens/cancel";

// const FirstRoute = () => {
//   const [booked, setBooked] = useState();
//   const navigation = useNavigation()
//   useEffect(() => {
//     navigation.addListener('focus', async () => {
//       const bookedData = await getBookedAPI();

//       if (bookedData) {
//         setBooked(bookedData);
//       }
//     })
//     // const fetchData = async () => {
//     //   const token = await getToken();
//     //   const bookedData = await getBookedAPI(token);

//     //   if (bookedData) {
//     //     setBooked(bookedData);
//     //   }
//     // };

//     // fetchData();
//   }, [])

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }} >
//       <FlatList
//         data={booked}
//         keyExtractor={(item) => item.reservarId.toString()}
//         renderItem={({ item }) => (
//           <HotelBooked
//             reservarId={item.reservarId}
//             providerId={item.providerId}
//             providerName={item.providerName}
//             imgProvider={item.imgProvider}
//             rooms={item.rooms}
//             reservarDate={item.reservarDate}
//             total={item.total}
//             statePayment={item.statePayment}
//             startDate={item.startDate}
//             endDate={item.endDate}
//             categoryId={item.categoryId}
//             stateReservar={item.stateReservar}
//           />
//         )}
//         ListEmptyComponent={() => <Text>Không có dữ liệu booked</Text>}
//         contentContainerStyle={{ paddingBottom: 90 }}
//       />

//     </View>
//   );
// }

// const SecondRoute = () => {
//   const [checkout, setCheckout] = useState();
//   const navigation = useNavigation();
//   useEffect(() => {
//     navigation.addListener('focus', async () => {
//       const checkoutData = await getCheckoutAPI();
//       if (checkoutData) {
//         setCheckout(checkoutData)
//       }
//     })
//     // const fetchData = async () => {
//     //   const token = await getToken();
//     //   const checkoutData = await getCheckoutAPI(token);

//     //   if (checkoutData) {
//     //     setCheckout(checkoutData)
//     //   }
//     // }
//     // fetchData()
//   }, [])

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }} >
//       <FlatList
//         data={checkout}
//         keyExtractor={(item) => item.reservarId.toString()}
//         renderItem={({ item }) => (
//           <HotelBooked
//             reservarId={item.reservarId}
//             providerId={item.providerId}
//             providerName={item.providerName}
//             imgProvider={item.imgProvider}
//             rooms={item.rooms}
//             reservarDate={item.reservarDate}
//             total={item.total}
//             statePayment={item.statePayment}
//             startDate={item.startDate}
//             endDate={item.endDate}
//             categoryId={item.categoryId}
//             stateReservar={item.stateReservar}
//           />
//         )}
//         ListEmptyComponent={() => <Text>Không có dữ liệu booked</Text>}
//         contentContainerStyle={{ paddingBottom: 90 }}
//       />
//     </View>
//   );
// }



// const ThirdRoute = () => {
//   const [cancel, setCancel] = useState();
//   const navigation = useNavigation();
//   useEffect(() => {
//     navigation.addListener('focus', async () => {
//       const cancelData = await getCancelAPI();

//       if (cancelData) {
//         setCancel(cancelData)
//       }
//     })
//     // const fetchData = async () => {
//     //   const token = await getToken();
//     //   const cancelData = await getCancelAPI(token);

//     //   if (cancelData) {
//     //     setCancel(cancelData)
//     //   }
//     // }
//     // fetchData()
//   }, [])

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }} >
//       <FlatList
//         data={cancel}
//         keyExtractor={(item) => item.reservarId.toString()}
//         renderItem={({ item }) => (
//           <HotelBooked
//             reservarId={item.reservarId}
//             providerId={item.providerId}
//             providerName={item.providerName}
//             imgProvider={item.imgProvider}
//             rooms={item.rooms}
//             reservarDate={item.reservarDate}
//             total={item.total}
//             statePayment={item.statePayment}
//             startDate={item.startDate}
//             endDate={item.endDate}
//             categoryId={item.categoryId}
//             stateReservar={item.stateReservar}
//           />
//         )}
//         ListEmptyComponent={() => <Text>Không có dữ liệu booked</Text>}
//         contentContainerStyle={{ paddingBottom: 90 }}
//       />

//     </View>
//   );
// }

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
//   third: ThirdRoute,
// });


// export default function BookingScreen() {
//   const layout = useWindowDimensions();
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'first', title: 'Đang đặt' },
//     { key: 'second', title: 'Đã đặt' },
//     { key: 'third', title: 'Đã hủy' },
//   ]);


//   return (
//     <SafeAreaView style={styles.container}>

//       <View style={styles.header}>
//         <Text style={styles.headerText}>Trạng thái</Text>
//       </View>
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{ width: layout.width }}
//         renderTabBar={renderTabBar}
//       />
//     </SafeAreaView>

//   )
// }
// const renderTabBar = props => (
//   <TabBar
//     {...props}
//     indicatorStyle={{ backgroundColor: 'white' }}
//     style={{ backgroundColor: '#0891b2' }}
//   />
// );
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: themeColor.bgColor,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     flex: 10,
//     color: '#fff',
//     fontSize: 24,
//     marginVertical: 10
//   },
//   iconhelp: {
//     flex: 1.5,
//     fontSize: 32,
//     color: '#fff',
//     marginBottom: 10,
//     marginRight: 20,
//   },
// })


export default function BookingScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Đang đặt' },
    { key: 'second', title: 'Đã đặt' },
    { key: 'third', title: 'Đã hủy' },
  ]);
  const renderScene = SceneMap({
    first: Booked,
    second: Checkout,
    third: Cancel,
  });
  return (
    <TabView
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      initialLayout={{ width: layout.width }}
    />
  )
}