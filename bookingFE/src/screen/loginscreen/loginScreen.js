import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { themeColor } from "../../utils/theme";
const LoginScreen = () => {
  const navigation = useNavigation();

  const handleStartScreen = () => {
    // Chuyển hướng đến màn hình 'StartScreen'
    navigation.navigate("StartScreen");
  };
  return (
    // <ImageBackground style={styles.container}
    // source={require('../assets/nen1.png')}
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/background/background.png')} resizeMode="cover" style={styles.image}>
        <Image
          style={styles.imageLogo}
          source={require('../../assets/logoReservar.png')}
        />

        <Text style={styles.header}> Đăng nhập để dễ dàng truy cập thông tin chuyến đi </Text>

        <View style={{ marginTop: 20 }}>
          {/* <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <Image source={require('../../assets/images/icons/google.png')} resizeMode={'cover'} style={styles.iconStyle} />
              <Text style={styles.text}>Tiếp tục bằng tài khoản Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <Image source={require('../../assets/images/icons/facebook.png')} resizeMode={'cover'} style={{ height: 24, width: 24 }} />
              <Text style={styles.text}>
                Tiếp tục bằng tài khoản Facebook
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleStartScreen}
            style={styles.buttonEmail}
          >
            <Text style={styles.textEmail}>Tiếp tục với Email</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.button2}>
            <View style={styles.buttonContent2}>
              <Image source={require('../../assets/images/icons/google.png')} resizeMode={'cover'} style={styles.iconStyle} />
              <Text style={styles.text}>Tiếp tục bằng tài khoản Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2}>
            <View style={styles.buttonContent2}>
              <Image source={require('../../assets/images/icons/facebook.png')} resizeMode={'cover'} style={{ height: 24, width: 24 }} />
              <Text style={styles.text}>
                Tiếp tục bằng tài khoản Facebook
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleStartScreen}
            style={styles.buttonEmail2}
          >
            <Text style={styles.textEmail2}>Tiếp tục với Email</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>

    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: "center",
  },
  imageLogo: {
    marginTop: '20%',
    height: 240,
    width: 240
  },
  container: {
    flex: 1
  },
  iconStyle:
  {
    height: 24,
    width: 24
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: themeColor.textColor,
    paddingHorizontal: 15,
    paddingVertical: 20,
    textAlign: 'center'
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: themeColor.textColor,
    marginVertical: 10,
  },

  buttonEmail: {
    marginTop: 10,
    backgroundColor: themeColor.textColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    marginLeft: 10,
    color: themeColor.textColor,
  },

  textEmail: {
    textAlign: "center",
    color: "#fff",
  },
});

export default LoginScreen;
