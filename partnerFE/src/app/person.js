import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import Iconicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Person() {

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
          type: 'image/png', // Thay đổi loại ảnh nếu cần
          name: `image-${index}.png`,
        });
      });
    }

    formData.append('providerName', providerName);
    formData.append('providerPhone', providerPhone);
    formData.append('address', address);
    formData.append('description', description);

    try {
      // Gửi yêu cầu lưu thông tin đến API hoặc máy chủ cơ sở dữ liệu của bạn
      const response = await providerUpdateApi(formData, token);

      if (response.status === 200) {
        console.log('Thông tin đã được lưu thành công.');
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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B6FFFA' }}>
        {/* Phần trên */}
      </View>
      <View style={{ flex: 2 }}>
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          {/* Phần dưới */}
          <View style={styles.buttonperson}>
            <TouchableOpacity style={styles.button} onPress={handleSaveThongtinKS}>
              <Icon style={styles.personicon} name="person" size={20} />
              <Text style={styles.text}>Quản lý tài khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1}>
              <IconAwesome style={styles.personicon} name="credit-card" size={20} />
              <Text style={styles.text}>Phương thức thanh toán</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}>
              <Iconicons style={styles.personicon} name="exit-outline" size={30} />
              <Text style={styles.text}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = {
  input: {
    // borderColor: 'blue',
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
    width: 100, // Điều chỉnh chiều rộng của ảnh
    height: 100, // Điều chỉnh chiều cao của ảnh
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
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  buttonperson: {
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 80,
    marginBottom: 20,
  },
  button1: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 50,
    marginBottom: 20,
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 108,
    marginBottom: 20,
  },
  text: {
    flexDirection: 'row',
    marginLeft: 10,
    fontSize: 20,
  },
};
