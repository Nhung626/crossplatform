import { Text, StyleSheet, View, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColor } from "../../utils/theme";
import { useEffect, useState } from "react";
import { getFavorite, getToken } from "../../services/useAPI";
import ShowHotel from "../../components/showHotel";




export default function SaveScreen() {
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const response = await getFavorite(token)
      if (response) {
        console.log("data favorite: ", response)
        setData(response)
      }
      else {
        console.log("không có data!")
      }
    }
    fetchData();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' backgroundColor={themeColor.bgColor} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Đã lưu</Text>
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
  }
});