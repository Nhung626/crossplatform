import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

const NewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleCompleteButtonPress = () => {
    // Thực hiện xử lý khi người dùng bấm nút "Hoàn tất" ở đây
    if (newPassword === confirmPassword) {
      // Mật khẩu mới và xác nhận khớp, tiến hành lưu mật khẩu mới
      console.log('Mật khẩu đã được thay đổi thành công:', newPassword);
    } else {
      // Mật khẩu không khớp, hiển thị thông báo lỗi
      console.log('Mật khẩu không khớp. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Thay đổi mật khẩu</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu mới"
        onChangeText={handleNewPasswordChange}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập lại mật khẩu mới"
        onChangeText={handleConfirmPasswordChange}
        secureTextEntry={true}
      />
      <Button
        title="Hoàn tất"
        onPress={handleCompleteButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    width: '80%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default NewPasswordScreen;