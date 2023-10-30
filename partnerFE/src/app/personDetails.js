import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity,ImageBackground } from 'react-native';
import { useRoute,useNavigation } from "@react-navigation/native";
import { getProviderApi, } from '../services/useAPI';
import { getImgProviderUrl } from "../services/baseUrl";

export default function PersonDetail() {
  const route = useRoute();
  const { token } = route.params ?? {};

  const navigation = useNavigation();

  const [providerData, setProviderData] = useState(null);
  const [imgProviders, setImgProviders] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const handleEditInformation = () => {
    navigation.navigate('ThongtinKS', { token });
  };
  const handleBack = () => {
    navigation.goBack();
  };

  const storeProviderData = async (data) => {
    try {
      await AsyncStorage.setItem('providerData', JSON.stringify(data));
    } catch (error) {
      console.error('Error storing provider data:', error);
    }
  };

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


  function renderItem({ item }) {
    const providerImg = item.imgIdProviders;
    const firstImageId = providerImg && providerImg.length > 0 ? providerImg[0] : null;
    const imageSource = firstImageId
      ? { uri: getImgProviderUrl  }
      : require('../assets/add-img-icon.png');
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

  return (
     <ImageBackground source={require('../assets/theme.png')} style={{ flex:1, width: '100%', height: '100%' }}>
      <View style={[styles.container,{flex: 1}]}>
        <Image
          style={{ width: 150, height: 150, borderRadius: 80,top:60,marginBottom:20,marginTop:20}}
          source={providerData?.imgIdProviders
          ? { uri: `${getImgProviderUrl}?imageId=${providerData?.imgIdProviders[0]}` }
          : require('../assets/add-img-icon.png') }
        />
    
        <View style={styles.thongtin}>
          
            <Text style={styles.providerName}>Tên: {providerData && providerData.providerName}</Text>
            <Text style={styles.providerPhone}>Số điện thoại: {providerData && providerData.providerPhone}</Text>
            <Text style={styles.address}>Địa chỉ: {providerData && providerData.address}</Text>
            <Text style={styles.description}>Thông tin thêm: {providerData && providerData.description}</Text>
          
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.suatt} onPress={() => handleEditInformation(token)}>
            <Text style={{color:'#190482',paddingHorizontal:10, paddingVertical:10,fontWeight:'bold'}}>Sửa thông tin </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.suatt} onPress={handleBack}>
            <Text style={{color:'#190482',paddingHorizontal:10, paddingVertical:10,fontWeight:'bold',textAlign:'center'}}>Trở lại</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginBottom: 10,
      
    },
    thongtin: {
      width: '80%',
      height: '30%',
      padding: 10,
      borderColor: '#190482',
      marginTop: 60,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
    },
    
    providerName: {
      borderBottomWidth: 1,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 10,
      borderColor: '#190482', // Màu của đường gạch chân
    },
    providerPhone: {
      borderBottomWidth: 1,
      fontSize: 18,
      marginBottom: 20,
      borderColor: '#190482', // Màu của đường gạch chân
    },
    address: {
      fontSize: 18,
      marginBottom: 20,
      borderColor: '#190482', // Màu của đường gạch chân
    },
    description: {
      fontSize: 16,
      borderColor: '#190482', // Màu của đường gạch chân
    },
    buttonRow: {  
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    suatt: {
      borderWidth: 1,
      borderRadius: 10,
      marginTop: 40,
      width: 115,
      height: 40,
      backgroundColor: '#98E4FF',
      alignItem:'center'
    },
  };
  
