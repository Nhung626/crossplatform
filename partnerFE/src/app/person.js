import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Iconicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from "@react-navigation/native";

import { getProviderApi } from '../services/useAPI';
import { getImgProviderUrl} from "../services/baseUrl";
import { Ionicons } from '@expo/vector-icons';

export default function Person() {
  const route = useRoute();
  const { token } = route.params ?? {};

  const navigation = useNavigation();
  const [providerData, setProviderData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  //Lưu provider vào AsyncStorage
  const storeProviderData = async (data) => {
    try {
      await AsyncStorage.setItem('providerData', JSON.stringify(data));
    } catch (error) {
      console.error('Error storing provider data:', error);
    }
  };
  // console.log('Provider nè:',providerData)

// truy xuất provider từ AsyncStorage
  const getProviderData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('providerData');

      //storedData
      // console.log('2',storedData)

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setProviderData(parsedData);
      }
    } catch (error) {
      console.error('Error retrieving provider data:', error);
    }
    
  };
 

useEffect(() => {
  async function fetchProviderData() {
    try {
      
      const response = await getProviderApi(token);
      if (response && response.status === 200) {
        setProviderData(response.data);
      } else {
        console.error('Error fetching provider data:', response ? response.data : 'Response is null');
      }
    } catch (error) {
      console.error('API error:', error);
    } finally {
      setIsFetching(false); // Đặt isFetching thành false khi cuộc gọi API đã hoàn thành
    }
  }


  if (isFetching) {
    fetchProviderData();
  }
}, [isFetching]);

  
  //Fetching
  // console.log('Fetching nè:',isFetching)

  function renderItem({ item }) {
    const providerImg = item.imgIdProviders;
    const firstImageId = providerImg && providerImg.length > 0 ? providerImg[0] : null;
    const imageSource = firstImageId
      ? { uri: getImgProviderUrl + '/' + firstImageId }
      : require('../assets/add-img-icon.png');
    // console.log('item',item)
    return (
      <View>
        <View style={styles.providerItem}>
          <Image
            style={{ width: 150, height: 200, borderRadius: 30 }}
            source={imageSource}
          />
          <Text style={styles.providerName}>Tên: {item.providerName}</Text>
        </View>
      </View>
    );
  }

  const handleManageAccount = () => {
    navigation.navigate('PersonDetail', { token });
  };

  const handleDanhGia =() =>{

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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#29b4ca',alignItems:'center', justifyContent:'center' }}>
          <Image
              style={{ width: 150, height: 150, borderRadius: 80,top:40}}
              source={providerData?.imgIdProviders
                ? { uri: `${getImgProviderUrl}?imageId=${providerData?.imgIdProviders[0]}` }
                : require('../assets/add-img-icon.png') }
            />
        <Text style={{fontSize:20,textAlign: 'center',marginTop:50,}}>Xin chào, {providerData.providerName}</Text>

        <View style={{flexDirection: 'row'}}> 
        <Text style={{ fontSize: 15, fontWeight: 'bold',textAlign: 'center',marginTop:5 }}>Trung bình đánh giá: {providerData.star}</Text>
        <Ionicons style={{marginLeft:2,top:4}} name="star-outline" size={15}/>
        </View>
      </View>

    <ImageBackground source={require('../assets/theme.png')} style={{ flex: 2 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <View style={styles.buttonperson}>
          <TouchableOpacity style={styles.button} onPress={handleManageAccount}>
            <Icon style={styles.personicon} name="person" size={20} />
            <Text style={styles.text}>Quản lý tài khoản</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button3} onPress={handleDanhGia}>
            <Iconicons style={styles.personicon} name="star-outline" size={30} />
            <Text style={styles.text}>Đánh giá của khách hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2} onPress={handleExitAccount}>
            <Iconicons style={styles.personicon} name="exit-outline" size={30} />
            <Text style={styles.text}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
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
  button3: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 45,
    marginBottom: 20,
  },
  text: {
    flexDirection: 'row',
    marginLeft: 10,
    fontSize: 20,
  },
};
