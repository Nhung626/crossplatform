import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Icon from 'react-native-feather'
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../theme';

export default function NumOfPeople() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }} >
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        style={{ padding: 4, marginVertical: 30 }}>
                        <Icon.ArrowLeft
                            strokeWidth={3} stroke={'white'} height={30} width={30}
                            style={{ backgroundColor: themeColor.bgColor, borderRadius: 100 }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 30 }}>Thay đổi tìm kiếm của bạn</Text>
                </View>
                <View style={styles.countContainer}>
                    <Text style={styles.text}>Phòng</Text>
                    <View style={styles.count}>
                        <TouchableOpacity style={styles.Icon}>
                            <Icon.Minus strokeWidth={2} stroke={'white'} style={styles.sizeIcon} />
                        </TouchableOpacity>
                        <Text>{2}</Text>
                        <TouchableOpacity style={styles.Icon}>
                            <Icon.Plus strokeWidth={2} stroke={'white'} style={styles.sizeIcon} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.countContainer}>
                    <Text style={styles.text}>Số người</Text>
                    <View style={styles.count}>
                        <TouchableOpacity style={styles.Icon}>
                            <Icon.Minus strokeWidth={2} stroke={'white'} style={styles.sizeIcon} />
                        </TouchableOpacity>
                        <Text>{2}</Text>
                        <TouchableOpacity style={styles.Icon}>
                            <Icon.Plus strokeWidth={2} stroke={'white'} style={styles.sizeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView >

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
        fontWeight: 'bold',
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