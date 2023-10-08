import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Notice = () => {
  const navigation = useNavigation();

  const handleLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <ImageBackground style={{flex: 1}}
    source={require('../assets/nen6.png')}>

    <View style={{flex: 1}}> 

    <View style={{flex: 1,}}> 
    <Image style={[styles.logo,{marginTop:150}]}
    source={require('../assets/reservar-01.png')} />   
    </View>

    <View style={{borderRadius:20,width:'80%',marginLeft:20,marginBottom:-30}}>
      <Text style={styles.header}>Vui lòng bật thông báo</Text>
        <Text style={styles.textnotice}>
          Nhận thông báo từ ứng dụng để bạn có trải nghiệm tốt hơn!
        </Text>
    </View>

    <View style={{height: 201, }}>
       {/* backgroundColor: '#C0C0C0' */}
    <TouchableOpacity onPress={handleLoginScreen} style={styles.button}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLoginScreen} style={styles.linkContainer}>
          <Text style={styles.link}>Không phải bây giờ</Text>
        </TouchableOpacity>
    </View>
    </View>
</ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 25,
    color:'#fff',
    marginBottom:-15,
  },
  logo:{
    width:200,
    height:200,
    marginLeft:90,
    borderRadius:30,
    marginTop:-50,
    marginBottom:90,
  },
  textnotice: {
    marginLeft: 20,
    marginTop: 30,
    fontSize: 17,
    textAlign: 'left',
    marginBottom:20,
    color:'#fff'
    
  },
  button: {
    marginTop: 70,
    backgroundColor: '#16BBA3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    width:'88%',
    marginLeft:20,
    
  },
  buttonText: {
    textAlign: 'center',
    color:'#fff'
    
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
