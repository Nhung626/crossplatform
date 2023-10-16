import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SaveScreen from "./SaveScreen";
import BookingScreen from "./BookingScreen";
import UserScreen from "./UserScreen";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./homeScreen";
import { themeColor } from "../../utils/theme";
import { useRoute } from "@react-navigation/native";
import ScreenNames from "../../utils/screenNames";

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
  const route = useRoute()
  const { token } = route.params ?? {};
  console.log(token)
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName={"HomeScreen"}>

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons name="search-outline"
                style={{
                  fontSize: 30,
                  color: focused ? themeColor.bgColor : "#000",
                }}
              />
              <Text
                style={{
                  color: focused ? themeColor.bgColor : "#000", fontSize: 16
                }}
              >
                Tìm kiếm
              </Text>
            </View>
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{ token }}

      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons name="heart-circle-outline"
                style={{
                  fontSize: 30,
                  color: focused ? themeColor.bgColor : "#000",
                }}
              />
              <Text
                style={{ color: focused ? themeColor.bgColor : "#000", fontSize: 16 }}
              >
                Đã lưu
              </Text>
            </View>
          ),
        }}
        name="Save"
        component={SaveScreen}
        initialParams={{ token }}

      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons name="bed-outline"
                style={{
                  fontSize: 30,
                  color: focused ? themeColor.bgColor : "#000",
                }}
              />
              <Text
                style={{ color: focused ? themeColor.bgColor : "#000", fontSize: 16 }}
              >
                Đặt phòng
              </Text>
            </View>
          ),
        }}
        name="Book"
        component={BookingScreen}
        initialParams={{ token }}

      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons name="person-circle-outline"
                style={{
                  fontSize: 30,
                  color: focused ? themeColor.bgColor : "#000",
                }}

              />
              <Text
                style={{ color: focused ? themeColor.bgColor : "#000", fontSize: 16 }}
              >
                Cá nhân
              </Text>
            </View>
          ),
        }}
        name="User"
        component={UserScreen}
        initialParams={{ token }}

      />
    </Tab.Navigator>
  );
}
