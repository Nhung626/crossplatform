import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import { themeColor } from '../../utils/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { getImgCustomerUrl } from '../../services/baseUrl';

export default function InforRoomScreen() {

  const route = useRoute();
  const { id,
    name,
    imageRoom,
    description,
    price,
    person,
    area,
    bedType,
    countRoom,
    dataRoom } = route.params ?? {};
  console.log("Info room: ", id,
    name,
    imageRoom,
    description,
    price,
    person,
    area,
    bedType,
    countRoom,
    dataRoom);
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar style='light' backgroundColor={themeColor.bgColor} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông tin phòng</Text>
      </View>


      <ScrollView contentContainerStyle={{paddingBottom:90}}>
        <ScrollView horizontal
          pagingEnabled
          contentContainerStyle={{ alignItems: 'center' }}

        >
          {imageRoom ? (
            imageRoom.map((imageId, index) => (
              <Image
                key={index}
                style={{
                  width: screenWidth, // Điều chỉnh kích thước theo nhu cầu của bạn
                  height: 400,
                  resizeMode: 'cover',
                }}
                source={{ uri: `${getImgCustomerUrl}?imageId=${imageId}` }}
              />
            ))) : (<></>)}
        </ScrollView>
        <View>
          <Text style={styles.name}> {name}</Text>
        </View>

        <View style={styles.infor}>
          <Text style={styles.text1}> Loại phòng</Text>
          <View style={{ flexDirection: 'row', columnGap: 20, flex: 1, flexWrap: 'wrap', paddingHorizontal: 20, rowGap: 10 }}>
            <View >
              <Ionicons style={styles.icon} name="people-circle-outline" />
              <Text>{person} khách/phòng: </Text>
            </View>
            <View >
              <Ionicons style={styles.icon} name="tablet-landscape-outline" />
              <Text>Diện tích: {area}</Text>
            </View>
            <View >
              <Ionicons style={styles.icon} name="bed" />
              <Text>{bedType}</Text>
            </View>
            <View >
              <Octicons name="number" size={24} color="black" />
              <Text>Số phòng: {countRoom}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infor}>
          <Text style={styles.text1}> Mô tả </Text>
          {/* <View style={{ flexDirection: 'row', rowGap: 10, columnGap: 10, flexWrap: 'wrap', padding: 10, alignItems: 'center' }}>
            <View style={styles.fix}>
              <Ionicons style={styles.icon} name="tv-outline" />
              <Text>Tivi </Text>
            </View>
            <View style={styles.fix}>
              <Ionicons style={styles.icon} name="bed-outline" />
              <Text>Điều hòa </Text>
            </View>
            <View style={styles.fix}>
              <Ionicons style={styles.icon} name="bed-outline" />
              <Text>Nóng lạnh </Text>
            </View>
            <View style={styles.fix}>
              <Ionicons style={styles.icon} name="bed-outline" />
              <Text>Tủ lạnh </Text>
            </View>
            <View style={styles.fix}>
              <Ionicons style={styles.icon} name="bed-outline" />
              <Text>Giường </Text>
            </View>
            <View style={styles.fix}>
              <Ionicons style={styles.icon} name="bed-outline" />
              <Text>Bồn tắm </Text>
            </View>


          </View> */}

          <Text style={{ margin: 10 }}>{description}</Text>
        </View>

        {/* <View style={styles.infor}>
          <Text style={styles.text1}> Tiện nghi </Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View >
              <Ionicons style={styles.icon} name="wifi-outline" />
              <Text>Wifi free </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Ionicons style={styles.icon} name="paw-outline" />
              <Text>Pet </Text>
            </View>


          </View>
        </View> */}
        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
          <Text>Giá cho 1 đêm: </Text>
          <Text style={{ fontSize: 18, color: themeColor.bgColor }}> VND {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}
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
  icon: {
    flex: 1,
    fontSize: 28,
    color: '#fff',
    marginLeft: 20,
    marginTop: 20,

  },
  body: {
    flex: 1,
  },
  fix: {
    paddingHorizontal: 10
  },
  name: {
    flex: 1,
    color: '#111',
    justifyContent: 'flex-start',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 0.6,
    borderBottomColor: 'gray',
    paddingBottom: 10,
  },
  infor: {
    marginBottom: 10,
    borderBottomWidth: 0.6,
    borderBottomColor: 'gray',
    paddingBottom: 10,
  },
  text1: {
    color: '#111',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

});