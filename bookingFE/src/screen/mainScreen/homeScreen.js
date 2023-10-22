import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchModal from "../../modals/searchModal";
import { themeColor } from "../../utils/theme";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' backgroundColor={themeColor.bgColor} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Reservar</Text>
      </View>
      <ScrollView>
        <View style={styles.modalSearchContainer}>

          <SearchModal />
        </View>
      </ScrollView>

    </SafeAreaView>

  )
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
})