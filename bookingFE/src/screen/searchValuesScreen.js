import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import { themeColor } from '../theme';
import Categories from '../components/sortHotel';
import { featured } from '../../constains';
import FeaturedRow from '../components/featuredRow';

export default function SearchValuesScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>

      <StatusBar style='dark' />
      {/*search bar*/}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 16, backgroundColor: '#8db4ad' }}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', borderRadius: 20, borderWidth: 4, padding: 12, marginRight: 10, borderColor: themeColor.bgColor(1), backgroundColor: 'white' }}>
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder='Tìm kiếm' keyboardType='default' style={{ marginLeft: 2, flex: 1, }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderLeftWidth: 2, paddingRight: 2, paddingLeft: 8 }}>
            <Icon.MapPin height="20" width="20" stroke="gray" />
          </View>
        </View>
        <View style={{ padding: 12, borderRadius: 999, backgroundColor: themeColor.bgColor(1) }}>
          <Icon.Sliders height={20} width={20} strokeWidth="2.5" stroke="white" />
        </View>
      </View>

      {/*main*/}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50
        }}>
        {/*Categories*/}
        <Categories />
        {/* featured */}
        <View style={{ marginTop: 20 }}>
          {
            [featured, featured, featured].map((item, index) => {
              return (
                <FeaturedRow
                  key={index}
                  title={item.title}
                  hotels={item.hotels}
                  description={item.description} />
              )
            })
          }
        </View>
      </ScrollView>

    </SafeAreaView>

  )
}