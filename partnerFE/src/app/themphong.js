import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Themphong() {
  const [images, setImages] = useState([]);
  const [hotelName, setHotelName] = useState('');
  const [location, setLocation] = useState('');
  const [roomName, setRoomName] = useState('');
  const [area, setArea] = useState('');
  const [beds, setBeds] = useState('');
  const [convenients, setConvenients] = useState('');
  const [availability, setAvailability] = useState('');
  const [price, setPrice] = useState('');

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      console.log('User canceled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else {
      // Lấy danh sách ảnh đã chọn
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImages([...images, ...selectedImages]);
    }
  };
  
  

  const handleAddHotel = () => {
    // Thực hiện việc lưu thông tin khách sạn vào cơ sở dữ liệu hoặc thực hiện các hành động khác ở đây
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {images.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={styles.selectedImage} />
        ))}

        <TouchableOpacity
          onPress={handleImagePick}
          style={[styles.buttonThem, { backgroundColor: '#DE5223', width: 100, height: 50 }]}
        >
          <Text style={[styles.textInput, { fontSize: 15, color: '#fff', textAlign: 'center', alignSelf: 'center', paddingTop: 13 }]}>
            Nhập ảnh
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Tên khách sạn"
        value={hotelName}
        onChangeText={(text) => setHotelName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Vị trí khách sạn"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Tên phòng"
        value={roomName}
        onChangeText={(text) => setRoomName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Diện tích (m2)"
        value={area}
        onChangeText={(text) => setArea(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Loại giường"
        value={beds}
        onChangeText={(text) => setBeds(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Tiện nghi"
        value={convenients}
        onChangeText={(text) => setConvenients(text)}
        keyboardType="text"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Tình trạng phòng (Còn/Hết/Đang sử chữa)"
        value={availability}
        onChangeText={(text) => setAvailability(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá tiền (VND)"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      
      
      <TouchableOpacity
        onPress={handleAddHotel}
        style={[styles.buttonThem, { backgroundColor: '#DE5223' }]}
      >
        <Text style={[styles.textInput, { fontSize: 20, color: '#fff', textAlign: 'center', alignSelf: 'center', paddingTop: 5 }]}>
          Thêm phòng
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 100,
    flexDirection: 'row', // Hiển thị ảnh theo hàng ngang
    flexWrap: 'wrap',     // Cho phép các ảnh tràn hàng
  },
  selectedImage: {
    width: 100,            // Kích thước ảnh
    height: 100,
    marginRight: 10,      // Khoảng cách giữa các ảnh ngang
    marginBottom: 10,     // Khoảng cách giữa các ảnh dọc
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonThem: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
  },
});