import { SafeAreaView,View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function AboutMe() {
  return (
    <SafeAreaView style ={styles.container}>
        <View style={styles.header}>
            <Ionicons style={styles.iconhelp} name ="help-circle-outline">

            </Ionicons>
        </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
      
      backgroundColor: '#065f46', 
      height: 100, 
      justifyContent: 'center', 
      alignItems:'center',
    },
    iconhelp:{
        
        fontSize: 32,
        color: '#d1fae5',
        marginTop:10,
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft:260,
    },
})