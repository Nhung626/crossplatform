import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignupScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    navigation.navigate('SignupSuccess');
  };

  return (
    <ImageBackground
      source={require('../assets/signup.png')}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Đăng ký</Text>
      </View>

      <Text style={styles.label}>Nhập email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email của bạn"
      />

      <Text style={styles.label}>Nhập mật khẩu:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Mật khẩu của bạn"
        secureTextEntry={true}
      />

      <Text style={styles.label}>Nhập lại mật khẩu:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        placeholder="Nhập lại mật khẩu"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button1}>
        <Button onPress={handleSignup} title="Đăng ký"/>
      </TouchableOpacity>
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
  color: 'black', // Đặt màu văn bản là màu đen
},

  button1: {
  width: '100%',
  height: 40,
  borderRadius: 40,
  backgroundColor: 'fff', // Đặt màu nền là màu trắng
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 20,
},

});

export default SignupScreen;
