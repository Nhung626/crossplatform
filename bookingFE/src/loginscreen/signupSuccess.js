import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function SignupSuccess({ navigation }) {
  const handleInformationScreen = () => {
    navigation.navigate("InformationScreen");
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
    backgroundColor:'#fff'
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
    color:'#146EAB'
  },
});

export default SignupSuccess;
