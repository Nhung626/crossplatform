import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CalendarPicker from 'react-native-calendar-picker'

export default function Calendar() {
    const minDate = new Date(); // Today
    const maxDate = new Date(2025, 6, 3);
    const [selectedStartDate, setSelectedStartDate] = useState('DD/MM/YYYY');
    const [selectedEndDate, setSelectedEndDate] = useState('DD/MM/YYYY');

    const onDateChange = (date, type) => {
        console.log(JSON.stringify(date));
        const newData = JSON.stringify(date);
        const newData2 = newData.substring(1, newData.length - 1);
        const dates = newData2.split('T');
        const date1 = dates[0].split('-');
        console.log(JSON.stringify(date1));
        const day = date1[2];
        const month = date1[1];
        const year = date1[0];
        if (type === 'END_DATE') {
            if (day === undefined) {
                setSelectedEndDate('DD/MM/YYYY');
            } else {
                setSelectedEndDate(day + '-' + month + '-' + year);
            }
        } else {
            setSelectedStartDate(day + '-' + month + '-' + year);
            setSelectedEndDate('DD/MM/YYYY');
        }
    };

    return (
        <SafeAreaView>
            <Text>calendarPicker</Text>
            <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
            />
            <Text> {'start date: ' + selectedStartDate}</Text>
            <Text> {'start date: ' + selectedEndDate}</Text>
        </SafeAreaView>
    );
}
