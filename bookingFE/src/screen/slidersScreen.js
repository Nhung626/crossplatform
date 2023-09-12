import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback, FlatList, StatusBar, Modal, TextInput } from 'react-native';
import { Header } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Feather';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const SlidersScreen = ({ navigation }) => {

    const [sliderValues, setSliderValues] = useState([100000, 3000000]);
    const handleSliderChange = (values) => {
        setSliderValues(values);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
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
        <View>
            <Header
                containerStyle={styles.headerContainer}
                leftComponent={
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('SearchResult')}>
                        <View style={styles.searchContainer}>
                            <Icon name='arrow-left' size={25} style={{ paddingLeft: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                }
                centerComponent={<Text style={{ fontSize: 16, }}>Cài bộ lọc</Text>}
                rightComponent={
                    <TouchableWithoutFeedback onPress={toggleModal}>
                        <View >
                            <Text>Cài lại</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
            />
            <View style={{ alignItems: 'center' }}>
                <Text style={{ marginTop: 10, paddingLeft: 10 }}>Ngân sách của bạn (cho 1 đêm)</Text>
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
                        backgroundColor: 'pink', // Đây là màu hồng
                    }}
                />




            </View>
        </View>
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
})

export default SlidersScreen;