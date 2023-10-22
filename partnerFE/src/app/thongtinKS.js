import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from "@react-navigation/native";
import { providerUpdateApi } from "../services/useAPI";

export default function ThongtinKS() {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params ?? {};

  const [imgProviders, setImage] = useState([]);
  const [providerName, setProviderName] = useState("");
  const [providerPhone, setProviderPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleImagePickHotel = async () => {
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
      const selectedImage = result.assets.map((asset) => asset.uri);
      setImage([...imgProviders, ...selectedImage]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImage = [...imgProviders];
    updatedImage.splice(indexToRemove, 1);
    setImage(updatedImage);
  };

  const handleSaveThongtinKS = async () => {
    const formData = new FormData();

    if (imgProviders.length > 0) {
      imgProviders.forEach((imgKS, index) => {
        formData.append(`imgProviders`, {
          uri: imgKS,
          type: 'image/png',
          name: `image-${index}.png`,
        });
      });
    }

    formData.append('providerName', providerName);
    formData.append('providerPhone', providerPhone);
    formData.append('address', address);
    formData.append('description', description);

    try {
      const response = await providerUpdateApi(formData, token);

      if (response.status === 200) {
        console.log('Thông tin đã được lưu thành công.');
        navigation.goBack();
      } else {
        console.log(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error('Lỗi khi gửi yêu cầu lưu thông tin:', error.response.data);
      } else if (error.request) {
        console.error('Không có phản hồi từ máy chủ');
      } else {
        console.error('Lỗi trong quá trình thiết lập yêu cầu:', error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../assets/theme.png')}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', color: '#687EFF', fontSize: 24, marginTop: 80 }}>
          Thông tin khách sạn
        </Text>
        <ScrollView horizontal={true} contentContainerStyle={{ alignItems: 'center' }}>
          {imgProviders.map((imgProvider, index) => (
            <View key={index} style={styles.imageContainer}>
              <ImageBackground source={{ uri: imgProvider }} style={styles.imagePreview}>
                <TouchableOpacity onPress={() => handleRemoveImage(index)}>
                  <Iconicons name="close" size={20} color="red" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
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
    borderColor: '#4477CE',
    height: 40,
    width: 100,
    backgroundColor: '#8BE8E5',
  },
  buttonKSText: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    color: '#4477CE',
  },
};
