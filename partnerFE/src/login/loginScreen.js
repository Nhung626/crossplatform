import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleCreateroomScreen = () => {
    navigation.navigate('CreateroomScreen');
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
          // Tùy chỉnh các thuộc tính khác của TextInput ở đây
        />
      </View>

      <View style={styles.inputBox}>
        <Icon name="lock" size={20} color="#235D9F" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
          // Tùy chỉnh các thuộc tính khác của TextInput ở đây
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordLink}>
        <Text style={styles.linkText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={[styles.button,{backgroundColor:'#DE5223'}]}
      onPress = {handleCreateroomScreen}>
        <Text style={{textAlign:'center',color:'#fff',paddingTop:10}}>
        Đăng nhập</Text>
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
  forgotPasswordLink: {
    marginTop: 8,
    marginBottom:20,
  },
  linkText: {
    color: '#8A9DFF',
    textDecorationLine: 'underline',
    fontWeight:'bold',
  },
  button:{
    borderRadius:10,
    borderWidth:1,
    height:40,
  },
});

export default LoginScreen;
