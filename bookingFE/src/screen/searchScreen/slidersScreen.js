import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Icon from 'react-native-feather';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';
export default function SlidersScreen() {

  const navigation = useNavigation();
  const initialSliderValues = [100000, 3000000];
  const [sliderValues, setSliderValues] = useState(initialSliderValues);


  const handleSliderChange = (values) => {
    setSliderValues(values);
  };

  const handleResetSlider = () => {
    // Reset slider values to the initial state
    setSliderValues(initialSliderValues);
  };
  const renderCustomMarkerLeft = (e) => {
    return (
      <View style={styles.customMarker}>
      </View>
    );
  };

  const renderCustomMarkerRight = (e) => {
    return (
      <View style={styles.customMarker}>
      </View>
    );
  };
  const formatValue = (value) => {
    return value.toLocaleString('en-US');
  };

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 20, backgroundColor: themeColor.bgColor }}>
        <Icon.ArrowLeft strokeWidth={2} stroke={'white'} height={25} width={25}
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}> Cài bộ lọc </Text>
        <TouchableOpacity onPress={handleResetSlider}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginRight: 10 }}> Cài lại </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.textTitle}>Ngân sách của bạn (cho 1 đêm)</Text>
        <View style={styles.textContainer}>
          <Text>
            VND {formatValue(sliderValues[0])} - VND {formatValue(sliderValues[1])}
          </Text>
        </View>
        <MultiSlider
          values={sliderValues}
          sliderLength={300}
          min={100000}
          max={3000000}
          step={100000}
          isMarkersSeparated={true}
          customMarkerLeft={renderCustomMarkerLeft}
          customMarkerRight={renderCustomMarkerRight}
          minMarkerOverlapDistance={4}
          onValuesChange={handleSliderChange}
          selectedStyle={{
            backgroundColor: themeColor.btColor, // Đây là màu hồng
          }}
        />


      </View>
      <View style={{ marginHorizontal: 10, marginVertical: 20, borderBottomWidth: 0.6, borderBottomColor: 'gray' }}>
        <Text style={styles.textTitle}> Xếp hạng chỗ nghỉ </Text>
        <View style={styles.chooseContainer}>
          <Text>Không xếp hạng</Text>

        </View>
        <View>
          <Text>1 Sao</Text>
        </View>
        <View>
          <Text>2 Sao</Text>
        </View>
        <View>
          <Text>3 Sao</Text>
        </View>
        <View>
          <Text>4 Sao</Text>
        </View>
        <View>
          <Text>5 Sao</Text>
        </View>
      </View>
    </SafeAreaView>


  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#8ee9ef', // Màu nền tùy chỉnh
    height: 97, // Kích thước theo yêu cầu
  },
  modalContentHeader: {
    padding: 20,
    flexDirection: 'row', // Sắp xếp các thành phần ngang hàng
    alignItems: 'center',

  },
  customMarker: {
    backgroundColor: 'pink',
    borderRadius: 20,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  chooseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 20
  }
})
