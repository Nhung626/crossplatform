import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {

  const navigation = useNavigation();

  const handleStartScreen = () => {
    // Chuyển hướng đến màn hình 'StartScreen'
    navigation.navigate('StartScreen');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Đăng nhập để dễ dàng truy cập thông tin chuyến đi
      </Text>
      <View style={styles.button}>
        <TouchableOpacity style={styles.buttonGG}>
          <View style={styles.buttonContent}>
            <Icon name="google" size={20} color="#black" />
            <Text style={styles.textGG}>Tiếp tục bằng tài khoản Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonFB}>
          <View style={styles.buttonContent}>
            <Icon name="facebook" size={20} color="black" />
            <Text style={styles.textFB}>Tiếp tục bằng tài khoản Facebook</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleStartScreen}
        style={styles.buttonEmail}>
          <Text style={styles.textEmail}>Tiếp tục với Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Thêm màu nền cho container
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: -350,
    marginBottom:40,
  },
  buttonGG: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10, // Dịch lên
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonFB: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10, // Dịch lên
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonEmail: {
    marginTop: 10, // Dịch lên
    backgroundColor: '#0057F7',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textGG: {
    textAlign: 'center',
    color: '#040008',
    marginLeft: 10,
  },
  textFB: {
    textAlign: 'center',
    color: '#040008',
    marginLeft: 10,
  },
  textEmail: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default LoginScreen;
