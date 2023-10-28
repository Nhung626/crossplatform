import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView,TouchableOpacity,Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getImgRoomUrl } from "../services/baseUrl";
import { getBooked,getCheckin,getCheckout,getCancel,getReview,postCheckin,postCheckout,postCancel} from '../services/useAPI';

const TopTab = createMaterialTopTabNavigator();

export default function QLDat() {
  const route = useRoute();
  const { token,reservarId } = route.params ?? {};
  const [listData, setListData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  // Lưu trữ danh sách phòng vào AsyncStorage
  const storeListData = async (data) => {
    try {
      await AsyncStorage.setItem('listData', JSON.stringify(data));
    } catch (error) {
      console.error('Error storing list data:', error);
    }
  };

  // Truy xuất danh sách phòng từ AsyncStorage
  const getListData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('listData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setListData(parsedData);
      }
    } catch (error) {
      console.error('Error retrieving list data:', error);
    }
  };

  return (
    <View style={{ flex: 1, top: 50 }}>
      <TopTab.Navigator
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          // style: { backgroundColor: '#fff' },
        }}
      >
        <TopTab.Screen name="Đặt trước">
          {() => <TabScreen1 token={token} />}
        </TopTab.Screen>
        <TopTab.Screen name="Đang sử dụng">
          {() => <TabScreen2 token={token} />}
        </TopTab.Screen>
        <TopTab.Screen name="Đã hoàn thành">
          {() => <TabScreen3 token={token} />}
        </TopTab.Screen>
        <TopTab.Screen name="Bị hủy">
          {() => <TabScreen4 token={token} />}
        </TopTab.Screen>

        <TopTab.Screen name="Đánh giá">
          {() => <TabScreen5 token={token} />}
        </TopTab.Screen>

      </TopTab.Navigator>
    </View>
  );
}


const handleCheckIn = async (reservarId, token) => {
  console.log('222', reservarId,token)
  try {
    const response = await postCheckin(reservarId, token);
    if (response) {
        // Kiểm tra response ở đây nếu cần
        console.log("Checkin response:", response);
        Alert.alert('Checkin thành công!');
    }
} catch (error) {
    console.error('API error:', error);
    Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
}

};

const handleCheckOut = async (reservarId, token) => {
    
  try {
    const response = await postCheckout(reservarId, token);
    if (response) {
        // Kiểm tra response ở đây nếu cần
        console.log("Checkout response:", response);
        Alert.alert('Checkout thành công!');
    }
} catch (error) {
    console.error('API error:', error);
    Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
}

};

const handleCancel = async (reservarId, token ) => {
  try {
    const response = await postCancel(reservarId, token);
    if (response) {
        // Kiểm tra response ở đây nếu cần
        console.log("Cancel response:", response);
        Alert.alert('Hủy thành công!');
    }
} catch (error) {
    console.error('API error:', error);
    Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
}

};

function TabScreen1({ token }) {
  const [listData, setListData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

    

  useEffect(() => {
    async function fetchListData() {
      try {
        const response = await getBooked(token);
        // console.log('2222',response.data)
        if (response && response.status === 200) {
          // Xử lý dữ liệu ở đây
          setListData(response.data);
        } else {
          console.error('Error fetching list booked data:', response ? response.data : 'Response is null');
          // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
        }
      } catch (error) {
        console.error('API error:', error);
        // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
      } finally {
        setIsFetching(false);
      }
    }

    // Add isFetching as a dependency to trigger data fetching
    if (isFetching) {
      fetchListData();
    }
  }, [isFetching, token]);

  // Hàm này được sử dụng để hiển thị danh sách dữ liệu
  const renderList = (data) => {
    return data.map((item, index) => {
      const bookImg = item.imgCategory;
      
      const imageSource = bookImg
      ? { uri: `${getImgRoomUrl}?imageId=${bookImg}` }
      : require('../assets/add-img-icon.png');
      

      return (
        <View key={index}>
          <View style={styles.roomItem}>
            <View style={styles.roomImage}>
              <Image
                style={{ width: 150, height: 200, borderRadius: 30 }}
                source={imageSource}
              />
            </View>
            <View style={styles.thongtin}>
              <Text style={styles.name}>{item.customerName}</Text>
              <Text style={styles.detail}>Sdt:{item.customerPhone}</Text>
              <Text style={styles.detail}>Số phòng: {item.rooms}</Text>
              <Text style={styles.detail}>Giá: {item.total}(VNĐ)</Text>
              <Text style={styles.detail}>Bắt đầu: {item.startDate} Kết thúc:{item.endDate}</Text>

              {item.statePayment === "Success" && (
              <TouchableOpacity style={styles.check} onPress={() => handleCheckIn(item.reservarId,token)}>
                <Text style={styles.textCheck}>Check In</Text>
              </TouchableOpacity>
            )}

              {item.statePayment != "Success" && (
                <View>
                  <Text style={styles.text}>Chưa thanh toán</Text>
                  <TouchableOpacity style={styles.check} onPress={() => handleCancel(item.reservarId,token)}>
                    <Text style={styles.textCheck}>Hủy</Text>
                  </TouchableOpacity>
                </View>
              )}

            </View>
          </View>
        </View>
      );
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>        
      <ScrollView style={{ flex: 1}}>
      {renderList(listData)}
      </ScrollView>
    </View>
  );
}

function TabScreen2({ token }) {
  const [listData, setListData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchListData() {
      try {
        const response = await getCheckin(token);
        if (response && response.status === 200) {
          // Xử lý dữ liệu ở đây
          setListData(response.data);
        } else {
          console.error('Error fetching list booked data:', response ? response.data : 'Response is null');
          // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
        }
      } catch (error) {
        console.error('API error:', error);
        // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
      } finally {
        setIsFetching(false);
      }
    }

    // Add isFetching as a dependency to trigger data fetching
    if (isFetching) {
      fetchListData();
    }
  }, [isFetching, token]);

  

  // Hàm này được sử dụng để hiển thị danh sách dữ liệu
  const renderList = (data) => {
    return data.map((item, index) => {
      const bookImg = item.imgCategory;
      
      const imageSource = bookImg
      ? { uri: `${getImgRoomUrl}?imageId=${bookImg}` }
      : require('../assets/add-img-icon.png');
          
      return (
        <View key={index}>
          <View style={styles.roomItem}>
            <View style={styles.roomImage}>
              <Image
                style={{ width: 150, height: 200, borderRadius: 30 }}
                source={imageSource}
              />
            </View>
            <View style={styles.thongtin}>
              <Text style={styles.name}>{item.customerName}</Text>
              <Text style={styles.detail}>Sdt:{item.customerPhone}</Text>
              <Text style={styles.detail}>Số phòng: {item.rooms}</Text>
              <Text style={styles.detail}>Giá: {item.total}(VNĐ)</Text>
            
              {item.statePayment === "Success" && (
                <Text style={styles.text}>Đã thanh toán</Text>             
            )}

                  <TouchableOpacity style={styles.check} onPress={() => handleCheckOut(item.reservarId,token)}>
                    <Text style={styles.textCheck}>Check Out</Text>
                  </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>        
      <ScrollView style={{ flex: 1}}>
      {renderList(listData)}
      </ScrollView>
    </View>
  );
}

function TabScreen3({ token }) {
  const [listData, setListData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchListData() {
      try {
        const response = await getCheckout(token);
        if (response && response.status === 200) {
          // Xử lý dữ liệu ở đây
          setListData(response.data);
          // storeListData(response.data); // Lưu dữ liệu vào AsyncStorage
        } else {
          console.error('Error fetching list booked data:', response ? response.data : 'Response is null');
          // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
        }
      } catch (error) {
        console.error('API error:', error);
        // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
      } finally {
        setIsFetching(false);
      }
    }

    // Add isFetching as a dependency to trigger data fetching
    if (isFetching) {
      fetchListData();
    }
  }, [isFetching, token]);

  // Hàm này được sử dụng để hiển thị danh sách dữ liệu
  const renderList = (data) => {
    return data.map((item, index) => {
      const bookImg = item.imgCategory;
      
      const imageSource = bookImg
      ? { uri: `${getImgRoomUrl}?imageId=${bookImg}` }
      : require('../assets/add-img-icon.png');
      

      

      return (
        <View key={index}>
          <View style={styles.roomItem}>
            <View style={styles.roomImage}>
              <Image
                style={{ width: 150, height: 200, borderRadius: 30 }}
                source={imageSource}
              />
            </View>
            <View style={styles.thongtin}>
              <Text style={styles.name}>{item.customerName}</Text>
              <Text style={styles.detail}>Sdt:{item.customerPhone}</Text>
              <Text style={styles.detail}>Số phòng: {item.rooms}</Text>
              <Text style={styles.detail}>Giá: {item.total}(VNĐ)</Text>
            
             
            </View>
          </View>
        </View>
      );
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>        
      <ScrollView style={{ flex: 1}}>
      {renderList(listData)}
      </ScrollView>
    </View>
  );
}
  


function TabScreen4({token}) {
  const [listData, setListData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchListData() {
      try {
        const response = await getCancel(token);
        if (response && response.status === 200) {
          // Xử lý dữ liệu ở đây
          setListData(response.data);
          // storeListData(response.data); // Lưu dữ liệu vào AsyncStorage
        } else {
          console.error('Error fetching list cancel data:', response ? response.data : 'Response is null');
          // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
        }
      } catch (error) {
        console.error('API error:', error);
        // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
      } finally {
        setIsFetching(false);
      }
    }

    // Add isFetching as a dependency to trigger data fetching
    if (isFetching) {
      fetchListData();
    }
  }, [isFetching, token]);

  // Hàm này được sử dụng để hiển thị danh sách dữ liệu
  const renderList = (data) => {
    return data.map((item, index) => {
      const bookImg = item.imgCategory;
      
      const imageSource = bookImg
      ? { uri: `${getImgRoomUrl}?imageId=${bookImg}` }
      : require('../assets/add-img-icon.png');
      

      return (
        <View key={index}>
          <View style={styles.roomItem}>
            <View style={styles.roomImage}>
              <Image
                style={{ width: 150, height: 200, borderRadius: 30 }}
                source={imageSource}
              />
            </View>
            <View style={styles.thongtin}>
              <Text style={styles.name}>{item.customerName}</Text>
              <Text style={styles.detail}>Sdt:{item.customerPhone}</Text>
              <Text style={styles.detail}>Số phòng: {item.rooms}</Text>
              <Text style={styles.detail}>Giá: {item.total}(VNĐ)</Text>
            </View>
          </View>
        </View>
      );
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>        
      <ScrollView style={{ flex: 1}}>
      {renderList(listData)}
      </ScrollView>
    </View>
  );
}

function TabScreen5({token}) {
  // const [listData, setListData] = useState([]);
  // const [isFetching, setIsFetching] = useState(true);

  // useEffect(() => {
  //   async function fetchListData() {
  //     try {
  //       const response = await getReview(token);
  //       if (response && response.status === 200) {
  //         // Xử lý dữ liệu ở đây
  //         setListData(response.data);
  //         // storeListData(response.data); // Lưu dữ liệu vào AsyncStorage
  //       } else {
  //         console.error('Error fetching list booked data:', response ? response.data : 'Response is null');
  //         // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
  //       }
  //     } catch (error) {
  //       console.error('API error:', error);
  //       // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   }

  //   // Add isFetching as a dependency to trigger data fetching
  //   if (isFetching) {
  //     fetchListData();
  //   }
  // }, [isFetching, token]);

  // // Hàm này được sử dụng để hiển thị danh sách dữ liệu
  // const renderList = (data) => {
  //   return data.map((item, index) => {
  //     const bookImg = item.imgCategory;
  //     // const ImageId = bookImg && bookImg.length > 0 ? bookImg[0] : null;
      
  //     const imageSource = bookImg
  //     ? { uri: `${getImgRoomUrl}?imageId=${bookImg}` }
  //     : require('../assets/add-img-icon.png');
      

  //     //Điều kiện checkin
  //     // let paymentStatus;
  //     // if (item.statePayment === "Success") {
  //     //   paymentStatus = "Đã thanh toán";
  //     // }

  //     return (
  //       <View key={index}>
  //         <View style={styles.roomItem}>
  //           <View style={styles.roomImage}>
  //             <Image
  //               style={{ width: 150, height: 200, borderRadius: 30 }}
  //               source={imageSource}
  //             />
  //           </View>
  //           <View style={styles.thongtin}>
  //             {/* <Text style={styles.name}>Tên khách sạn: {item.providerName}</Text> */}
  //             <Text style={styles.name}>{item.customerName}</Text>
  //             {/* <Text style={styles.detail}>CCCD: {item.customerCode}</Text> */}
  //             <Text style={styles.detail}>Sdt:{item.customerPhone}</Text>
  //             <Text style={styles.detail}>Số phòng: {item.rooms}</Text>
  //             {/* <Text style={styles.detail}>Thời gian đặt: {item.reservarDate}</Text> */}
  //             <Text style={styles.detail}>Giá: {item.total}(VNĐ)</Text>
  //             {/* <Text style={styles.detail}>Trạng thái đặt phòng: {item.stateReservar}</Text> */}
            
  //             {/* {item.statePayment === "Success" && (
  //               <Text style={styles.text}>Đã thanh toán</Text>             
  //           )}

  //             <TouchableOpacity style={styles.check}>
  //                 <Text style={styles.textCheck}>Check Out</Text>
  //             </TouchableOpacity>  */}
  //           </View>
  //         </View>
  //       </View>
  //     );
  //   });
  // }

  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>        
  //     <ScrollView style={{ flex: 1}}>
  //     {renderList(listData)}
  //     </ScrollView>
  //   </View>
  // );
}

const styles = {
  roomItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop:10,
    marginBottom: 20,
    width: 380,
    height: 300,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển của bóng
    shadowOpacity: 1,
    shadowColor:'#4F4A45',
    borderWidth:1,
    borderColor: 'transparent',
    
  },
  roomImage: {
    flex: 1,
    right: 15,
  },
  thongtin: {
    flex: 2,
    marginLeft: 160,
    bottom: 80,
    borderLeftWidth: 1,
    padding: 10
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
    marginTop:10,
  },
  check:{
    
    borderRadius:10,
    marginTop:15,
    backgroundColor:'#a0e2ec',
    width:'50%',
    height:30
  },
  textCheck:{
    textAlign:'center',
    paddingTop:5,
    color:'#136EA7',
    fontWeight:'bold',
    
  },
  text:{   
      textAlign:'center',
      paddingTop:5,
      color:'#136EA7',
      fontWeight:'bold',
      right:20,
      
  }
};
