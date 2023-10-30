import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, FlatList, Image,RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { useRoute, useNavigation } from "@react-navigation/native";
import { getCategoryApi } from "../services/useAPI";
import { getImgRoomUrl } from "../services/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QLphong() {
  const route = useRoute();
  const { token } = route.params ?? {};
  const navigation = useNavigation();
  const [roomData, setRoomData] = useState([]);
  const [imgIdCategories, setImgIdCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isRefresh, setisRefresh] = useState(false);


  // Lưu trữ danh sách phòng vào AsyncStorage
  const storeRoomData = async (data) => {
    try {
      await AsyncStorage.setItem('roomData', JSON.stringify(data));
    } catch (error) {
      console.error('Error storing room data:', error);
    }
  };

  // Truy xuất danh sách phòng từ AsyncStorage
  const getRoomData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('roomData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setRoomData(parsedData);
      }
    } catch (error) {
      console.error('Error retrieving room data:', error);
    }
  };

  const fetchRoomData = async () => {
    try {
      const response = await getCategoryApi(token);
      if (response && response.status === 200) {
        // Xử lý dữ liệu ở đây
        setisRefresh(false);
        setRoomData(response.data);
      } else {
        console.error('Error fetching room data:', response ? response.data : 'Response is null');
        // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
      }
    } catch (error) {
      console.error('API error:', error);
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    } finally {
      setIsFetching(false);
    }
  }
  useEffect(() => {
   
    if (isFetching) {
      fetchRoomData();
    }
  }, [isFetching]);
  

  function handleThemphong() {
    navigation.navigate('Themphong', { token });
    setIsFetching(true);
  }
  const onRefresh = () => {
    setisRefresh(true);  
    fetchRoomData();
  }

  function renderItem({ item }) {
    const roomImg = item.imgIdCategories;

    const firstImageId = roomImg && roomImg.length > 0 ? roomImg[0] : null;
    const imageSource = firstImageId
      ? { uri: `${getImgRoomUrl}?imageId=${firstImageId}` }
      : require('../assets/add-img-icon.png');
    return (
      <TouchableOpacity onPress={() => navigation.navigate('RoomDetail', { post: item })}>
        <ScrollView style={styles.roomItem}>
          <View style={styles.roomImage}>
            <Image
              style={{ width: 150, height: 200, borderRadius: 30,borderWidth:1, }}
              source={imageSource} // Use the constructed image source
            />
          </View>
          <View style={styles.thongtinroom}>
            <Text style={styles.roomName}>Tên: {item.categoryName}</Text>
            <Text style={styles.roomDetail}>Số người: {item.person}</Text>
            <Text style={styles.roomDetail}>Diện tích phòng: {item.area}</Text>
            <Text style={styles.roomDetail}>Số phòng: {item.roomNumbers}</Text>
            <Text style={styles.roomDetail}>Mô tả thêm: {item.description}</Text>
            <Text style={styles.roomDetail}>Giá: {item.price}(VNĐ)</Text>
            <Text style={styles.roomDetail}>Kiểu giường: {item.bedType}</Text>
          </View>
        </ScrollView>
      </TouchableOpacity>
    );
  }
  return (
    <ImageBackground
      source={require('../assets/theme.png')}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 100, top: 60, fontSize: 20, color: '#4477CE' }}>Danh sách phòng</Text>

        <FlatList
          data={roomData}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={isRefresh}
            onRefresh={() => {onRefresh()}}
            />
            }
          keyExtractor={(item) => item.categoryId}

          style={{
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 3 }, // Độ dịch chuyển của bóng
          shadowOpacity: 1,
          shadowColor:'#4F4A45',
          borderWidth:1,
          borderColor: 'transparent',
          shadowRadius: 5}}
        />

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
    width: 380,
    height: 300,
    
    
  },

  roomImage: {
    flex: 1,
    right: 15,
  },
  thongtinroom: {
    flex: 2,
    marginLeft: 160,
    bottom: 200,
    borderLeftWidth: 2,
    padding: 10,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roomDetail: {
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
};
