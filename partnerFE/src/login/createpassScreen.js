import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

const CreatepassScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleNextButtonPress = async () => {
    if (!password) {
      alert("Vui lòng nhập mật khẩu.");
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu không trùng khớp');
      return;
    }
    const user = {
      password: password,
    };
    try {
      const response = await fetch('http://172.20.10.10:3000/api/v1/customer/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
      );

      
        if (response.ok) {
          setIsAccountExist(false);
          navigation.navigate('CreateroomScreen');
        } else {
          setIsAccountExist(true);
          console.log("Tài khoản đã tồn tại!");
      
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Bây giờ, hãy thiết lập mật khẩu của bạn!</Text>
      </View>
      <Text style={styles.label}>Mật khẩu</Text>
      <View style={styles.inputBox}>
        <Icon name="lock" size={20} color="#235D9F" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
          <Icon
            name={isPasswordVisible ? 'eye' : 'eye-slash'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nhập lại mật khẩu</Text>
      <View style={styles.inputBox}>
        <Icon name="lock" size={20} color="#235D9F" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
          <Icon
            name={isPasswordVisible ? 'eye' : 'eye-slash'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleNextButtonPress}
        style={[styles.button, { backgroundColor: '#DE5223' }]}
      >
        <Text style={styles.buttontext}> Tiếp theo </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#235D9F',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#DE5223",
    borderWidth: 1,
    borderRadius: 10,
    width: 200,
    height: 50,
    marginLeft: 70,
  },
  buttontext: {
    fontWeight: 'bold',
    paddingTop: 15,
    paddingLeft: 60,
  },
  icon: {
    padding: 10,
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default CreatepassScreen;
