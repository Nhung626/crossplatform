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
      <Text></Text>
    </View>
  );
}

function TabScreen3() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text></Text>
    </View>
  );
}

function TabScreen4() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text></Text>
    </View>
  );
}

function TabScreen5() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text></Text>
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
        <TopTab.Screen name="Đang sử dụng" component={TabScreen2} />
        <TopTab.Screen name="Đã hoàn thành" component={TabScreen3} />
        <TopTab.Screen name="Bị hủy" component={TabScreen4} />
        <TopTab.Screen name="Đánh giá" component={TabScreen5} />
      </TopTab.Navigator>
    </View>
  );
}
