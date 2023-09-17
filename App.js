import {Styles, Text, SafeAreaView } from 'react-native';
import { Find, Save, Book, AboutMe } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLablel : false,
  headerShown: false,
  tabBarStyle :{
    position:"absolute",
    bottom:0,
    right:0,
    left:0,
    height:80,
    backgroundColor:"#065f46",
  },
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions = {screenOptions}>
        <Tab.Screen name ="."  component ={Find} options ={{
          tabBarIcon:({focused}) => {
            return(
              <SafeAreaView style={{alignItems:"center",justifyContent:"center" }}>
                <Ionicons  name ="search-outline" style={{alignItems:"center",justifyContent:"center" , fontSize: 24, color:focused ? "#fecdd3" : "#d1fae5"}}  />
                <Text style={{alignItems:"center",justifyContent:"center" , fontSize: 16, color:focused ? "#fecdd3" : "#d1fae5"}}  >
                  Tìm kiếm
                </Text>
            </SafeAreaView>
            )
            
          }
        }}/>
        <Tab.Screen name =".." component ={Save} options ={{

          tabBarIcon:({focused}) => {
            return(
              <SafeAreaView style={{alignItems:"center",justifyContent:"center", }}>
                <Ionicons name ="heart-outline" style={{alignItems:"center",justifyContent:"center" , fontSize: 24, color:focused ? "#fecdd3" : "#d1fae5"}}/>
                <Text style={{alignItems:"center",justifyContent:"center" , fontSize: 16, color:focused ? "#fecdd3" : "#d1fae5"}} >
                  Đã lưu
                </Text>
            </SafeAreaView>
            )
            
          }
        }}/>
        <Tab.Screen name =",." component ={Book} 
        options ={{
          tabBarIcon:({focused}) => {
            return(
              <SafeAreaView style={{alignItems:"center",justifyContent:"center", }}>
                <Ionicons name ="bed-outline" style={{alignItems:"center",justifyContent:"center" , fontSize: 24, color:focused ? "#fecdd3" : "#d1fae5"}}/>
                <Text style={{alignItems:"center",justifyContent:"center" , fontSize: 16, color:focused ? "#fecdd3" : "#d1fae5"}}  >
                  Đặt chỗ
                </Text>
            </SafeAreaView>
            )
            
          }
        }}/>
        <Tab.Screen name =".," component ={AboutMe} options ={{
          tabBarIcon:({focused}) => {
            return(
              <SafeAreaView style={{alignItems:"center",justifyContent:"center", }}>
                <Ionicons name ="person-circle-outline" style={{alignItems:"center",justifyContent:"center" , fontSize: 24, color:focused ? "#fecdd3" : "#d1fae5"}}/>
                <Text style={{alignItems:"center",justifyContent:"center" , fontSize: 16, color:focused ? "#fecdd3" : "#d1fae5"}}  >
                  Cá Nhân
                </Text>
                
            </SafeAreaView>
            )
            
          }
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
  
}
