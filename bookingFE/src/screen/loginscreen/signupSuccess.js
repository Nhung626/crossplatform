import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { loginApi } from "../../services/useAPI";

function SignupSuccess({ navigation }) {
  const route = useRoute()
  const { user } = route.params ?? {};
  const handleInformationScreen = async () => {
    try {
      const response = await loginApi(user);
      if (response.status === 200) {
        const token = response.data.token;
        const id = response.data.id
        console.log(id)
        navigation.navigate("InformationScreen", { token, id });
      }
      else {
        const errorData = await response.json();
        alert(`Đăng ký thất bại: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng ký:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <View
      style={styles.container}
    // source={require("../assets/nen5.png")}
    >
      <View>
        <Icon
          style={{ marginLeft: 60 }}
          name="checkmark-done-outline"
          size={100}
          color="#146EAB"
        />

        <Text style={styles.successText}>Đăng ký thành công</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleInformationScreen}
        >
          <Text style={styles.buttonText}>Điền thông tin cá nhân</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff'
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#146EAB",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#A7BFD9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
    marginLeft: 15,
    color: '#146EAB'
  },
});

export default SignupSuccess;
