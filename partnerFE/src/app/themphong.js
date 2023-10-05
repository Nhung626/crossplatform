import React, { useState } from 'react';
import { View, Text, TextInput, Button,TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Themphong() {
  const [image, setImage] = useState(null);
  const [hotelName, setHotelName] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [beds, setBeds] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [availability, setAvailability] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAddHotel = () => {
    // Thực hiện việc lưu thông tin khách sạn vào cơ sở dữ liệu hoặc thực hiện các hành động khác ở đây
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}

        <TouchableOpacity 
        onPress={handleImagePick}
        style={[styles.buttonThem, {backgroundColor:'#DE5223',width:100,height:50}]} >

        <Text style={[styles.textInput,{fontSize:15, color:'#fff',textAlign:'center',alignSelf: 'center',paddingTop:13}]}>
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
        placeholder="Diện tích (m2)"
        value={area}
        onChangeText={(text) => setArea(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Số giường"
        value={beds}
        onChangeText={(text) => setBeds(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Số phòng ngủ"
        value={bedrooms}
        onChangeText={(text) => setBedrooms(text)}
        keyboardType="numeric"
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
      <TextInput
        style={styles.input}
        placeholder="Số lượng"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả thêm"
        value={bathrooms}
        onChangeText={(text) => setAddRooms(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity 
      onPress={handleAddHotel}
      style={[styles.buttonThem, {backgroundColor:'#DE5223'}]}>

      <Text style={[styles.textInput,{fontSize:20, color:'#fff',textAlign:'center',alignSelf: 'center',paddingTop:5}]}>
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
    marginTop:50,
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonThem:{
    height:40,
    borderRadius:10,
    borderWidth:1,
  },



});
