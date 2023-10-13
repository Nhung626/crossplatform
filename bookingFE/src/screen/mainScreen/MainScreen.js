import { View, Text,StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SaveScreen from "./SaveScreen";
import BookingScreen from "./BookingScreen";
import UserScreen from "./UserScreen";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./homeScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColor } from "../../utils/theme";

const Tab = createBottomTabNavigator();
const screenOptions = {

  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 60,
    backgroundColor: "#fff",
  },
}
export default function MainScreen() {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar style='light' backgroundColor={themeColor.bgColor} />
      <Tab.Navigator screenOptions={screenOptions}>

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons name="search-outline"
                style={{
                  fontSize: 30,
                  color: focused ? "#29b4ca" : "#000",
                }}
              />
              <Text
                style={{
                  color: focused ? "#29b4ca" : "#000", fontSize: 16
                }}
              >
                Tìm kiếm
              </Text>
            </View>
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons name="heart-circle-outline"
                style={{
                  fontSize: 30,
                  color: focused ? "#29b4ca" : "#000",
                }}
              />
              <Text
                style={{ color: focused ? "#29b4ca" : "#000", fontSize: 16 }}
              >
                Đã lưu
              </Text>
            </View>
          ),
        }}
        name="Save"
        component={SaveScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons name="bed-outline"
                style={{
                  fontSize: 30,
                  color: focused ? "#29b4ca" : "#000",
                }}
              />
              <Text
                style={{ color: focused ? "#29b4ca" : "#000", fontSize: 16 }}
              >
                Đặt phòng
              </Text>
            </View>
          ),
        }}
        name="Book"
        component={BookingScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons name="person-circle-outline"
                style={{
                  fontSize: 30,
                  color: focused ? "#29b4ca" : "#000",
                }}

              />
              <Text
                style={{ color: focused ? "#29b4ca" : "#000", fontSize: 16 }}
              >
                Cá nhân
              </Text>
            </View>
          ),
        }}
        name="User"
        component={UserScreen}
      />
    </Tab.Navigator>
    </SafeAreaView>
    
  );
}
