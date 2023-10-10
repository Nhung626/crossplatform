import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { themeColor } from '../../utils/theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Icon from "react-native-feather"
import { SafeAreaView } from 'react-native-safe-area-context'
import NumOfPeople from './numOfPeople'

export default function SearchIcon() {
    const navigation = useNavigation();
    const route = useRoute();
    const { startDate, endDate, startDayOfWeek, endDayOfWeek, roomCount, peopleCount } = route.params ?? {};
    const [numOfPeopleModalVisible, setNumOfPeopleModalVisible] = useState(false);

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar style='dark' />

            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        style={{ padding: 4, marginVertical: 30 }}>
                        <Icon.ArrowLeft strokeWidth={2} stroke={'white'} height={30} width={30} style={{ backgroundColor: themeColor.bgColor, borderRadius: 100 }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 30 }}>Thay đổi tìm kiếm của bạn</Text>
                </View>

                <View style={{ borderWidth: 5, borderColor: themeColor.btColor }}>
                    <TouchableOpacity style={styles.searchContainer}
                        onPress={() => navigation.navigate('Map')}>
                        <Icon.Search height={20} width={20} stroke={'black'} style={{ marginLeft: 10 }} />
                        <Text style={styles.searchText}> Xung quanh vị trí hiện tại</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.searchContainer}
                        onPress={() => navigation.navigate('Calendar')}>
                        <Icon.Calendar height={20} width={20} stroke={'black'} style={{ marginLeft: 10 }} />

                        <Text style={styles.searchText}>
                            {startDate ? (
                                <>
                                    <Text > {startDayOfWeek}, {startDate}</Text>
                                    <Text>  - </Text>
                                    <Text >{endDayOfWeek}, {endDate}</Text>
                                </>
                            ) : (
                                'Thời gian đặt phòng'
                            )}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.searchContainer}
                        onPress={() => setNumOfPeopleModalVisible(true)}>
                        <Icon.User height={20} width={20} stroke={'black'} style={{ marginLeft: 10 }} />
                        <Text style={styles.searchText}>
                            {roomCount ? (
                                <>
                                    <Text> {roomCount} Phòng </Text>
                                    <Text> • </Text>
                                    <Text> {peopleCount} Người</Text>
                                </>
                            ) : (
                                'Chọn phòng và khách'
                            )}
                        </Text>
                    </TouchableOpacity>
                    <NumOfPeople
                        isVisible={numOfPeopleModalVisible}
                        onClose={() => setNumOfPeopleModalVisible(false)}
                    />
                    <TouchableOpacity
                        style={{ alignItems: 'center', paddingVertical: 16, backgroundColor: themeColor.bgColor }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Tìm</Text>
                    </TouchableOpacity>
                </View>



            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    searchContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 18
    },
    searchText: {
        marginLeft: 10
    }
})