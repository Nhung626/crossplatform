import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import { themeColor } from '../theme';
import Categories from '../components/sortHotel';
import FeaturedRow from '../components/featuredRow';
import { featured } from '../constains';
import { useNavigation } from '@react-navigation/native';

export default function SearchValuesScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>

      <StatusBar style='dark' />
      {/*search bar*/}

      <View style={{
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 16,
        backgroundColor: themeColor.bgColor
      }}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', borderRadius: 20, borderWidth: 4, padding: 12, marginRight: 10, borderColor: themeColor.btColor, backgroundColor: 'white' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }}
            onPress={() => navigation.navigate('SearchIcon')}>
            <Icon.Search height="25" width="25" stroke="gray" />
            <Text style={{ marginLeft: 2, flex: 1, color: 'gray' }} > Tìm kiếm </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderLeftWidth: 2, paddingRight: 2, paddingLeft: 8 }}
            onPress={() => navigation.navigate('Map')}>
            <Icon.MapPin height="20" width="20" stroke="gray" />
          </TouchableOpacity>

        </View>
        <View style={{ padding: 12, borderRadius: 200, backgroundColor: themeColor.btColor }}>
          <Icon.Sliders height={20} width={20} strokeWidth="2.5" stroke="white" />
        </View>
      </View>

      {/*main*/}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 120,

        }}>
        {/*Categories*/}

        <Categories />
        {/* featured */}
        <View >
          {
            [featured, featured, featured].map((item) => {
              return (
                <FeaturedRow
                  name={item.name}
                  imageHotel={item.imageHotel}
                  imageStar={item.imageStar}
                  stars={item.stars}
                  hotels={item.hotels}
                  description={item.description}
                  location={item.location}
                  reviews={item.reviews}
                  reviewPoint={item.reviewPoint}
                  address={item.address}
                  hotelsData={item.hotelsData}
                />
              )
            })
          }
        </View>
      </ScrollView>

    </SafeAreaView >


  )
}
