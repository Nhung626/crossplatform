import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAllProviderAPI } from '../../services/useAPI'
import { themeColor } from '../../utils/theme'
import FeaturedRow from '../../components/showHotel'

export default function GetProvider() {
    const [data, setData] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllProviderAPI();
                if (response.status === 200) {
                    setData(response.data)
                } else {
                    console.log(response.status)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, []);
    return (
        <SafeAreaView>
            <View style={{ alignItems: "center", paddingVertical: 30, backgroundColor: themeColor.bgColor }}>
                <Text style={{ fontWeight: '500', fontSize: 20, color: 'white' }}>Get All Provider</Text>

            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
                <View style={{ backgroundColor: "white" }}>
                    {Array.isArray(data) ? (
                        data.map((item) => (
                            <FeaturedRow
                                key={item.providerId}
                                id={item.providerId}
                                name={item.providerName}
                                imageHotel={item.imgIdProviders}
                                description={item.description}
                                address={item.address}
                                providerPhone={item.providerPhone} />
                        ))
                    ) : (
                        <Text>Data is not an array.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}