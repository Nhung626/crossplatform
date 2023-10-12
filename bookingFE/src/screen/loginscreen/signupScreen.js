import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { signUpApi } from "../../services/useAPI";
// import { useDispatch } from 'react-redux';
// import { registerUser } from './redux/actions/authActions';
import { themeColor } from "../../utils/theme";
function SignupScreen() {
  // const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const handleSignup = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập tài khoản và mật khẩu.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await signUpApi(user);
      if (response.status === 200) {
        console.log('Đăng ký thành công')
        navigation.navigate("SignupSuccess", { user })
      }
    } catch (error) {
      console.log(user)
      console.error("Lỗi khi gửi yêu cầu lưu thông tin:", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/background/background.png")}
        style={styles.backgroundStyle}
      >
        <ScrollView >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              style={[styles.imageLogo]}
              source={require("../../assets/reservar-01.png")}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.header}>Đăng ký</Text>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                style={styles.inputBox}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Email của bạn"
              />

              <TextInput
                style={styles.inputBox}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Mật khẩu của bạn"
                secureTextEntry={true}
              />

              <TextInput
                style={styles.inputBox}
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={true}
              />

              <TouchableOpacity
                onPress={handleSignup}
                style={styles.button}>
                <Text style={{ color: 'white' }}>Đăng ký</Text>
              </TouchableOpacity>
              <View style={styles.boxSignUp}>
                <Text> Bạn đã có tài khoản?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={styles.textSignUp}>Đăng nhâp</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

        </ScrollView>
      </ImageBackground>
    </View>

  );
}

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

export default SignupScreen;


