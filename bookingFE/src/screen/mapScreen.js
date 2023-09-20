import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColor } from '../theme'
import * as Icon from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'

export default function MapScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{
                flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 16
            }}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', borderRadius: 20, borderWidth: 4, padding: 12, marginRight: 10, borderColor: themeColor.bdColor(1), backgroundColor: 'white' }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }}
                        onPress={() => navigation.navigate('SearchIcon')}>
                        <Icon.Search height="25" width="25" stroke="gray" />
                        <Text style={{ marginLeft: 2, flex: 1, color: 'gray' }} > Tìm kiếm </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderLeftWidth: 2, paddingRight: 2, paddingLeft: 8 }}
                        onPress={() => navigation.navigate('Map')}>
                        <Icon.MapPin height="20" width="20" stroke="gray" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}