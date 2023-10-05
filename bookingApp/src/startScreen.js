import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StartScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };

  const handleRegister = () => {
    navigation.navigate('SignupScreen');
  };

  const handleLogin = async () => {
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://172.20.10.10:8080/api/v1/provider/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Lỗi khi nhận phản hồi từ API');
      }

      // const data = await response.json();

      if (response.ok) {
        // Đăng nhập thành công
        // navigation.navigate('MainScreen');
        console.log("đăng nhập thành công")
      } else {
        alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu đăng nhập:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/signup.png')}
      style={styles.container}
    >
      <ScrollView style={styles.view1}>
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Chào mừng bạn</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.inputBoxemail}>
              <Text style={styles.labelemail}>Tài khoản</Text>
              <TextInput
                style={styles.inputemail}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Nhập tài khoản"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputBoxpass}>
              <Text style={styles.labelpass}>Mật khẩu</Text>
              <TextInput
                style={styles.inputpass}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Nhập mật khẩu"
                secureTextEntry
              />
            </View>
            <View style={styles.forget}>
              <TouchableOpacity onPress={handleForgetPassword}>
                <Text style={styles.cmt}>
                  <Text>Bạn quên mật khẩu?</Text>
                  <Text> | </Text>
                  <Text style={styles.link}>Lấy lại mật khẩu</Text>
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.forget}>
          <TouchableOpacity onPress={handleForgetPassword}></TouchableOpacity>
        </View>
        <View style={styles.register}>
          <TouchableOpacity onPress={handleRegister}>
            <Text>
              Bạn không có tài khoản?
              <Text style={styles.link}> Đăng ký</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecae7d',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
  view1: {
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginTop: 50,
  },
  content: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBoxemail: {
    marginVertical: 10,
    width: 310,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderColor: 'transparent',
  },
  inputBoxpass: {
    marginVertical: 10,
    width: 310,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderColor: 'transparent',
  },
  labelemail: {
    marginTop: 120,
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
  inputemail: {
    width: '100%',
    height: 50,
    fontSize: 16,
    color: '#fff',
  },
  labelpass: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
  inputpass: {
    width: '100%',
    height: 50,
    fontSize: 16,
    color: '#fff',
  },
  forget: {
    marginTop: 210,
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#fff',
  },
  cmt: {
    marginTop: -170,
  },
  button: {
    marginTop: -140,
    width: '100%',
    height: 40,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: -120,
  },
  register: {
    marginTop: -60,
    alignItems: 'center',
    fontSize: 14,
    marginBottom: 200,
  },
});

export default StartScreen;
