import { Text, StyleSheet, View, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColor } from "../../utils/theme";
import { useEffect, useState } from "react";
import { getFavorite, getListFavoriteBySearch, getToken } from "../../services/useAPI";
import ShowHotel from "../../components/showHotel";
import { useNavigation, useRoute } from "@react-navigation/native";
import Calendar from "../../modals/calendarPicker";
import NumOfPeople from "../../modals/numOfPeople";
import * as Icon from "react-native-feather"



export default function SaveScreen() {
  const navigation = useNavigation()
  const [data, setData] = useState("");
  const route = useRoute();
  const { startDate, endDate, startDayOfWeek, endDayOfWeek, peopleCount, countNight, start, end } = route.params ?? {};
  const [numOfPeopleModalVisible, setNumOfPeopleModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false)
  const [numOfPeopleData, setNumOfPeopleData] = useState({
    peopleCount
  });
  const [calendarData, setCalendarData] = useState({
    startDate, endDate, startDayOfWeek, countNight, endDayOfWeek, start, end
  });
  const handlePeopleClose = (dataPeople) => {
    setNumOfPeopleData(dataPeople);
    setNumOfPeopleModalVisible(false);
  }
  const handleCalendarClose = (dataCalendar) => {
    setCalendarData(dataCalendar);
    setCalendarModalVisible(false)
  }
  // console.log("dữ liệu: ", calendarData, numOfPeopleData)

  useEffect(() => {
    // const fetchdata = async () => {
    //   const token = await getToken();
    //   if (calendarData.countNight && numOfPeopleData.peopleCount) {
    //     console.log("dữ liệu: ", calendarData, numOfPeopleData)
    //     const responseData = await getListFavoriteBySearch(calendarData.start, calendarData.end, numOfPeopleData.peopleCount, token);
    //     if (responseData) {
    //       setData(responseData)
    //     }
    //   }
    //   else {
    //     const response = await getFavorite(token)
    //     if (response) {
    //       setData(response)
    //     }
    //     else {
    //       console.log("không có data!")
    //     }
    //   }
    // }
    // fetchdata();
    navigation.addListener('focus', async () => {
      const token = await getToken();
      if (calendarData.countNight && numOfPeopleData.peopleCount) {
        // console.log("dữ liệu: ", calendarData, numOfPeopleData)
        const responseData = await getListFavoriteBySearch(calendarData.start, calendarData.end, numOfPeopleData.peopleCount, token);
        if (responseData) {
          setData(responseData)
        }
      }
      else {
        const response = await getFavorite(token)
        if (response) {
          setData(response)
        }
        else {
          console.log("không có data!")
        }
      }
    })


  }, [])
  // console.log("calendar, people: ", calendarData.start, calendarData.end, numOfPeopleData.peopleCount)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' backgroundColor={themeColor.bgColor} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Đã lưu</Text>
      </View>
      <View style={styles.searchContainer}>

        <TouchableOpacity style={styles.searchButtonCalendar}
          onPress={() => setCalendarModalVisible(true)}>
          <Icon.Calendar height={20} width={20} stroke={themeColor.bgColor} style={{ marginLeft: 10 }} />

          <Text style={styles.searchText}>
            {calendarData.startDate ? (
              <>
                <Text >{calendarData.startDate}</Text>
                <Text>  - </Text>
                <Text >{calendarData.endDate}</Text>
                {calendarData.countNight ? (
                  <Text> - ({calendarData.countNight} đêm)</Text>

                ) : ('')}
              </>
            ) : (
              'Thời gian đặt phòng'
            )}
          </Text>
        </TouchableOpacity>
        {calendarModalVisible && (
          <Calendar
            isVisible={calendarModalVisible}
            onClose={handleCalendarClose}
          />
        )}


        <TouchableOpacity style={styles.searchButtonPeople}
          onPress={() => setNumOfPeopleModalVisible(true)}>
          <Icon.User height={20} width={20} stroke={themeColor.bgColor} style={{ marginLeft: 10 }} />
          <Text style={styles.searchText}>
            {numOfPeopleData.peopleCount ? (
              <>
                {/* <Text> {numOfPeopleData.roomCount} Phòng </Text>
                            <Text> • </Text> */}
                <Text > {numOfPeopleData.peopleCount} Người</Text>
              </>
            ) : (
              'Chọn số người'
            )}
          </Text>
        </TouchableOpacity>
        {numOfPeopleModalVisible && (
          <NumOfPeople
            isVisible={numOfPeopleModalVisible}
            onClose={handlePeopleClose}
          />
        )}
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 90,

        }}>
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
                start={calendarData.start}
                end={calendarData.end}
                person={numOfPeopleData.peopleCount}
              />
            ))
          ) : (
            <Text>Data is not an array.</Text>
          )}
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
  modalSearchContainer: {
    marginVertical: 20
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    height: "5%"
  },
  searchButtonCalendar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: themeColor.btColor,
    padding: 5
  },
  searchText: {
    color: themeColor.bgColor,
    marginLeft: 10,
  },
  searchButtonPeople: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: themeColor.btColor,
    padding: 5
  }
});