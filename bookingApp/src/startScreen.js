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
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "http://192.168.1.8:3000/api/v1/customer/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi nhận phản hồi từ API");
      }

      // const responseData = await response.json();

      if (response.ok) {
        // Kiểm tra tài khoản và mật khẩu hợp lệ ở đây
        if (response.ok) {
          // Tài khoản và mật khẩu hợp lệ, chuyển đến màn hình chính
          // navigation.navigate('MainScreen');
          console.log("đăng nhập thành công");
        } else {
          alert("Đăng nhập thất bại. Tài khoản hoặc mật khẩu không đúng.");
        }
      } else {
        alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/nen6.png")}
      style={styles.container}
    >
      <ScrollView style={styles.view1}>
        <View style={styles.overlay}>
          {/* <Image style={[styles.logo,width = 10,]}
    source={require('../assets/reservar-01.png')} />  */}
          <View style={styles.headerContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/reservar-01.png")}
            />
            <Text style={styles.header}>Chào mừng bạn</Text>
          </View>

          <View style={styles.Tp}>
            <View style={styles.content}>
              <View style={styles.inputBoxemail}>
                <Text style={[styles.labelemail]}>Tài khoản</Text>
                <TextInput
                  style={styles.inputemail}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="Nhập tài khoản"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#fff"
                />
              </View>
              <View style={styles.inputBoxpass}>
                <Text style={styles.labelpass}>Mật khẩu</Text>
                <TextInput
                  style={styles.inputpass}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  placeholder="Nhập mật khẩu"
                  secureTextEntry="none"
                  placeholderTextColor="#fff"
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
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
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
    // borderWidth:1,
    borderColor: "#fff",
    width: "90%",
    height: 500,
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
    color: "#FFE4D6",
    marginTop: 10,
    marginBottom: -70,
    fontWeight: "bold",
  },
  content: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  inputBoxemail: {
    marginVertical: 10,
    width: 310,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    borderColor: "transparent",
    justifyContent: "center",
  },
  inputBoxpass: {
    marginVertical: 10,
    width: 310,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    borderColor: "transparent",
  },
  labelemail: {
    color: "#fff",
  },
  inputemail: {
    width: "100%",
    height: 50,
    fontSize: 16,
    color: "#fff",
  },
  labelpass: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  inputpass: {
    width: "100%",
    height: 50,
    fontSize: 16,
    color: "#fff",
  },
  forget: {
    marginTop: 210,
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  link: {
    textDecorationLine: "underline",
    color: "#fff",
    fontWeight: "bold",
  },
  cmt: {
    marginTop: -170,
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    marginTop: -130,
    width: "80%",
    height: 40,
    borderRadius: 40,
    backgroundColor: "#fff",
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
