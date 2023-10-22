import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute,useNavigation } from "@react-navigation/native";
import { getProviderApi, getImgProviderApi } from '../services/useAPI';
// import { getImgProviderUrl } from "../services/baseUrl";

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

  useEffect(() => {
    async function fetchProviderData() {
      try {
        const response = await getProviderApi(token);
        if (response.status === 200) {
          const providerData = response.data;
          setProviderData(providerData);

          // Lấy danh sách các imageId của người cung cấp
          const imageIds = providerData.imgIdProviders || [];

          // Sử dụng Promise.all để lấy thông tin ảnh cho từng imageId
          const imgPromises = imageIds.map(async (imageId) => {
            const imgResponse = await getImgProviderApi(token, imageId);
            return imgResponse.data;
          });

          // Chờ tất cả các promise hoàn thành và lấy dữ liệu ảnh
          const imgData = await Promise.all(imgPromises);

          setImgProviders(imgData);
        } else {
          console.error('Error fetching provider data:', response.data);
          // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
        }
      } catch (error) {
        console.error('API error:', error);
        // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
      } finally {
        setIsFetching(false);
      }
    }

    // Thêm isFetching làm phụ thuộc để kích hoạt lấy dữ liệu
    if (isFetching) {
      fetchProviderData();
    }
  }, [isFetching]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={{ width: 144, height: 256, borderRadius: 30 }}
          source={imgProviders.length > 0 ? { uri: imgProviders[0].url } : require('../assets/add-img-icon.png')}
        />
        <View style={styles.thongtin}>
        <Text style={styles.providerName}>Tên: {providerData && providerData.providerName}</Text>
        <Text style={styles.providerPhone}>Số điện thoại: {providerData && providerData.providerPhone}</Text>
        <Text style={styles.address}>Địa chỉ: {providerData && providerData.address}</Text>
        <Text style={styles.description}>Thông tin thêm: {providerData && providerData.description}</Text>
        </View>

        <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.suatt} onPress={handleEditInformation}>
            <Text style={{color:'#190482',paddingHorizontal:10, paddingVertical:10,fontWeight:'bold'}}>Sửa thông tin </Text>
        </TouchableOpacity>
        
        </View>

      </View>
    </ScrollView>
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
      borderWidth: 1,
      borderRadius: 10,
      width: '80%',
      height: '50%',
      padding: 10, // Thêm khoảng cách đường gạch chân với nội dung bên trong
      borderColor: '#190482', // Màu của đường gạch chân
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
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 40,
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
  
