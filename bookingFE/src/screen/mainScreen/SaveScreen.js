import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";





export default function SaveScreen() {
  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.headerText}>Đã lưu</Text>
        
      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#29b4ca',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontSize: 24,
    marginLeft: 40,
    marginBottom: 5,
    justifyContent: 'flex-start',
  },
});