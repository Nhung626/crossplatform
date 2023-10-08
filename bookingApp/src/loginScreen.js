import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const navigation = useNavigation();

  const handleStartScreen = () => {
    // Chuyển hướng đến màn hình 'StartScreen'
    navigation.navigate("StartScreen");
  };

  return (
    // <ImageBackground style={styles.container}
    // source={require('../assets/nen1.png')}
    // >
    <View style={styles.container}>
      <Text style={styles.header}>
        Đăng nhập để dễ dàng truy cập thông tin chuyến đi
      </Text>

      <View style={styles.button}>
        <View style={{ justifyContent: "center", marginTop: 20 }}>
          <TouchableOpacity style={styles.buttonGG}>
            <View style={styles.buttonContent}>
              <Icon name="google" size={20} color="#146EAB" />
              <Text style={styles.textGG}>Tiếp tục bằng tài khoản Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonFB}>
            <View style={styles.buttonContent}>
              <Icon name="facebook" size={20} color="#146EAB" />
              <Text style={styles.textFB}>
                Tiếp tục bằng tài khoản Facebook
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleStartScreen}
            style={styles.buttonEmail}
          >
            <Text style={styles.textEmail}>Tiếp tục với Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: -150,
    marginBottom: 60,
    color: "#146EAB",
  },

  buttonGG: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10, // Dịch lên
    borderWidth: 1,
    borderColor: "#146EAB",
    marginBottom: 10,
  },
  buttonFB: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#146EAB",
    marginBottom: 10,
  },
  buttonEmail: {
    marginTop: 10,
    backgroundColor: "#146EAB",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
  },
  textGG: {
    textAlign: "center",
    marginLeft: 10,
    color: "#146EAB",
  },
  textFB: {
    textAlign: "center",
    marginLeft: 10,
    color: "#146EAB",
  },
  textEmail: {
    textAlign: "center",
    color: "#fff",
  },
});

export default LoginScreen;
