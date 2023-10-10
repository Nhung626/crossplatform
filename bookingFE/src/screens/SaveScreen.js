import { Text, StyleSheet,View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";




export default function SaveScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.header}>
        <Text style = {styles.headerText}>Đã lưu</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddScreen')} >
          <Ionicons name="add-circle-outline" 
          style ={{alignSelf:'flex-end',
          fontSize: 32,
          color: '#fff',
          marginBottom:5,
          marginRight:40,}}/>
        </TouchableOpacity>
      </View>
  
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
      flex:1,
  },
  header: {
    flexDirection:'row',
    backgroundColor: '#29b4ca', 
    height: 60, 
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
  },
  headerText: {
    flex:1,
    color: '#fff', 
    fontSize: 24, 
    marginLeft:40,
    marginBottom:5,
    justifyContent:'flex-start',
  },
});