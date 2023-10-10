import * as React from 'react';
import { View, Text, Button,ScrollView,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';
const Stack = createStackNavigator();
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { useState } from 'react';

//Thông tin người dùng
function Thongtin() {
  const [textInputValue, setTextInputValue] = useState('');

  const handleInputChange = (text) => {
    // Xử lý thay đổi giá trị của TextInput ở đây nếu cần
    setTextInputValue(text);
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff' }}>
      <Text style={{color:'blue',fontFamily:'bold',fontSize:24}}>Thông tin</Text>
      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={textInputValue}
        onChangeText={handleInputChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Giới tính"
        value={textInputValue}
        onChangeText={handleInputChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày sinh"
        value={textInputValue}
        onChangeText={handleInputChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={textInputValue}
        onChangeText={handleInputChange}
      />
      <TextInput
        style={styles.input}
        placeholder="CCCD/CMT/Hộ chiếu"
        value={textInputValue}
        onChangeText={handleInputChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={textInputValue}
        onChangeText={handleInputChange}
      />
      
      <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Lưu thông tin</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

//Thêm phòng cho thuê
function Themphong() {
  const navigation = useNavigation();

  const handleThemphong = () => {
    navigation.navigate('Themphong');
  };

  return (
    <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }]}>
      <TouchableOpacity 
      onPress = {handleThemphong}
      style={styles.iconContainer}>
        <Icon name="pluscircleo" size={40} color="#235D9F" />
      </TouchableOpacity>
    </View>
  );
}


//Duyệt yêu cầu khách hàng
// function QLThue() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff' }}>
      
//     </View>
//   );
// }

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

//Thành phần tùy chỉnh menu
function CustomDrawerItem({ label, focused }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <Text style={{ color: focused ? 'blue' : 'black', marginLeft: 10 }}>{label}</Text>
    </View>
  );
}

function CreateroomScreen() {
  return (
    <Drawer.Navigator 
//   useLegacyImplementation không hỗ trợ trên vs code dùng ở máy vì bản củ không hỗ trợ,tải về thì xóa dòng này đi
  drawerContent={(props) => <CustomDrawerContent {...props} />}
>
  <Drawer.Screen
    name="Quản lý phòng"
    component={Themphong}
    options={{ drawerLabel: ({ focused }) => <CustomDrawerItem label="Quản lý phòng" focused={focused} /> }}
  />

  <Drawer.Screen
    name="Thông tin người sử dụng"
    component={Thongtin}
    options={{ drawerLabel: ({ focused }) => <CustomDrawerItem label="Thông tin người sử dụng" focused={focused} /> }}
  />
  
  {/* <Drawer.Screen
    name="Quản lý cho thuê"
    component={QLThue}
    options={{ drawerLabel: ({ focused }) => <CustomDrawerItem label="Quản lý cho thuê" focused={focused} /> }}
  /> */}
</Drawer.Navigator>

    
    
  );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#DE5223',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
    container: {
    flex: 1,
    backgroundColor: '#fff', // Màu nền của màn hình
    // Các kiểu căn chỉnh và định vị nội dung khác ở đây
  },
  iconContainer: {
    position: 'absolute',
    bottom: 30, // Độ cao từ dưới lên
    right: 30, // Khoảng cách từ phải
  },
});
export default CreateroomScreen;