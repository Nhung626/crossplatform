import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import SearchModal from "../../modals/searchModal";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Reservar</Text>
        <Ionicons style={styles.Icon1} name="chatbubble-outline"></Ionicons>
        <Ionicons style={styles.Icon2} name="notifications-outline"></Ionicons>
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
    flexDirection: 'row',
    backgroundColor: '#29b4ca',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 10,
    color: '#d1fae5',
    fontSize: 20,
    justifyContent: 'flex-end',
    marginLeft: 130,
  },
  Icon1: {
    flex: 2,
    fontSize: 28,
    color: '#d1fae5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Icon2: {
    flex: 2,
    fontSize: 28,
    color: '#d1fae5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSearchContainer: {
    marginVertical: 20
  }
})