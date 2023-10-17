import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import config from '../utils/api-config.json';
import Icon from 'react-native-vector-icons/FontAwesome';

import { signUpApi } from "../services/useAPI";

// const apiUrl = `${config.apiHost}:${config.apiPort}`;
const CreateAccount = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleCreateroomScreen = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập tài khoản và mật khẩu.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await signUpApi(user);
      if (response.status === 200) {
        console.log('Đăng ký thành công')
        navigation.navigate("CreateroomScreen", { user })
      }
    } catch (error) {
      console.log(user)
      console.error("Lỗi khi gửi yêu cầu lưu thông tin:", error);
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
      <View style={styles.inputBox}>
        <Icon name="envelope" size={20} color="#CFD4E2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      
      <Text style={styles.label}>Mật khẩu</Text>
      <View style={styles.inputBox}>
        <Icon name="lock" size={25} color="#CFD4E2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          fontSize="18"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <Text style={styles.label}>Nhập lại mật khẩu</Text>
      <View style={styles.inputBox}>
        <Icon name="lock" size={25} color="#CFD4E2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          fontSize="18"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
      </View>

      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateroomScreen}>
        <Text style={styles.createAccountButtonText}>Đăng ký tài khoản</Text>
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
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom:10,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#235D9F',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    width:'95%',
  },
  input: {
    height: 50,
  },
  icon: {
    marginRight: 10,
    marginLeft:10,
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
