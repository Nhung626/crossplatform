import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'; // Import TouchableOpacity

function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);

  const handleSendVerificationCode = () => {
    if (isValidEmail(email)) {
      setStep(2);
    } else {
      alert('Email không hợp lệ. Vui lòng kiểm tra lại.');
    }
  };

  const handleNextStep = () => {
    if (verificationCode) {
      navigation.navigate('NewPassword');
    } else {
      alert('Mã xác nhận không hợp lệ. Vui lòng kiểm tra lại.');
    }
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lấy lại mật khẩu</Text>

      {step === 1 ? (
        <>
          <Text style={styles.label}>Nhập Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email của bạn"
          />

          <TouchableOpacity // Sử dụng TouchableOpacity thay cho Button
            style={styles.customButton}
            onPress={handleSendVerificationCode}
          >
            <Text style={styles.buttonText}>Gửi mã xác nhận</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Nhập mã xác nhận:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setVerificationCode(text)}
            value={verificationCode}
            placeholder="Mã xác nhận"
          />

          <TouchableOpacity // Sử dụng TouchableOpacity thay cho Button
            style={styles.customButton}
            onPress={handleNextStep}
          >
            <Text style={styles.buttonText}>Bước kế tiếp</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor:'#8db4ab'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop:10,
    marginBottom: 10,
    borderRadius:10,
  },
  customButton: {
    width: '80%',
    height: 40,
    borderRadius: 40,
    backgroundColor: '#fff',
    marginLeft:35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgetPassword;
