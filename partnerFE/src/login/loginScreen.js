import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; 

import { loginApi } from "../services/useAPI";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [token, setToken] = useState('');
  
  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    console.log(user)

    try {
      const response = await loginApi(user)
      // console.log(response.data.token)
      if (response.status === 200) {
        const token = response.data.token
        // const id = response.data.id;
        navigation.navigate('CreateroomScreen', {token})
        console.log("Đăng nhập thành công", token);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng nhập:", error.response);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Chào mừng quay trở lại</Text>
      </View>

      <Text style={styles.descriptionText}>
        Đăng nhập ngay để quản lý khách sạn, từ kiểm tra đặt chỗ đến quản lý phòng trống!
      </Text>

      <View style={styles.inputBox}>
        <Icon name="envelope" size={20} color="#235D9F" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập tài khoản (email)"
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View style={styles.inputBox}>
        <Icon name="lock" size={20} color="#235D9F" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <TouchableOpacity style={[styles.forgotPasswordLink,{marginTop:20,marginBottom:20}]}>
        <Text style={[styles.linkText,{color:'blue',textDecorationLine: 'underline',fontWeight:'bold'}]}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#DE5223' }]} onPress={handleLogin}>
        <Text style={{ textAlign: 'center', color: '#fff', paddingTop: 10 }}>
          Đăng nhập
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  descriptionText: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#235D9F',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  icon: {
    padding: 10,
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
  },
});

export default LoginScreen;
