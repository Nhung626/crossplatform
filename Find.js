import { SafeAreaView,View,  Text, StyleSheet} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function Find() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style = {styles.headerText}>Booking.com</Text>
            <Ionicons style={styles.Icon1} name="chatbubble-outline"></Ionicons>
            <Ionicons style={styles.Icon2} name ="notifications-outline"></Ionicons>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
      flexDirection:'row',
      backgroundColor: '#065f46', 
      height: 160, 
      justifyContent: 'center', 
      alignItems: 'center',  
    },
    headerText: {
        flex:10,
        color: '#d1fae5', 
        fontSize: 20, 
        justifyContent:'flex-end',
        marginLeft:130,
    },
    Icon1:{
        flex:2,
        fontSize:28,
        color:'#d1fae5',
        alignItems:'center',
        justifyContent:'center',
    },
    Icon2:{
        flex:2,
        fontSize:28,
        color:'#d1fae5',
        alignItems:'center',
        justifyContent:'center',
    },
})
