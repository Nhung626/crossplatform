import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Notice = () => {
  const navigation = useNavigation();

  const handleLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={{flex: 1}}>
    <View style={{flex: 1, backgroundColor: '#026c80'}}> 
    <Text style={styles.header}>Vui lòng bật thông báo</Text>
      <Text style={styles.textnotice}>
        Thông báo từ ứng dụng sẽ giúp bạn luôn được cập nhật khi có các thay đổi về đặt chỗ. Thỉnh thoảng, bạn cũng sẽ nhận được thông tin về ưu đãi và tặng thưởng.
      </Text>
    </View>
    <View style={{height: 150, backgroundColor: '#026c80'}}>
    <TouchableOpacity onPress={handleLoginScreen} style={styles.button}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLoginScreen} style={styles.linkContainer}>
          <Text style={styles.link}>Không phải bây giờ</Text>
        </TouchableOpacity>
    </View>
</View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop:50,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 25,
  },
  textnotice: {
    marginLeft: 20,
    marginTop: 30,
    fontSize: 17,
    textAlign: 'left',
    color: '#fff',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#8db4ad',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  linkContainer: {
    marginTop: 30, // Điều chỉnh khoảng cách giữa nút và văn bản
  },
  link: {
    textAlign: 'center',
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default Notice;
