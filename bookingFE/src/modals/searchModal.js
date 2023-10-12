import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Icon from "react-native-feather"
import NumOfPeople from './numOfPeople'
import { themeColor } from '../utils/theme'
import Calendar from './calendarPicker'
export default function SearchModal() {
    const navigation = useNavigation()
    const route = useRoute;
    const { startDate, endDate, startDayOfWeek, endDayOfWeek, roomCount, peopleCount, countNight } = route.params ?? {};
    const [numOfPeopleModalVisible, setNumOfPeopleModalVisible] = useState(false);
    const [calendarModalVisible, setCalendarModalVisible] = useState(false)
    const [numOfPeopleData, setNumOfPeopleData] = useState({
        roomCount,
        peopleCount
    });
    const [calendarData, setCalendarData] = useState({
        startDate, endDate, startDayOfWeek, countNight, endDayOfWeek
    });
    const handleNumOfPeopleClose = (data) => {
        setNumOfPeopleData(data);
        setNumOfPeopleModalVisible(false);
    };
    const handleCalendarClose = (data) => {
        setCalendarData(data);
        setCalendarModalVisible(false);
    }
    return (
        <View style={{ borderWidth: 2, borderColor: themeColor.bgColor, borderRadius: 6, marginHorizontal: 10 }}>
            <TouchableOpacity style={styles.searchContainer}
                onPress={() => navigation.navigate('Map')}>
                <Icon.Search height={20} width={20} stroke={'black'} style={{ marginLeft: 10 }} />
                <Text style={styles.searchText}> Xung quanh vị trí hiện tại</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.searchContainer}
                onPress={() => setCalendarModalVisible(true)}>
                <Icon.Calendar height={20} width={20} stroke={'black'} style={{ marginLeft: 10 }} />

                <Text style={styles.searchText}>
                    {calendarData.startDate ? (
                        <>
                            <Text > {calendarData.startDayOfWeek}, {calendarData.startDate}</Text>
                            <Text>  - </Text>
                            <Text >{calendarData.endDayOfWeek}, {calendarData.endDate}</Text>
                            {calendarData.countNight ? (
                                <Text> - ({calendarData.countNight} đêm)</Text>

                            ) : ('')}
                        </>
                    ) : (
                        'Thời gian đặt phòng'
                    )}
                </Text>
            </TouchableOpacity>
            {calendarModalVisible && (
                <Calendar
                    isVisible={calendarModalVisible}
                    onClose={handleCalendarClose}
                />
            )}


            <TouchableOpacity style={styles.searchContainer}
                onPress={() => setNumOfPeopleModalVisible(true)}>
                <Icon.User height={20} width={20} stroke={'black'} style={{ marginLeft: 10 }} />
                <Text style={styles.searchText}>
                    {numOfPeopleData.roomCount ? (
                        <>
                            <Text> {numOfPeopleData.roomCount} Phòng </Text>
                            <Text> • </Text>
                            <Text> {numOfPeopleData.peopleCount} Người</Text>
                        </>
                    ) : (
                        'Chọn phòng và khách'
                    )}
                </Text>
            </TouchableOpacity>
            {numOfPeopleModalVisible && (
                <NumOfPeople
                    isVisible={numOfPeopleModalVisible}
                    onClose={handleNumOfPeopleClose}
                />
            )}
            <TouchableOpacity
                onPress={() => navigation.navigate('SearchValue')}
                style={{ alignItems: 'center', paddingVertical: 16, backgroundColor: themeColor.bgColor, borderBottomEndRadius: 5, borderBottomStartRadius: 5 }}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Tìm</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    searchContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 18, width: '100%'
    },
    searchText: {
        marginLeft: 10
    }
})