import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Iconicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from "@react-navigation/native";

import { getImgProviderApi } from '../services/useAPI';
import { getImgProviderUrl } from "../services/baseUrl";

export default function Person() {
  const route = useRoute();
  const { token } = route.params ?? {};

  const navigation = useNavigation();
  
  const [imgProviders, setImgProviders] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const handleManageAccount = () => {
    navigation.navigate('PersonDetail', { token });
  };

  const handleExitAccount = () => {
    
      Alert.alert(
      'Đăng xuất tài khoản',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            navigation.navigate('LoginScreen'); 
          },
        },
      ]
    );
  };


  // Hàm lấy ảnh đầu tiên từ API
  const fetchFirstImage = async () => {
    try {
      const response = await getImgProviderApi(token);
      if (response.status === 200) {
        const imgData = response.data;
        // Lấy ảnh đầu tiên (nếu có) và cập nhật imgProviders
        if (imgData && imgData.length > 0) {
          setImgProviders([imgData[0]]);
        }
      } else {
        console.error('Error fetching provider images:', response.data);
        // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
      }
    } catch (error) {
      console.error('Promise Error:', error);
      // Xử lý lỗi promise và hiển thị thông báo lỗi cho người dùng
    }    
    setIsFetching(false);
  };

  useEffect(() => {
    // Gọi hàm để lấy ảnh đầu tiên
    if (isFetching) {
      fetchFirstImage();
    }
  }, [isFetching]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B6FFFA' }}>
        {/* Hiển thị ảnh đầu tiên từ imgProviders */}
        {imgProviders.length > 0 && (
          <Image source={{ uri: getImgProviderUrl(imgProviders[0].imageId) }} style={{ width: 100, height: 100 }} />
        )}
      </View>
      <View style={{ flex: 2 }}>
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          {/* Phần dưới */}
          <View style={styles.buttonperson}>
            <TouchableOpacity style={styles.button} onPress={handleManageAccount}>
              <Icon style={styles.personicon} name="person" size={20} />
              <Text style={styles.text}>Quản lý tài khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={handleExitAccount}>
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
