import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreatePassScreen = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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

      <Button style={[styles.button, { backgroundColor: '#DE5223' }]}
        title="Tiếp theo"
        
        onPress={() => {
          // Xử lý sự kiện tiếp theo khi bấm nút
        }}
      />
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
    fontWeight: 'antialiased',
    marginBottom: 30,
  },
  label: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: 'antialiased',
    marginBottom:10,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#235D9F',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  button:{
    backgroundColor:"#DE5223",
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

export default CreatePassScreen;
