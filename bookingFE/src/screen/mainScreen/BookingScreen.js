import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function BookingScreen() {

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Chuyến đi</Text>
        <Ionicons style={styles.iconhelp} name="help-circle-outline"></Ionicons>
        <Ionicons style={styles.iconplus} name="add-outline"></Ionicons>
      </View>
      <View>

      </View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#29b4ca',
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerText: {
    flex: 10,
    color: '#fff',
    fontSize: 20,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconhelp: {
    flex: 1.5,
    fontSize: 32,
    color: '#fff',
    marginBottom: 10,
    marginRight: 20,
  },
  iconplus: {
    flex: 1.5,
    fontSize: 32,
    color: '#fff',
    marginBottom: 10,
    marginRight: 20,
  },
})