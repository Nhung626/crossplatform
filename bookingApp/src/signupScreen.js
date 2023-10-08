import React, { useState } from 'react';
import { View,ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignupScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }
  
    const userData = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch('http://192.168.1.8:3306/api/v1/provider/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      // const data = await response.json();
      if (response.ok) {
        // Đăng ký thành công
        navigation.navigate('SignupSuccess');
      } else {
        const errorData = await response.json(); // Lấy thông tin lỗi từ phản hồi
        alert(`Đăng ký thất bại: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu đăng ký:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };
  
  return (
    <ImageBackground
      source={require('../assets/nen4.png')}
      style={styles.container}
    >
    <ScrollView>
      <View style={styles.header}>
      <Image style={[styles.logo]}
    source={require('../assets/reservar-01.png')} />  
        <Text style={styles.headerText}>Đăng ký</Text>
      </View>

      <Text style={styles.label}>Nhập tài khoản</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email của bạn"
      />

      <Text style={styles.label}>Nhập mật khẩu</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Mật khẩu của bạn"
        secureTextEntry={true}
      />

      <Text style={styles.label}>Nhập lại mật khẩu</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        placeholder="Nhập lại mật khẩu"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button1}>
        <Button onPress={handleSignup}
           title="Đăng ký"
           color='black'
        />
      </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo:{
    width:200,
    height:200,
    marginTop:20,
    
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: 'black', 
    borderRadius:10,
  },
  button1: {
    width: '100%',
    height: 40,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    
  },
});

export default SignupScreen;
