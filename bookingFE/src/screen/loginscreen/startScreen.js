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
import { getToken, loginApi } from "../../services/useAPI";
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
    const result = loginApi(email, password)
    if (result) {
      const token = await getToken();
      console.log("token: ", token)
      navigation.navigate("MainScreen")
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/images/background/background.png")}
        style={styles.backgroundStyle}
      >
        <ScrollView style={{ paddingBottom: 100 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              style={styles.imageLogo}
              source={require("../../assets/reservar-01.png")}
            />
          </View>

          <View
            style={styles.container}>
            <Text style={styles.header}>Đăng nhập</Text>

            <View style={{ marginBottom: 20 }}>

              <TextInput
                style={styles.inputBox}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor="grey"
              />
              <TextInput
                style={styles.inputBox}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Mật khẩu"
                secureTextEntry
                placeholderTextColor="grey"
              />
              {/* <View style={styles.forget}>
                <TouchableOpacity onPress={handleForgetPassword}>
                  <Text style={styles.cmt}>
                    <Text>Bạn quên mật khẩu?</Text>
                    <Text style={{ color: "black" }}> | </Text>
                    <Text style={styles.link}>Lấy lại mật khẩu</Text>
                  </Text>
                </TouchableOpacity>
              </View> */}
              <TouchableOpacity
                onPress={handleLogin} style={styles.button}>
                <Text style={{ color: 'white' }}>Đăng nhập</Text>
              </TouchableOpacity>
              <View style={styles.boxSignUp}>
                <Text> Bạn không có tài khoản?</Text>
                <TouchableOpacity onPress={handleRegister}>
                  <Text style={styles.textSignUp}>Đăng ký</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

        </ScrollView>


        {/* <View style={styles.forget}>
              <TouchableOpacity
                onPress={handleForgetPassword}
              ></TouchableOpacity>
            </View> */}
      </ImageBackground>

    </View>



  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,

  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 10,
    borderColor: themeColor.textColor,
    borderRadius: 10,
    borderWidth: 0.6,
    marginHorizontal: 20,
  },
  imageLogo: {
    marginTop: '20%',
    height: 240,
    width: 240
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: themeColor.textColor,
    paddingHorizontal: 15,
    paddingVertical: 20,
    textAlign: 'center'
  },
  inputBox: {
    padding: 16,
    backgroundColor:
      themeColor.bgModalColor,
    borderRadius: 20,
    marginBottom: 3,
    marginBottom: 10
  },
  button: {
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: themeColor.textColor
  },
  boxSignUp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,

  },
  textSignUp: {
    color: '#136EA7',
    paddingLeft: 8,

  }
});

export default StartScreen;
