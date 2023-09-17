import { StyleSheet,SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';


export default function Save() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style = {styles.headerText}>Đã lưu</Text>
                <Ionicons style={styles.iconplus} name="add-circle-outline"></Ionicons>
            </View>
        </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header: {
      flexDirection:'row',
      backgroundColor: '#065f46', 
      height: 80, 
      justifyContent: 'space-between', 
      alignItems: 'flex-end', 
    },
    headerText: {
      flex:1,
      color: '#d1fae5', 
      fontSize: 24, 
      marginLeft:40,
      marginBottom:5,
      justifyContent:'flex-start',
    },
    iconplus:{
      alignSelf:'flex-end',
      fontSize: 32,
      color: '#d1fae5',
      marginBottom:5,
      marginRight:40,
    },
  });
  