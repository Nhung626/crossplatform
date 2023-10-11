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
    <ImageBackground
      source={require("../../assets/nen4.png")}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.header}>
          <Image
            style={[styles.logo]}
            source={require("../../assets/reservar-01.png")}
          />
          <Text style={styles.headerText}>Đăng ký</Text>
        </View>

        <Text style={styles.label}>Nhập tài khoản</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email của bạn"
        />

        <Text style={styles.label}>Nhập mật khẩu</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Mật khẩu của bạn"
          secureTextEntry={true}
        />

        <Text style={styles.label}>Nhập lại mật khẩu</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button1}>
          <Button onPress={handleSignup} title="Đăng ký" color="black" />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: "black",
    borderRadius: 10,
  },
  button1: {
    width: "100%",
    height: 40,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default SignupScreen;


