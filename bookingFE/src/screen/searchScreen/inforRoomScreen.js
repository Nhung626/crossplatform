import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Image,ScrollView } from 'react-native'
import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import { themeColor } from '../../utils/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation,useRoute } from '@react-navigation/native';


export default function InforRoomScreen() {
    
    const navigation=useNavigation()
    return (
        <SafeAreaView style={styles.container} >
        <StatusBar style='light' backgroundColor={themeColor.bgColor} />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name = "arrow-back-outline" style ={styles.icon}/>
            </TouchableOpacity>
            <Text style={styles.headerText}>Thông tin phòng</Text>
          </View>

          <View style = {styles.body}>
            <Image style ={{height:'100%'}} source={require('../../assets/images/hotelImages/hotels/rooms/room1.png')} />
          </View>
          <ScrollView>
            <View>
                <Text style ={styles.name}> Phòng XYZ</Text>
            </View>

            <View style ={styles.infor}>
                <Text style ={styles.text1}> Loại phòng</Text>
                <View style ={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flex:1,marginLeft:10,}}>
                        <Ionicons style={styles.icon} name ="people-circle-outline"/>
                        <Text>Số lượng khách/p: </Text>
                    </View>
                    <View style ={{flex:1,marginLeft:40,}}>
                        <Ionicons style={styles.icon} name ="tablet-landscape-outline"/>
                        <Text>Diện tích: </Text>
                    </View>
                </View>
            </View>

            <View style ={styles.infor}>
                <Text style ={styles.text1}> Nội thất </Text>
                <View style ={{flexDirection:'row',rowGap:10,columnGap:10, flexWrap:'wrap',padding:10,alignItems:'center'}}>
                    <View style={styles.fix}>
                        <Ionicons style={styles.icon} name ="tv-outline"/>
                        <Text>Tivi </Text>
                    </View>
                    <View style ={styles.fix}>
                        <Ionicons style={styles.icon} name ="bed-outline"/>
                        <Text>Điều hòa </Text>
                    </View>
                    <View style ={styles.fix}>
                        <Ionicons style={styles.icon} name ="bed-outline"/>
                        <Text>Nóng lạnh </Text>
                    </View>
                    <View style ={styles.fix}>
                        <Ionicons style={styles.icon} name ="bed-outline"/>
                        <Text>Tủ lạnh </Text>
                    </View>
                    <View style ={styles.fix}>
                        <Ionicons style={styles.icon} name ="bed-outline"/>
                        <Text>Giường </Text>
                    </View>
                    <View style ={styles.fix}>
                        <Ionicons style={styles.icon} name ="bed-outline"/>
                        <Text>Bồn tắm </Text>
                    </View>

                    
                </View>
            </View>
            
            <View style ={styles.infor}>
                <Text style ={styles.text1}> Tiện nghi </Text>
                <View style ={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flex:1,marginLeft:10,}}>
                        <Ionicons style={styles.icon} name ="wifi-outline"/>
                        <Text>Wifi free </Text>
                    </View>
                    <View style ={{flex:1,}}>
                        <Ionicons style={styles.icon} name ="paw-outline"/>
                        <Text>Pet </Text>
                    </View>
                    
                    
                </View>
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
        flexDirection: 'row',
        backgroundColor: '#29b4ca',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
      headerText: {
        flex: 1,
        color: '#fff',
        fontWeight:'bold',
        fontSize: 24,
        marginLeft: 30,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems:'center',
      },
      icon:{
        flex: 1,
        fontSize: 28,
        color: '#fff',
        marginLeft: 20,
        marginTop:20,
        
      },
      body:{
        flex:1,
      },
      fix:{
        paddingHorizontal:10
      },
      name:{
        flex:1,
        color:'#111',
        justifyContent:'flex-start',
        fontSize:28,
        fontWeight:'bold',
        marginBottom: 10, 
        borderBottomWidth: 0.6, 
        borderBottomColor: 'gray', 
        paddingBottom: 10,
      },
      infor:{
        flex:1,
        marginBottom: 10, 
        borderBottomWidth: 0.6, 
        borderBottomColor: 'gray', 
        paddingBottom: 10
      },
      text1:{
        color:'#111',
        fontSize:20,
        fontWeight:'bold',
      },
      icon:{
        fontSize:28,
        justifyContent:'center',
        alignItems:'center',
      },
      
    });