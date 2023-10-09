import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const CreateAccount = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [isAccountExist, setIsAccountExist] = useState(false);

  
  const handleCreatepassScreen = async () => {
    const user ={
        email: email,   
    };

    try {
      const response = await fetch('http://172.20.10.10:3000/api/v1/customer/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      // if (!response.ok) 
      // {
        if (!response.ok) {
          setIsAccountExist(true);
          alert("Tài khoản đã tồn tại!");
          
        } else {
          setIsAccountExist(false);
          navigation.navigate('CreatepassScreen');
        }
        
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
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
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreatepassScreen}>
        <Text style={styles.createAccountButtonText}>Kiểm tra tài khoản</Text>
      </TouchableOpacity>

      <View style={styles.login}>
        <View style={styles.cmt}>
          <Text>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.link}>
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
    fontWeight: 'bold',
    marginBottom: 30,
  },
  text: {
    color: '#6D7376',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    height: 50,
    marginLeft: -7,
    marginBottom: 5,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
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
    borderRadius: 10,
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
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  login: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#CFD4E2',
  },
  link: {
    color: '#53BCF8',
    marginLeft: 5,
  },
  textlink: {
    color: '#235D9F',
    fontWeight: 'bold',
  },
  cmt: {
    marginTop: 30,
    flexDirection: 'row',
    fontWeight: 'bold',
  },
});

export default CreateAccount;
