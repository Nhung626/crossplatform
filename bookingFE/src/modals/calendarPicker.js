import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import { themeColor } from '../utils/theme';
import { saveNight } from '../services/useAPI';

export default function Calendar({ isVisible, onClose }) {
    const weekdays = ['T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7', 'CN']

    const minDate = new Date(); // Today
    const maxDate = new Date(2025, 6, 3);
    const [selectedStartDate, setSelectedStartDate] = useState('DD/MM');
    const [selectedEndDate, setSelectedEndDate] = useState('DD/MM');

    const [countDayStart, setCountDayStart] = useState(null)
    const [countDayEnd, setCountDayEnd] = useState(null)

    const [startDayOfWeek, setStartDayOfWeek] = useState(null);
    const [endDayOfWeek, setEndDayOfWeek] = useState(null);
    const [countNight, setCountNight] = useState(null);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const onDateChange = (date, type) => {
        const newData = JSON.stringify(date);
        const newData2 = newData.substring(1, newData.length - 1);
        const dates = newData2.split('T');
        const date1 = dates[0].split('-');
        const day = date1[2];
        const month = date1[1];
        const year = date1[0];


        if (type === 'END_DATE') {
            if (day === undefined) {
                setSelectedEndDate('DD/MM');
                setCountDayEnd(null)
                setEndDayOfWeek(null)
            } else {
                setSelectedEndDate(day + ' Th' + month);
                setEnd(year + '-' + month + '-' + day)
                setCountDayEnd(date)

                const dayOfWeek = new Date(date).getDay();
                setEndDayOfWeek(weekdays[dayOfWeek]);
            }
        } else {
            setSelectedStartDate(day + ' Th' + month);
            setStart(year + '-' + month + '-' + day);
            setCountDayStart(date)
            setSelectedEndDate('DD/MM');
            setCountDayEnd(null)

            const dayOfWeek = new Date(date).getDay();
            setStartDayOfWeek(weekdays[dayOfWeek]);
        }
    };


    const calculateNightCount = () => {
        const dayStart = new Date(countDayStart);
        const dayEnd = new Date(countDayEnd);
        if (countDayStart && countDayEnd) {
            const timeDifference = dayEnd.getTime() - dayStart.getTime();
            const countNight = timeDifference / (1000 * 3600 * 24);
            return countNight;
        }

        return 0; // Default value if no dates are selected
    };
    useEffect(() => {
        if (startDayOfWeek && endDayOfWeek) {
            const calculatedNight = calculateNightCount();
            setCountNight(calculatedNight);
            console.log("đêm: ", calculatedNight)
            saveNight(calculatedNight)
        }
    }, [countDayStart, countDayEnd]);

    customMonths =
        ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
    customWeekdays = ['T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7', 'CN']

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
                <View style={{
                    marginLeft: 10, marginRight: 10, backgroundColor: themeColor.bgModalColor,
                    padding: 20,
                    borderTopLeftRadius: 50, borderTopRightRadius: 50,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    height: "55%",
                    width: "100%",
                }}>
                    <CalendarPicker
                        scrollable={true}
                        startFromMonday={true}
                        allowRangeSelection={true}
                        allowBackwardRangeSelect={true}
                        minDate={minDate}
                        maxDate={maxDate}
                        todayBackgroundColor={themeColor.btColor}
                        selectedDayColor={themeColor.bgColor}
                        selectedDayTextColor="#FFFFFF"
                        weekdays={customWeekdays}
                        months={customMonths}
                        onDateChange={onDateChange}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                        <Text style={{ fontWeight: '500' }}> {selectedStartDate}</Text>
                        <Text> -</Text>
                        <Text style={{ fontWeight: '500' }}> {selectedEndDate}</Text>
                        <Text> ({calculateNightCount()} đêm)</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            onClose({
                                startDate: selectedStartDate,
                                endDate: selectedEndDate,
                                startDayOfWeek,
                                endDayOfWeek,
                                countNight,
                                start, end
                            });
                        }}

                        style={{ backgroundColor: themeColor.bgColor, borderRadius: 5, alignItems: 'center', marginHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Chọn ngày</Text>

                    </TouchableOpacity>

                </View>

            </View>

        </Modal>
    );
}