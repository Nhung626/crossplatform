import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginApi } from "../../services/useAPI";
import { themeColor } from "../../utils/theme";

const StartScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForgetPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  const handleRegister = () => {
    navigation.navigate("SignupScreen");
  };


  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await loginApi(user)

      if (response.status === 200) {
        const token = response.data.token;
        const id = response.data.id;
        console.log("Đăng nhập thành công");
        navigation.navigate("MainScreen", { token, id })
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background/background.png")}
      style={styles.container}
    >
      <ScrollView style={styles.view1}>
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/reservar-01.png")}
            />
            <Text style={styles.header}>Chào mừng bạn</Text>
          </View>

          <View style={styles.Tp}>
            <View style={styles.content}>
              <View style={styles.inputBox}>
                <Text style={[styles.lableTitle]}>Tài khoản</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="Nhập tài khoản"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="black"
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.lableTitle}>Mật khẩu</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  placeholder="Nhập mật khẩu"
                  secureTextEntry
                  placeholderTextColor="black"
                />
              </View>
              <View style={styles.forget}>
                <TouchableOpacity onPress={handleForgetPassword}>
                  <Text style={styles.cmt}>
                    <Text>Bạn quên mật khẩu?</Text>
                    <Text style={{ color: "black" }}> | </Text>
                    <Text style={styles.link}>Lấy lại mật khẩu</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text>Đăng nhập</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.forget}>
              <TouchableOpacity
                onPress={handleForgetPassword}
              ></TouchableOpacity>
            </View>
            <View style={styles.register}>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  Bạn không có tài khoản?
                  <Text style={{ color: "black" }}> | </Text>
                  <Text style={styles.link}>Đăng ký</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
  view1: {
    width: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },

  Tp: {
    marginTop: 80,
    marginLeft: 20,
    justifyContent: "center",
    width: "90%",
    borderRadius: 20,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: 60,
  },
  header: {
    fontSize: 24,
    color: themeColor.bgColor,
    marginTop: 10,
    marginBottom: -70,
    fontWeight: "bold",
  },
  content: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  inputBox: {
    marginVertical: 10,
    width: "90%",
    justifyContent: "center",
  },

  lableTitle: {
    color: "black",
  },
  inputText: {
    width: "100%",
    height: 50,
    fontSize: 16,
    color: "black",
    borderWidth: 0.6,
    borderColor: themeColor.btColor,
    paddingHorizontal: 10
  },

  forget: {
    marginTop: 210,
    fontSize: 14,
    color: "black",
    marginBottom: 10,
  },
  link: {
    textDecorationLine: "underline",
    color: "black",
    fontWeight: "bold",
  },
  cmt: {
    marginTop: -170,
    color: "black",
    fontWeight: "bold",
  },
  button: {
    marginTop: -130,
    width: "80%",
    height: 40,
    borderRadius: 40,
    backgroundColor: themeColor.bgColor,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginBottom: -150,
  },
  register: {
    marginTop: -50,
    alignItems: "center",
    fontSize: 14,
    marginBottom: 100,
  },
});

export default StartScreen;
