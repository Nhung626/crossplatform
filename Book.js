import {SafeAreaView, View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function Book() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerText}>Chuyến đi</Text>
        <Ionicons style={styles.iconhelp} name ="help-circle-outline"></Ionicons>
        <Ionicons style={styles.iconplus} name="add-outline"></Ionicons>
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
      height: 80, 
      justifyContent: 'center', 
      alignItems: 'flex-end',  
    },
    headerText:{
        flex:10,
        color: '#d1fae5', 
        fontSize: 20, 
        marginLeft:20,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    iconhelp:{
        flex:1.5, 
        fontSize: 32,
        color: '#d1fae5',
        marginBottom:10,
        marginRight:20,
    },
    iconplus:{
        flex:1.5,
        fontSize: 32,
        color: '#d1fae5',
        marginBottom:10,
        marginRight:20,
      },
})