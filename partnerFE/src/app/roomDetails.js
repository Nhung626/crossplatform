import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, ScrollView, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { updateRoom, getToken } from "../services/useAPI";

export default function Themphong({ route }) {
  const { post } = route.params;

  const [categoryId, setCategoryId] = useState(post.categoryId);
  const [imgCategories, setImgCategories] = useState([]);
  const [categoryName, setCategoryName] = useState(post.categoryName);
  const [person, setPerson] = useState(post.person);
  const [area, setArea] = useState(post.area);
  const [description, setDescription] = useState(post.description);
  const [price, setPrice] = useState(post.price);
  const [roomNumbers, setRoomNumbers] = useState(post.roomNumbers);
  const [bedType, setBedType] = useState(post.bedType);

  const [token, setToken] = useState('');
  // console.log('222',post.description)
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

    if (result.canceled) {

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

  const handleUpdateRoom = async () => {
    if (token) {
      try {
        const response = await updateRoom(
          token,
          categoryId,
          imgCategories,
          categoryName,
          person,
          area,
          bedType,
          description,
          price,
          roomNumbers  
          
        );
        
  
        if (response && response.status === 200) {
          Alert.alert("Lưu thành công!");
          navigation.navigate("CreateroomScreen");
        } else {
          Alert.alert("Lưu không thành công!");
          console.log('Lưu không thành công!');
        }
      } catch (error) {
        console.log('Error:', error);
        console.log('Lưu không thành công!');
      }
    }
  };
  
  

  return (
    <ScrollView style={styles.container}>
      <Text style={{marginTop:30,fontWeight:'bold',fontSize:20,textAlign:'center',color:'#136EA7'}}>Thông tin phòng</Text>
      <FlatList
        style={{ top: 20 }}
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
        value={person.toString()}
        onChangeText={(text) => setPerson(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Diện tích (m2)"
        value={area.toString()}
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
        value={roomNumbers.toString()}
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
        value={price.toString()}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={handleUpdateRoom}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Lưu thông tin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
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
    top: 10,
    marginBottom: 10,
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
    backgroundColor: '#A0E9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: '#3876BF',
  },
  backButton: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#A0E9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 20,
    color: '#3876BF',
  },
});
