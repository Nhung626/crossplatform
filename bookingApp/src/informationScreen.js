import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";

const InformationScreen = () => {
  const [fullName, setFullName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSaveInformation = async () => {
    const userData = {
      fullName: fullName,
      dateOfBirth: dateOfBirth.toISOString(),
      gender: gender,
      customerCode: customerCode,
      phoneNumber: phoneNumber,
      address: address,
    };

    try {
      const response = await fetch(
        "http://192.168.1.8:3000/api/v1/customer/auth/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      

      if (response.status === 200) {
        setStatusMessage("Thông tin đã được lưu thành công.");
      } else {
        setStatusMessage("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu lưu thông tin:", error);
      setStatusMessage("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.information}>Thông tin khách hàng</Text>

        <TextInput
          placeholder="Họ và tên"
          style={styles.input}
          placeholderTextColor="#002929"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        />

        <View style={styles.inputRow}>
          <View style={styles.dateInputContainer}>
            <TouchableOpacity
              style={styles.dateIcon}
              onPress={() => setShowDatePicker(true)}
            >
              <Icon name="calendar" size={24} color="#002929" />
            </TouchableOpacity>
            <TextInput
              style={styles.inputdate}
              onChangeText={(text) => setDateOfBirth(text)}
              value={dateOfBirth.toDateString()}
              editable={false}
            />
          </View>
          <TextInput
            placeholder="Giới tính"
            style={styles.inputsex}
            placeholderTextColor="#002929"
            onChangeText={(text) => setGender(text)}
            value={gender}
          />
        </View>

        <TextInput
          placeholder="CCCD"
          style={styles.input}
          placeholderTextColor="#002929"
          onChangeText={(text) => setCustomerCode(text)}
          value={customerCode}
        />

        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          placeholderTextColor="#002929"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
        />

        <TextInput
          placeholder="Địa chỉ"
          style={styles.input}
          placeholderTextColor="#002929"
          onChangeText={(text) => setAddress(text)}
          value={address}
        />

        {showDatePicker && (
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              style={styles.datePicker}
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setDateOfBirth(selectedDate);
                }
                setShowDatePicker(false);
              }}
            />
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSaveInformation}>
          <Text style={styles.buttonText}>Lưu thông tin</Text>
        </TouchableOpacity>

        <Text>{statusMessage}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  information: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#146EAB",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#002929",
    borderRadius: 10,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: 40,
  },
  dateIcon: {
    marginRight: 10,
  },
  inputdate: {
    flex: 1,
    height: 40,
    color: "#002929",
    marginLeft: 20,
  },
  inputsex: {
    width: "30%",
    marginRight: 38,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#002929",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    backgroundColor: "#A7BFD9",
    borderRadius: 20,
    width: 130,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#146EAB",
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  datePickerContainer: {
    position: "absolute",
    right: 170,
    bottom: 465,
  },
  datePicker: {
    backgroundColor: "#fff",
  },
});

export default InformationScreen;
