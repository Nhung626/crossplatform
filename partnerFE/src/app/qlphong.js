import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { useRoute, useNavigation } from "@react-navigation/native";
import { getCategoryApi, getImgRoomApi } from "../services/useAPI"; // Import getImgRoomApi
import { getImgRoomUrl } from "../services/baseUrl";

export default function QLphong() {
  const route = useRoute();
  const { token } = route.params ?? {};

  const navigation = useNavigation();
  const [roomData, setRoomData] = useState([]);
  const [imgIdCategories, setCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchRoomData() {
      try {
        const response = await getCategoryApi(token);
        if (response.status === 200) {
          setRoomData(response.data);

          const imgPromises = roomData.map((room) => {
            return getImgRoomApi(token, room.imageId); // Use getImgRoomApi to fetch images
          });

          const imgResponses = await Promise.all(imgPromises);
          const imgData = imgResponses.map((response) => response.data);
          setCategories(imgData);
        } else {
          console.error('Error fetching room data:', response.data);
          // Handle the error, show an error message to the user
        }
      } catch (error) {
        console.error('API error:', error);
        // Handle the error, show an error message to the user
      } finally {
        setIsFetching(false);
      }
    }

    // Add isFetching as a dependency to trigger data fetching
    if (isFetching) {
      fetchRoomData();
    }
  }, [isFetching]); // Use isFetching as a dependency

  function handleThemphong() {
    console.log('Attempting to navigate to Themphong');
    navigation.navigate('Themphong');
     // Replace 'Themphong' with your actual screen name
  }

  function renderItem({ item }) {
    const roomImg = item.imgIdCategories;
  
    const firstImageId = roomImg && roomImg.length > 0 ? roomImg[0] : null;
    const imageSource = firstImageId
    ? { uri: `${getImgRoomUrl}?imageId=${firstImageId}` }
    : require('../assets/add-img-icon.png');
    return (
      <TouchableOpacity onPress={() => navigation.navigate('RoomDetails', { post: item })}>
        <ScrollView style={styles.roomItem}>

          <View style={styles.roomImage}>
          <Image
            style={{ width: 150, height: 200, borderRadius: 30 }}
            source={imageSource} // Use the constructed image source
          />
          </View>
          <View style={styles.thongtinroom}>
          <Text style={styles.roomName}>Tên: {item.categoryName}</Text>
          <Text style={styles.roomDetail}>Số người: {item.person}</Text>
          <Text style={styles.roomDetail}>Diện tích phòng: {item.area}</Text>
          <Text style={styles.roomDetail}>Số phòng: {item.roomNumber}</Text>
          <Text style={styles.roomDetail}>Mô tả thêm: {item.description}</Text>
          <Text style={styles.roomDetail}>Giá: {item.price}</Text>
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
      <Text style={{ fontWeight: 'bold',marginBottom:100,top:60, fontSize: 20, color: '#4477CE' }}>Danh sách phòng</Text>

        <FlatList
          data={roomData}
          renderItem={renderItem}
          keyExtractor={(item) => item.categoryId} 
          
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Themphong',{ token });
            setIsFetching(true);
          }}
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
    height:300
  },
  
  roomImage: {
    flex:1,
    right:15,
        
  },
  thongtinroom:{
    flex:2,
    marginLeft:160,
    bottom:200,
    borderLeftWidth:2,
    padding:10
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
