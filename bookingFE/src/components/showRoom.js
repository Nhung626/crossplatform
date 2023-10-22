import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import { getImgCustomerUrl } from '../services/baseUrl';
import { Ionicons } from '@expo/vector-icons';
import { themeColor } from '../utils/theme';

export default function ShowRoom({
    id,
    name,
    imageRoom,
    description,
    price,
    person,
    area,
    bedType,
    roomNumber,
}) {
    const navigation = useNavigation();
    const [containerWidth, setContainerWidth] = useState(0);

    const onContainerLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
    };
    const handleSelectButtonPress = () => {
        navigation.navigate('PaymentScreen', {
            id,
            name,
            imageRoom,
            description,
            price,
            person,
            area,
            bedType,
            roomNumber,
        });
    };
    return (
        <View style={styles.container}>
            <View style={styles.boxImage} onLayout={onContainerLayout}>
                <ScrollView horizontal pagingEnabled>
                    {imageRoom.map((imageId, index) => (
                        <Image
                            key={index}
                            style={{
                                width: containerWidth, // Lấy width của thẻ chứa hình ảnh
                                height: 200,
                                resizeMode: 'cover',
                                borderRadius: 20,
                            }}
                            source={{ uri: `${getImgCustomerUrl}?imageId=${imageId}` }}
                        />
                    ))}
                </ScrollView>
            </View>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('InfoRoom', {
                        id,
                        name,
                        imageRoom,
                        description,
                        price,
                        person,
                        area,
                        bedType,
                        roomNumber,
                    })
                }>

                <View style={styles.boxStyle}>
                    <View style={styles.boxInfo}>
                        <View>
                            <Text style={styles.nameRoom}>{name}</Text>
                            <View style={styles.viewInfo}>
                                <Text>Diện tích: {area} m²</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Icon.Users stroke={'grey'} height={20} width={20} />
                                <Text>{person} khách/phòng</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Ionicons name="bed-outline" size={20} color="grey" />
                                <Text>{bedType}</Text>
                            </View>
                            <Text style={styles.textPrice}>VND {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                            <Text style={styles.textRoomNight}>/phòng/đêm</Text>
                            <View style={{ paddingVertical: 5, alignItems: 'flex-end' }}>

                                <TouchableOpacity
                                    style={styles.select}
                                    onPress={handleSelectButtonPress}>
                                    <Text style={{ color: '#fff' }}>Chọn</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
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
        margin: 10
    },
    boxInfo: {
        flex: 1,
        paddingHorizontal: 10,
    },
    nameRoom: {
        fontWeight: 'bold',
        fontSize: 18,
        flexWrap: 'wrap',
        borderBottomWidth: 0.6,
        borderBottomColor: 'grey',
        paddingBottom: 10,
    },
    viewInfo: {
        flexDirection: 'row',
        columnGap: 10,
        marginVertical: 5,
    },
    textPrice: {
        color: themeColor.bgColor,
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'right',
    },
    textRoomNight: {
        color: 'grey',
        fontSize: 12,
        textAlign: 'right',
        paddingBottom: 10,
    },
    select: {
        width: 80,
        padding: 8,
        backgroundColor: themeColor.bgColor,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'flex-end',
    },
    boxImage: {
        overflow: 'hidden',
        borderRadius: 20,
        margin: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, // Cho Android
    },
});
