import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { useRoute ,useNavigation } from "@react-navigation/native";
import { getCategoryApi } from "../services/useAPI";

export default function QLphong() {
    const route = useRoute();
  const { token } = route.params ?? {};
  
  const navigation = useNavigation();
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    // Gọi API khi màn hình được tải
    async function fetchRoomData() {
      try {
        const response = await getCategoryApi(data, token);
        if (response.status === 200) {
          // Lấy dữ liệu phòng từ phản hồi API
          setRoomData(response.data);
        } else {
          console.log('Lỗi khi gọi API:', response.data);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }

    fetchRoomData();
  }, []);

  function handleThemphong() {
    navigation.navigate('Themphong');
  }

  return (
    <ImageBackground
      source={require('../assets/theme.png')}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, bottom: 280, color: '#4477CE' }}> Danh sách phòng</Text>

        {/* Hiển thị danh sách phòng */}
        {roomData.map((room, index) => (
          <View key={index} style={styles.roomItem}>
            <Text style={styles.roomName}>{room.categoryName}</Text>
            <Text style={styles.roomDescription}>{room.description}</Text>
          </View>
        ))}

        <TouchableOpacity
          onPress={handleThemphong}
          style={styles.iconContainer}
        >
          <Icon name="plus-a" size={40} color="#235D9F" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = {
  roomItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4477CE',
  },
  roomDescription: {
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
};
