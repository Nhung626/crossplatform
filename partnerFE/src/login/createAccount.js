import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const CreateAccount = () => {

const navigation = useNavigation();
const handleCreatenameScreen =() =>{
    navigation.navigate('CreatenameScreen');
};
const handleLoginScreen = () => {
    // Chuyển hướng đến màn hình 'StartScreen'
    navigation.navigate('LoginScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tạo tài khoản mới</Text>
      </View>
      <Text style={styles.text}>
        Đăng chỗ nghỉ của bạn và để chúng tôi giúp bạn kết nối với hàng triệu khách hàng!
      </Text>
      <Text style={styles.label}>Email</Text>
      <Input
        leftIcon={
          <Icon
            name="email"
            size={20}
            color="#CFD4E2"
            containerStyle={styles.icon}
          />
        }
        inputContainerStyle={styles.inputContainer}
        placeholder="Nhập địa chỉ email"
        inputStyle={styles.input}
      />
      <TouchableOpacity style={styles.createAccountButton}>
        <Text onPress={handleCreatenameScreen}
        style={styles.createAccountButtonText}>
        Tạo tài khoản</Text>
      </TouchableOpacity>

        <View style={styles.login}>
            
              <View style={styles.cmt}>
          <Text>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={handleLoginScreen} style={styles.link}>
            <Text style={styles.textlink}>Đăng nhập ở đây</Text>
          </TouchableOpacity>
        </View>

        </View>

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
    fontSize: 25,
    fontWeight: 'antialiased',
    marginBottom: 30,
  },
  text: {
    color: '#6D7376',
    fontWeight: 'antialiased',
    fontSize:16,
  },
  label: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: 'antialiased',
  },
  inputContainer: {
    width:'100%',
    height: 50,
    marginLeft:-7,
    marginBottom: 5,
    marginTop: 10,
    borderWidth: 1,
    borderRadius:10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  input: {
    height: 40,
    color: '#CFD4E2',
    
  },
  icon: {
    marginRight: 10,
  },
  createAccountButton: {
    marginTop: 5,
    backgroundColor: '#DE5223',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    
  },
  createAccountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  login:{
    fontWeight: 'antialiased',
    marginLeft:10,
    color:'#CFD4E2',
  },
  link: {
    color: '#53BCF8',
    marginLeft: 5,
  },
  textlink:{
   color: '#235D9F', 
   fontWeight: 'bold'
  },
  cmt:{
    marginTop:30,
    flexDirection:'row',
    fontWeight: 'antialiased',
  },
});

export default CreateAccount;
