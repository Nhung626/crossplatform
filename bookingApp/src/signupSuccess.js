import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function SignupSuccess({ navigation }) {
  const handleInformationScreen = () => {

    navigation.navigate('InformationScreen');
  };
  
  return (
    
    <ImageBackground style={styles.container}
    source={require('../assets/nen5.png')}
    >
      <View>
        <Icon style={{marginLeft:60,}} 
        name="checkmark-done-outline" size={100} color="#EBE4D1" />

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
    color:'#EBE4D1'
  },
  button: {
    marginTop: 30,
    backgroundColor: '#CCC8AA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight:'bold',
    marginLeft:15
  },
});

export default SignupSuccess;
