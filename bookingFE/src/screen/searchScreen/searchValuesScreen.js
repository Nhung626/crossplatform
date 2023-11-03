import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import { themeColor } from '../../utils/theme';
import SortHotel from '../../components/sortHotel';
import { useNavigation, useRoute } from '@react-navigation/native';
import ShowHotel from '../../components/showHotel';
import { searchAPI } from '../../services/useAPI';
import SearchIcon from '../../components/searchIcon';

export default function SearchValuesScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState("")
  const [searchModalVisible, setSearchModalVisible] = useState(false)

  const [dataSearch, setDataSearch] = useState({
    start, end, person,
  })
  const route = useRoute()
  const { start, end, person, token, startDate, endDate } = route.params ?? {};
  console.log(start, end, person, dataSearch.person, token)

  useEffect(() => {
    const fetchData = async () => {
      // navigation.addListener('focus', async () => {
      if (dataSearch.person, dataSearch.start, dataSearch.end) {
        const response = await searchAPI(dataSearch.start, dataSearch.end, dataSearch.person, token);
        if (response) {
          setData(response)
        }
      } else {
        const response = await searchAPI(start, end, person, token);
        if (response) {
          setData(response)
        }
      }

      // })

    }
    fetchData();
  }, [dataSearch.person, dataSearch.start, dataSearch.end]);
  const handleSearchModalClose = (data) => {
    setDataSearch(data)
    setSearchModalVisible(false)
  }

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
            onPress={() => setSearchModalVisible(true)}>
            <Icon.Search height="25" width="25" stroke="gray" />
            {dataSearch.startDate && dataSearch.endDate && dataSearch.person ? (
              <Text style={{ marginLeft: 2, flex: 1, color: 'gray' }}>
                {dataSearch.startDate} - {dataSearch.endDate} || {dataSearch.person} người
              </Text>
            ) : (
              <Text style={{ marginLeft: 2, flex: 1, color: 'gray' }}>
                {startDate} - {endDate} || {person} người
              </Text>
            )}
          </TouchableOpacity>
          {searchModalVisible && (
            <Modal
              animationType='slide'
              transparent={true}
              visible={searchModalVisible}
              onRequestClose={handleSearchModalClose}
            >

              <View style={{
                backgroundColor: themeColor.bgModalColor,
                borderTopLeftRadius: 50, borderTopRightRadius: 50,
                borderWidth: 1,
                borderColor: "#ccc",
                height: "99%",
                width: "100%",
              }}>
                <View style={{ flex: 1, paddingTop: 30 }}>
                  <SearchIcon onClose={handleSearchModalClose} />

                </View>

              </View>
            </Modal>
          )}


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
                star={item.star}
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
