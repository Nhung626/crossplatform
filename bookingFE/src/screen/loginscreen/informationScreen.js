import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";

import { customerUpdateApi } from "../../services/useAPI";
import { useRoute } from "@react-navigation/native";
import { themeColor } from "../../utils/theme";
import moment from "moment";
import * as ImagePicker from 'expo-image-picker';


const InformationScreen = () => {
  const [fullName, setFullName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [viewDateOfBirth, setViewDateOfBirth] = useState(false)
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState(null);


  const route = useRoute();
  const { token, id } = route.params ?? {};
  console.log(token)
  console.log(id)
  const handleSaveInformation = async () => {
    const customer = new FormData();

    if (image) {
      customer.append('avatar', {
        uri: image.uri,
        type: 'image/png', // hoặc 'image/png' tùy thuộc vào loại hình ảnh
        name: 'avatar.png', // tên tệp tin, bạn có thể đặt tên theo ý muốn
      });
    }
    customer.append('fullName', fullName);
    customer.append('gender', gender);
    customer.append('phoneNumber', phoneNumber);
    customer.append('address', address);
    customer.append('customerCode', customerCode);
    customer.append('dateOfBirth', moment(dateOfBirth).format('YYYY-MM-DD'));
    console.log(customer)
    try {
      const response = await customerUpdateApi(customer, token, id)

      if (response.status === 200) {
        console.log("Thông tin đã được lưu thành công.");
      } else {
        console.log(response.data)
      }
    } catch (error) {
      if (error.response) {
        // Đây là lỗi từ phản hồi HTTP, ví dụ: 4xx, 5xx
        console.error("Lỗi khi gửi yêu cầu lưu thông tin:", error.response.data);
      } else if (error.request) {
        // Đây là lỗi không có phản hồi từ máy chủ
        console.error("Không có phản hồi từ máy chủ");
      } else {
        // Đây là lỗi trong quá trình thiết lập yêu cầu
        console.error("Lỗi trong quá trình thiết lập yêu cầu:", error.message);
      }
    }
  };
  console.log(dateOfBirth.toISOString())
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      return
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/images/background/background.png")}
        style={styles.backgroundStyle}
      >
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => pickImage()} style={{ marginVertical: 30 }}>
              {image ? (
                <Image source={{ uri: image.uri }} style={styles.imageLogo} />
              ) : (
                <Image style={styles.imageLogo}
                  source={require("../../assets/avatar.png")}
                />
              )}


            </TouchableOpacity>

          </View>
          <View style={styles.container}>
            <Text style={styles.header}>Thông tin khách hàng</Text>
            <View style={{}}>
              <TextInput
                placeholder="Họ và tên"
                style={styles.inputBox}
                placeholderTextColor="grey"
                onChangeText={(text) => setFullName(text)}
                value={fullName}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.inputBoxDate}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Icon name="calendar" size={24} color={themeColor.bgColor} />
                    {showDatePicker && (
                      <DateTimePicker
                        value={dateOfBirth}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                          if (selectedDate) {
                            setDateOfBirth(selectedDate);
                            setViewDateOfBirth(true)
                          }
                          setShowDatePicker(false);
                        }}
                      />
                    )}
                    <Text style={{ paddingLeft: 20 }}>
                      {viewDateOfBirth ? (
                        <>
                          <Text> {moment(dateOfBirth).format('DD/MM/YYYY')}</Text>
                        </>
                      ) : (
                        <>
                          <Text style={{ color: 'grey' }}>DD/MM/YYYY</Text>
                        </>
                      )}
                    </Text>

                  </TouchableOpacity>
                </View>

                <TextInput
                  placeholder="Giới tính"
                  style={styles.inputBoxGender}
                  placeholderTextColor="grey"
                  onChangeText={(text) => setGender(text)}
                  value={gender}
                />
              </View>


              <TextInput
                placeholder="CCCD"
                style={styles.inputBox}
                placeholderTextColor="grey"
                onChangeText={(text) => setCustomerCode(text)}
                value={customerCode}
              />

              <TextInput
                placeholder="Số điện thoại"
                style={styles.inputBox}
                placeholderTextColor="grey"
                onChangeText={(text) => setPhoneNumber(text)}
                value={phoneNumber}
              />

              <TextInput
                placeholder="Địa chỉ"
                style={styles.inputBox}
                placeholderTextColor="grey"
                onChangeText={(text) => setAddress(text)}
                value={address}
              />


              <TouchableOpacity style={styles.button} onPress={handleSaveInformation}>
                <Text style={{ color: 'white' }}>Lưu thông tin</Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
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
    paddingVertical: 20
  },
  imageLogo: {
    marginTop: '20%',
    height: 180,
    width: 180,
    borderRadius: 120,  // Đặt giá trị lớn để tạo thành hình tròn
    overflow: 'hidden',  // Cắt ảnh thành hình tròn
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: themeColor.textColor,
    paddingHorizontal: 15,
    paddingVertical: 20,
    textAlign: 'center',
  },
  inputBox: {
    padding: 10,
    backgroundColor:
      themeColor.bgModalColor,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center'
  },
  inputBoxDate: {
    padding: 12,
    backgroundColor:
      themeColor.bgModalColor,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  inputBoxGender: {
    padding: 10,
    backgroundColor:
      themeColor.bgModalColor,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20
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

export default InformationScreen;