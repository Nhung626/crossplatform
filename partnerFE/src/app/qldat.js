import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/native';

const TopTab = createMaterialTopTabNavigator();

function TabScreen1() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Đơn mới</Text>
    </View>
  );
}

function TabScreen2() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Đã hủy</Text>
    </View>
  );
}

function TabScreen3() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Đang sử dụng</Text>
    </View>
  );
}

function TabScreen4() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Đã hoàn thành</Text>
    </View>
  );
}

export default function QLDat() {
  const route = useRoute();
  const { token } = route.params ?? {};

  return (
    <View style={{ flex: 1, top: 50 }}>
      <TopTab.Navigator
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          style: { backgroundColor: '#fff' },
        }}
      >
        <TopTab.Screen name="Đặt trước" component={TabScreen1} />
        <TopTab.Screen name="Bị hủy" component={TabScreen2} />
        <TopTab.Screen name="Đang sử dụng" component={TabScreen3} />
        <TopTab.Screen name="Đã hoàn thành" component={TabScreen4} />
      </TopTab.Navigator>
    </View>
  );
}
