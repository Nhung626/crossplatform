import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Notice = () => {
  const navigation = useNavigation();

  const handleLoginScreen = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    // <ImageBackground style={{flex: 1}}
    // source={require('../assets/nen6.png')}>
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Image
            style={[styles.logo, { marginTop: 150 }]}
            source={require("../assets/reservar-01.png")}
          />
        </View>

        <View
          style={{
            borderRadius: 20,
            width: "80%",
            marginLeft: 20,
            marginBottom: 100,
          }}
        >
          <Text style={styles.header}>Vui lòng bật thông báo</Text>
          <Text style={styles.textnotice}>
            Nhận thông báo từ ứng dụng để bạn có trải nghiệm tốt hơn!
          </Text>
        </View>

        <View style={{ height: 201 }}>
          {/* backgroundColor: '#C0C0C0' */}
          <TouchableOpacity onPress={handleLoginScreen} style={styles.button}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLoginScreen}
            style={styles.linkContainer}
          >
            <Text style={styles.link}>Không phải bây giờ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 25,
    color: "#146EAB",
    marginBottom: -15,
  },
  logo: {
    width: 250,
    height: 250,
    marginLeft: 70,
    borderRadius: 30,
    
  },
  textnotice: {
    marginLeft: 25,
    marginTop: 30,
    fontSize: 17,
    textAlign: "left",
    marginBottom: 20,
    color: "#146EAB",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#A7BFD9",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    width: "88%",
    marginLeft: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#146EAB",
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 30, 
  },
  link: {
    textAlign: "center",
    color: "#146EAB",
    textDecorationLine: "underline",
  },
});

export default Notice;
