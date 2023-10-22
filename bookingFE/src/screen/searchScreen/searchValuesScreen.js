import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import { themeColor } from '../../utils/theme';
import SortHotel from '../../components/sortHotel';
import { useNavigation, useRoute } from '@react-navigation/native';
import ShowHotel from '../../components/showHotel';
import { searchAPI } from '../../services/useAPI';

export default function SearchValuesScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState("")
  const route = useRoute()
  const { start, end, person, token } = route.params ?? {};
  console.log(start, end, person, token)
  useEffect(() => {
    const fetchData = async () => {
      const response = await searchAPI(start, end, person, token);
      if (response) {
        setData(response)
      }
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: themeColor.bgColor }}>

      <StatusBar style='light' backgroundColor={themeColor.bgColor} />
      {/*search bar*/}

      <View style={{
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 16,
        backgroundColor: themeColor.bgColor
      }}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', borderRadius: 20, padding: 12, marginRight: 10, backgroundColor: 'white' }}>
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Slider')}
          style={{ padding: 12, borderRadius: 200, backgroundColor: themeColor.btColor }}
        >
          <Icon.Sliders height={20} width={20} strokeWidth="2.5" stroke='white' />
        </TouchableOpacity>
      </View>


      {/*main*/}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 90,

        }}>
        {/*Categories*/}

        <SortHotel />
        {/* featured */}
        <View style={{ backgroundColor: "white" }}>
          {Array.isArray(data) ? (
            data.map((item) => (
              <ShowHotel
                key={item.providerId}
                id={item.providerId}
                name={item.providerName}
                imageHotel={item.imgIdProviders}
                description={item.description}
                address={item.address}
                providerPhone={item.providerPhone}
                start={start}
                end={end}
                token={token}
                person={person}
              />
            ))
          ) : (
            <Text>Data is not an array.</Text>
          )}
        </View>
      </ScrollView>

    </SafeAreaView >


  )
}
