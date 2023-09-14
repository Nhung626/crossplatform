import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const CreatenameScreen = () => {
const navigation = useNavigation();
const handleCreatepassScreen =()=>{
    navigation.navigate('CreatepassScreen');
};

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Chúng tôi nên gọi bạn là gì?</Text>
      </View>

      <Text style={styles.label}>Họ</Text>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#CFD4E2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập họ của bạn"
        />
      </View>

      <Text style={styles.label}>Tên</Text>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#CFD4E2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập tên của bạn"
        />
      </View>

      <TouchableOpacity onPress={handleCreatepassScreen}
      style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'antialiased',
    marginBottom: 20,
    
  },
  label: {
    marginTop: 24,
    marginBottom:10,
    fontSize: 16,
    fontWeight: 'antialiased',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#235D9F',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  icon: {
    padding: 10,
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#DE5223',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreatenameScreen;
