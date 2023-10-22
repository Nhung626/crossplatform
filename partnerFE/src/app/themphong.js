import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { providerAddRoom, getToken } from "../services/useAPI";

export default function Themphong({ route }) {
  const [imgCategories, setImgCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [person, setPerson] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [roomNumbers, setRoomNumbers] = useState('');
  const [bedType, setBedType] = useState('');

  const [token, setToken] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const getTokenId = async () => {
      const token = await getToken();
      setToken(token);
    }
    getTokenId();
  }, []);

  const handleImagePickRoom = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      // Xử lý khi người dùng hủy chọn ảnh
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else {
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImgCategories([...imgCategories, ...selectedImages]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImgCategories = [...imgCategories];
    updatedImgCategories.splice(indexToRemove, 1);
    setImgCategories(updatedImgCategories);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.imageItem}>
      <Image source={{ uri: item }} style={styles.selectedImage} />
      <TouchableOpacity
        onPress={() => handleRemoveImage(index)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddRoom = async () => {
    if (token) {
      const response = await providerAddRoom(
        token,
        imgCategories,
        categoryName,
        person,
        area,
        description,
        roomNumbers,
        bedType
      );
      
      if (response.status === 200) {  
        navigation.navigate("CreateroomScreen");
      }else{
        console.log('Lưu không thành công!');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        style={{ top: 40 }}
        data={imgCategories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />

      <TouchableOpacity onPress={handleImagePickRoom}>
        <Image source={require('../assets/add-img-icon.png')} style={styles.addImageIcon} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Tên phòng"
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Số người"
        value={person}
        onChangeText={(text) => setPerson(text)}
        keyboardType="numeric"
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
        value={bedType}
        onChangeText={(text) => setBedType(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Số phòng"
        value={roomNumbers}
        onChangeText={(text) => setRoomNumbers(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả thêm"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá tiền (VND)"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={handleAddRoom}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Thêm phòng</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()} // Điều hướng trở lại màn hình trước
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Trở lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  imageItem: {
    marginRight: 10,
    marginBottom: 10,
    position: 'relative',
  },
  selectedImage: {
    width: 100,
    height: 100,
  },
  removeButton: {
    backgroundColor: 'red',
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  removeButtonText: {
    color: 'white',
  },
  addImageIcon: {
    width: 100,
    height: 100,
    bottom: 10,
    left: 130,
    top: 50,
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addButton: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#DE5223',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  backButton: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#DE5223',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});
