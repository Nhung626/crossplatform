import React, { useState,useEffect} from 'react';
import { FlatList, Alert,Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {  useNavigation } from "@react-navigation/native";
import { providerUpdateApi,getToken, } from "../services/useAPI";

export default function ThongtinKS({ route }) {
  const navigation = useNavigation();

  const [token, setToken] = useState('');
  const [imgProviders, setImgProviders] = useState([]);
  const [providerName, setProviderName] = useState("");
  const [providerPhone, setProviderPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    const getTokenId = async () => {
      const token = await getToken();
      setToken(token);
    }
    getTokenId();
  }, []);

  const handleImagePickHotel = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      // Xử lý khi người dùng hủy chọn ảnh
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else {
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImgProviders([...imgProviders, ...selectedImages]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImgProviders = [...imgProviders];
    updatedImgProviders.splice(indexToRemove, 1);
    setImgProviders(updatedImgProviders);
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

  const handleSaveThongtinKS = async () => {
    if (token) {
      try {
        const response = await providerUpdateApi(
          token,
          imgProviders,
          providerName,
          providerPhone,
          address,
          description 
        );

        if (response && response.status === 200) { // Kiểm tra response không null trước khi truy cập status
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
    <ImageBackground
      source={require('../assets/theme.png')}
      style={{ flex: 1 }}
    >
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', color: '#687EFF', fontSize: 24, marginTop: 50 }}>
          Thông tin khách sạn
        </Text>

        <FlatList
        style={{ top: 10 }}
        data={imgProviders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />

        <TouchableOpacity onPress={handleImagePickHotel}>
          <Image source={require('../assets/add-img-icon.png')} style={{ width: 100, height: 100, bottom: 40 }} />
        </TouchableOpacity>
        <View style={{ borderWidth: 1, borderColor: '#4477CE', borderRadius: 10, backgroundColor: '#fff', bottom: 40, width: '85%', height: '45%' }}>
          <TextInput
            style={styles.input}
            placeholder="Tên khách sạn"
            onChangeText={(text) => setProviderName(text)}
            value={providerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Hotline"
            value={providerPhone}
            onChangeText={(text) => setProviderPhone(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Vị trí"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mô tả"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <TouchableOpacity style={styles.buttonKS} onPress={handleSaveThongtinKS}>
          <Text style={styles.buttonKSText}>Lưu thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.buttonKS}
      >
        <Text style={styles.Text}>Trở lại</Text>
      </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = {
  input: {
    backgroundColor: '#8BE8E5',
    borderRadius: 20,
    width: '80%',
    height: 50,
    fontSize: 16,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 30,
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
  
  imageContainer: {
    marginRight: 10,
    marginTop: -50,
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
  },
  buttonKS: {
    marginTop: 30,
    bottom: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    height: 40,
    width: 100,
    backgroundColor: '#98E4FF',
  },
  buttonKSText: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    color: '#190482',
    alignItems:'center'
  },
  Text: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    fontWeight: 'bold',
    color: '#190482',
   
  },
};
