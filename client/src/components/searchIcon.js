import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { themeColor } from '../theme'
import { useNavigation } from '@react-navigation/native'
import * as Icon from "react-native-feather"
import { SafeAreaView } from 'react-native-safe-area-context'
export default function SearchIcon() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar style='dark' />

            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        style={{ padding: 4, marginVertical: 30 }}>
                        <Icon.ArrowLeft strokeWidth={2} stroke={'white'} height={30} width={30} style={{ backgroundColor: themeColor.bgColor, borderRadius: 100 }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginLeft: 30 }}>Thay đổi tìm kiếm của bạn</Text>
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
                        <Text style={styles.searchText}> Thời gian đặt phòng</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.searchContainer}
                        onPress={() => navigation.navigate('NumOfPeople')}>
                        <Icon.User height={20} width={20} stroke={'black'} style={{ marginLeft: 10 }} />
                        <Text style={styles.searchText}> Số lượng người</Text>
                    </TouchableOpacity>
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
        marginLeft: 10,
        color: 'gray'
    }
})