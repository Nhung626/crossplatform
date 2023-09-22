import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground}from'react-native';

const StartScreen = ({ navigation }) => {

  const handleForgetPassword = () => {
  navigation.navigate('ForgetPassword');
  };

  const handleRegister = () => {
    navigation.navigate('SignupScreen');
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
              placeholder="Nhập tài khoản"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputBoxpass}>
            <Text style={styles.labelpass}>Mật khẩu</Text>
            <TextInput
              style={styles.inputpass}
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
          <TouchableOpacity style={styles.button}>
            <Text>Đăng nhập</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <View style={styles.forget}>
        <TouchableOpacity onPress={handleForgetPassword}>
        </TouchableOpacity>
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

  view1:{
      width:'100%',
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
    marginTop:50,
      },
  content: {
    flex: 2, // Chia tỷ lệ 2:1 giữa header và nội dung
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
    marginTop:120,
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
    marginTop: 210, // Điều chỉnh giá trị này để tạo khoảng cách từ "Remember me" đến các phần tử trước
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  link: {
    textDecorationLine: 'underline',    
    color: '#fff',
  },

  cmt:{
    marginTop:-170,
  },
  button: {
    marginTop:-140,
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
    alignItems:'center',
    fontSize: 14,
    marginBottom: 200,
  },
});

export default StartScreen;