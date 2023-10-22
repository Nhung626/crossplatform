import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Fontisto';

import QLphong from './qlphong';

import QLdat from './qldat';
import Person from './person';

import AsyncStorage from '@react-native-async-storage/async-storage';



const Tab = createBottomTabNavigator();

export default function CreateroomScreen({ route }) {
  
const { token } = route.params ?? {}; // Nhận token từ màn hình đăng nhập
useEffect(() => {
  if (token) {
    console.log('Token đã được truyền qua:', token);
    AsyncStorage.setItem('token', token);
  } else {
    console.log('Token chưa được truyền qua.');
  }
}, [token]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Quản lý phòng"
        initialParams={{ token }} // Truyền token sang màn hình QLphong
        component={QLphong}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      {/* ... */}
      
      <Tab.Screen
        name="Quản lý đặt"
        initialParams={{ token }} // Truyền token sang màn hình QLdat
        component={QLdat}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="list-1" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Người dùng"
        initialParams={{ token }} // Truyền token sang màn hình Person
        component={Person}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
