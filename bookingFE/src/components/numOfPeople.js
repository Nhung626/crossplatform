import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Icon from 'react-native-feather'
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../utils/theme';

export default function NumOfPeople() {
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();
    const [roomCount, setRoomCount] = useState(0);
    const [peopleCount, setPeopleCount] = useState(0);

    const handleIncrement = (type) => {
        if (type === 'room' && roomCount < 10) {
            setRoomCount(roomCount + 1);
        } else if (type === 'people' && peopleCount < 10) {
            setPeopleCount(peopleCount + 1);
        }
    };

    const handleDecrement = (type) => {
        if (type === 'room' && roomCount >= 1) {
            setRoomCount(roomCount - 1);
        } else if (type === 'people' && peopleCount >= 1) {
            setPeopleCount(peopleCount - 1);
        }
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}
                        style={{ padding: 4, marginVertical: 30 }}>
                        <Icon.ArrowLeft
                            strokeWidth={3} stroke={'white'} height={30} width={30}
                            style={{ backgroundColor: themeColor.bgColor, borderRadius: 100 }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 20, marginLeft: 30 }}>Thay đổi tìm kiếm của bạn</Text>
                </View>
                <View style={styles.countContainer}>
                    <Text style={styles.text}>Số phòng</Text>
                    <View style={styles.count}
                    >
                        <TouchableOpacity
                            onPress={() => handleDecrement('room')}
                            style={styles.Icon}>
                            <Icon.Minus strokeWidth={2} stroke={'white'} style={styles.sizeIcon} />
                        </TouchableOpacity>
                        <Text>{roomCount}</Text>
                        <TouchableOpacity
                            onPress={() => handleIncrement('room')}
                            style={styles.Icon}>
                            <Icon.Plus strokeWidth={2} stroke={'white'} style={styles.sizeIcon} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.countContainer}>
                    <Text style={styles.text}>Số người</Text>
                    <View style={styles.count}>
                        <TouchableOpacity
                            onPress={() => handleDecrement('people')}
                            style={styles.Icon}>
                            <Icon.Minus strokeWidth={2} stroke={'white'} style={styles.sizeIcon} />
                        </TouchableOpacity >
                        <Text>{peopleCount}</Text>
                        <TouchableOpacity
                            onPress={() => handleIncrement('people')}
                            style={styles.Icon}>
                            <Icon.Plus strokeWidth={2} stroke={'white'} style={styles.sizeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SearchIcon', {
                        roomCount, peopleCount
                    })}
                    style={{ borderRadius: 10, backgroundColor: themeColor.bgColor, alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 18, color: 'white' }}>Áp dụng</Text>
                </TouchableOpacity>
            </View>
        </Modal >

    )
}
const styles = StyleSheet.create({
    countContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    count: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gray',
        width: 150,
        paddingVertical: 12,
    },
    text: {
        fontWeight: '400',
        fontSize: 16
    },
    Icon: {
        borderRadius: 100,
        backgroundColor: themeColor.bgColor
    },
    sizeIcon: {
        height: 10,
        width: 10
    }
})