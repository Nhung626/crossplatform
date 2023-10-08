import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, ImageBackground } from 'react-native';

const InformationScreen = () => {
  return (
    <ImageBackground 
    style={styles.container}
    source={require('../assets/nen5.png')}>
    
    
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.information}>Thông tin khách hàng</Text>

        <TextInput
          placeholder="Họ và tên"
          style={styles.input}
          placeholderTextColor="#002929"
        />
        <TextInput
          placeholder="CCCD"
          style={styles.input}
          placeholderTextColor="#002929"
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputdate}
            placeholder="Ngày sinh"
            placeholderTextColor="#002929"
          />
          <TextInput
            placeholder="Giới tính"
            style={styles.inputsex}
            placeholderTextColor="#002929"
          />
        </View>

        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          placeholderTextColor="#002929"
        />

        <TextInput
          placeholder="Địa chỉ"
          style={styles.input}
          placeholderTextColor="#002929"
        />

        <Button title="Lưu thông tin" onPress={() => {}} />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',

},

  information: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
  width: '80%',
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  paddingHorizontal: 10,
  marginBottom: 20,
  color: '#002929',
  borderRadius:10,
},
inputdate:{
  marginLeft:40,
  width: '50%',
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  paddingHorizontal: 10,
  marginBottom: 20,
  color: '#002929',
  borderTopLeftRadius:10,
  borderBottomLeftRadius:10,
},

inputsex:{
  width: '30%',
  marginRight:38,
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  paddingHorizontal: 10,
  marginBottom: 20,
  color: '#002929',
  borderTopRightRadius: 10, // Đặt borderRadius cho góc trên cùng bên phải
  borderBottomRightRadius: 10,
},
});

export default InformationScreen;
