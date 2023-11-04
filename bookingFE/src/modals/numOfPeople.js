import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import * as Icon from 'react-native-feather'
import { themeColor } from '../utils/theme';

export default function NumOfPeople({ isVisible, onClose }) {

    // const [roomCount, setRoomCount] = useState(0);
    const [peopleCount, setPeopleCount] = useState(0);

    const handleIncrement = (type) => {
        // if (type === 'room' && roomCount < 10) {
        //     setRoomCount(roomCount + 1);
        // } else 
        if (type === 'people' && peopleCount < 10) {
            setPeopleCount(peopleCount + 1);
        }
    };

    const handleDecrement = (type) => {
        // if (type === 'room' && roomCount >= 1) {
        //     setRoomCount(roomCount - 1);
        // } else
        if (type === 'people' && peopleCount >= 1) {
            setPeopleCount(peopleCount - 1);
        }
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",

            }}>
                <View style={styles.containerModal}>
                    <View style={{ paddingVertical: 30, alignItems: 'center' }}>
                        <Text style={{ fontWeight: '500', fontSize: 20 }}>Thay đổi tìm kiếm của bạn</Text>

                    </View>
                    {/* <View style={styles.countContainer}>
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

                    </View> */}
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
                    <TouchableOpacity onPress={() => {
                        onClose({peopleCount })
                    }}
                        style={styles.button}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Áp dụng</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal >

    )
}
const styles = StyleSheet.create({
    containerModal: {
        marginLeft: 10, marginRight: 10, backgroundColor: themeColor.bgModalColor,
        padding: 20,
        borderTopLeftRadius: 50, borderTopRightRadius: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        height: "35%",
        width: "100%",
    },
    countContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
    button: {
        borderRadius: 10,
        backgroundColor: themeColor.bgColor,
        alignItems: 'center',
        padding: 10,
        marginTop: '10%'
    }
})