import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';

export default function filterCategory() {
    const [activeFilter, setActiveFilter] = useState(null)
    const handleFilterPress = (filterId) => {
        setActiveFilter((prev) => (prev === filterId ? null : filterId));
    }
    return (
        <View>
            <Text>filterCategory</Text>
        </View>
    )
}