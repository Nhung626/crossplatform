import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { themeColor } from '../utils/theme'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { getImgCustomerUrl } from '../services/baseUrl';



export default function ShowHotel({
    id,
    name,
    imageHotel,
    description,
    address,
    providerPhone,
    start, end, person, token
}) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Hotel', {
                id,
                name,
                imageHotel,
                description,
                address,
                providerPhone,
                start, end, person, token
            })} >
                <View style={styles.boxStyle}>
                    <View style={{ alignItems: 'center', marginRight: 4 }}>
                        <Image style={{ width: 144, height: 256, borderRadius: 30 }} source={{ uri: getImgCustomerUrl.concat(`?imageId=${imageHotel[0]}`) }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ rowGap: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, flexWrap: 'wrap' }}>{name}</Text>
                            <View style={styles.boxText}>
                                <Icon.Info color={'gray'} width={15} height={15} />
                                <Text style={styles.textInfo}>{description}</Text>

                            </View>

                            <View style={styles.boxText}>
                                <Icon.Phone color={'gray'} width={15} height={15} />
                                <Text style={styles.textInfo}>{providerPhone}</Text>

                            </View>
                            <View style={styles.boxText}>
                                <Icon.MapPin color='gray' width={15} height={15} />
                                <Text style={styles.textInfo}>{address}</Text>
                            </View>
                        </View>
                    </View>

                </View>

            </TouchableOpacity>
        </View>




    )
}
const styles = StyleSheet.create({
    container: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, // Cho Android
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 10,
    },
    boxStyle: {
        margin: 10,
        flexDirection: "row"
    },
    boxText: {
        flex: 1,
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
    },
    textInfo: {
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'left'
    },

});