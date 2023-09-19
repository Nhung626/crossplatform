import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function SignupSuccess({ navigation }) {
  const handleInformationScreen = () => {
    // Xử lý đăng ký tài khoản
    // Sau khi đăng ký thành công, bạn có thể điều hướng đến màn hình thành công hoặc màn hình chính của ứng dụng
    // Ví dụ: Điều hướng đến màn hình "InformationScreen"
    navigation.navigate('InformationScreen');
  };
  
  return (
    <ImageBackground
      source={require('../assets/success.png')}
      style={styles.container}
    >
    <View style={styles.container}>
      <Icon name="checkmark-done-outline" size={100} color="#00a300" />

      <Text style={styles.successText}>Đăng ký thành công</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleInformationScreen}
      >
        <Text style={styles.buttonText}>Điền thông tin cá nhân</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#00a300',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignupSuccess;
