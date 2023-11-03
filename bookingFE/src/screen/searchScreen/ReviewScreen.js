import { View, Text, StatusBar, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColor } from '../../utils/theme'
import * as Icon from 'react-native-feather';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addReview, getCategory, getToken } from '../../services/useAPI';
import ScreenNames from '../../utils/screenNames';


export default function ReviewScreen() {
    const navigation = useNavigation()
    const route = useRoute();
    const { reservarId, providerName, categoryId } = route.params ?? {};
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([
        { star: 1, experience: 'Tệ' },
        { star: 2, experience: 'Không hài lòng' },
        { star: 3, experience: 'Bình thường' },
        { star: 4, experience: 'Hài lòng' },
        { star: 5, experience: 'Rất hài lòng' },
    ]);
    const [imgReviews, setImgReviews] = useState([]);
    const [description, setDescription] = useState("");

    const [nameRoom, setNameRoom] = useState();
    console.log("category id: ", categoryId)
    console.log("reservar review: ", reservarId)
    useEffect(() => {
        const fetchData = async () => {
            const response = await getCategory(categoryId)
            if (response) {
                setNameRoom(response.categoryName)
            }
        }
        fetchData();

    }, [])



    const handlePickImg = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.status !== 'granted') {
            console.log('Permission to access camera denied');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1
        });
        if (result.canceled) {
            console.log('User canceled!');
        } else if (result.error) {
            console.log('ImagePicker Error: ', result.error);
        } else {
            const selectedImage = result.assets.map((asset) => asset.uri);
            if (imgReviews.length + selectedImage.length <= 5) {
                setImgReviews([...imgReviews, ...selectedImage]);
            } else {
                Alert.alert('Số lượng ảnh vượt quá giới hạn (5 ảnh).');
            }
        }
    };


    const handleReview = async () => {
        const token = await getToken();
        console.log("data review truyền vào API: ", imgReviews, defaultRating, description, reservarId, token)
        const response = await addReview(imgReviews, defaultRating, description, reservarId, token)
        if (response) {
            Alert.alert(
                "Đánh giá thành công!",
                null,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setTimeout(() => {
                                navigation.navigate(ScreenNames.HOME);
                            }, 100); // Đợi 100ms trước khi điều hướng
                        },
                    },
                ]
            );
        }

    }
    const handleTakePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.status !== 'granted') {
            console.log('Permission to access camera denied');
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1
        });
        if (result.canceled) {
            console.log('User canceled!');
        } else if (result.error) {
            console.log('ImagePicker Error: ', result.error);
        } else {
            const selectedImage = result.assets.map((asset) => asset.uri);
            if (imgReviews.length + selectedImage.length <= 5) {
                setImgReviews([...imgReviews, ...selectedImage]);
            } else {
                Alert.alert('Số lượng ảnh vượt quá giới hạn (5 ảnh).');
            }
        }
    };
    const handleRemoveImg = (indexToRemove) => {
        const updateImg = [...imgReviews];
        updateImg.splice(indexToRemove, 1);
        setImgReviews(updateImg);
    };





    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingStyle}>
                <View style={{ flexDirection: 'row' }}>
                    {
                        maxRating.map((item, key) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setDefaultRating(item.star)}
                                    key={item.star}
                                >
                                    {/* <Image style={styles.starImgStyle}
                                        source={
                                            item.star <= defaultRating
                                                ? require('../../assets/images/rating/star-filled.png')
                                                : require('../../assets/images/rating/Star-empty.png')

                                        } /> */}
                                    <Icon.Star
                                        stroke={themeColor.bgColor} height={30} width={30} strokeWidth={1}
                                        fill={item.star <= defaultRating
                                            ? themeColor.bgColor
                                            : "white"}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    {
                        maxRating.map((item, key) => {
                            return (

                                <Text
                                    style={styles.experienceStyle}
                                    key={item.star}>
                                    {item.star == defaultRating
                                        ? item.experience
                                        : null}
                                </Text>
                            )
                        })
                    }
                </View>

            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' backgroundColor={themeColor.bgColor} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Đánh giá của bạn</Text>
            </View>
            <ScrollView contentContainerStyle={{
                paddingBottom: 90,
            }}>

                <View style={styles.modalSearchContainer}>
                    <Text style={styles.nameHotel}>{providerName}</Text>
                    <Text style={styles.nameRoom}>{nameRoom}</Text>
                </View>
                <View style={styles.reviewStar}>
                    <Text style={styles.textReview}>Chất lượng sản phẩm</Text>
                    <CustomRatingBar />
                </View>

                <View style={{ padding: 10, justifyContent: 'center', alignItems: "center", flex: 1 }}>
                    {imgReviews[0]
                        ? (
                            <View style={{ alignItems: "center" }}>
                                <ScrollView
                                    horizontal
                                    // pagingEnabled
                                    contentContainerStyle={{ alignItems: 'center' }}>
                                    {imgReviews.map((imgReviews, index) => (
                                        <View key={index} style={styles.imgReviewContainer}>
                                            <ImageBackground source={{ uri: imgReviews }} style={styles.imgReview}>
                                                <TouchableOpacity onPress={() => handleRemoveImg(index)}>
                                                    <Icon.Delete stroke={themeColor.bgColor} height={20} width={20} />
                                                </TouchableOpacity>
                                            </ImageBackground>

                                        </View>
                                    ))}
                                </ScrollView>
                                <View style={{ flexDirection: 'row', columnGap: 5 }}>
                                    <TouchableOpacity
                                        onPress={handlePickImg}
                                        style={styles.imageContainer1}>
                                        <Icon.Image
                                            style={styles.iconCamera}
                                            stroke={themeColor.bgColor} height={40} width={40}
                                            strokeWidth={1.5} />
                                        <Text style={styles.textIma}>Thêm hình ảnh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleTakePhoto}
                                        style={styles.imageContainer1}>
                                        <Icon.Camera
                                            style={styles.iconCamera}
                                            stroke={themeColor.bgColor} height={40} width={40}
                                            strokeWidth={1.5} />
                                        <Text style={styles.textIma}>Chụp ảnh</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        )
                        : (
                            <View style={{ flexDirection: 'row', columnGap: 5 }}>
                                <TouchableOpacity
                                    onPress={handlePickImg}
                                    style={styles.imageContainer2}>
                                    <Icon.Image
                                        style={styles.iconCamera}
                                        stroke={themeColor.bgColor} height={40} width={40}
                                        strokeWidth={1.5} />
                                    <Text style={styles.textIma}>Thêm hình ảnh</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleTakePhoto}
                                    style={styles.imageContainer2}>
                                    <Icon.Camera
                                        style={styles.iconCamera}
                                        stroke={themeColor.bgColor} height={40} width={40}
                                        strokeWidth={1.5} />
                                    <Text style={styles.textIma}>Chụp ảnh</Text>
                                </TouchableOpacity>
                            </View>

                        )}
                </View>

                <View style={styles.note}>
                    <Text style={styles.textNote}>Thêm tối đa 300 ký tự và 5 ảnh</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Hãy chia sẻ nhận xét của bạn về khách sạn hoặc phòng đã đặt!'
                        style={styles.inputReview}
                        multiline={true}
                        numberOfLines={10}
                        value={description}
                        onChangeText={(text) => {
                            if (text.length <= 300) {
                                setDescription(text);
                            }
                        }}
                    >
                    </TextInput>
                    <Text style={{ color: "grey" }}>
                        {description.length == 0
                            ? description.length
                            : description.length - 1}/300
                    </Text>
                </View>

                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={handleReview}
                        style={styles.button}>
                        <Text style={styles.textButton}>Đánh giá</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: themeColor.bgColor,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        flex: 10,
        color: '#fff',
        fontSize: 24,
        marginVertical: 10
    },
    modalSearchContainer: {
        flex: 1,
        marginVertical: 20,
    },
    nameHotel: {
        fontWeight: '400',
        fontSize: 20,
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: "grey",
        paddingHorizontal: 10

    },
    nameRoom: {
        fontWeight: '400',
        fontSize: 18,
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: "grey",
        paddingHorizontal: 10
    },
    reviewStar: {
        flex: 1,
        flexDirection: "row",
        marginHorizontal: 10,
        paddingBottom: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5

    },
    textReview: {
        flexWrap: 'wrap',
        textAlign: 'left',
        width: '30%',
        fontWeight: '500'
    },
    textNote: {
        color: 'grey'
    },
    note: {
        paddingHorizontal: 10,
        paddingTop: 20,
        borderTopWidth: 0.5,
        borderColor: 'grey',
        marginTop: 10
    },
    imageContainer2: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: themeColor.bgColor,
        flex: 1,
        paddingVertical: 10,
    },
    imageContainer1: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: themeColor.bgColor,
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 5,
        width: '30%'
    },
    textIma: {
        color: themeColor.bgColor
    },
    iconCamera: {
        margin: 10
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: themeColor.btColor,
        margin: 5,
        backgroundColor: themeColor.bgModalColor

    },
    inputReview: {
        flexWrap: 'wrap',
        textAlignVertical: 'top',
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: themeColor.bgColor,
        alignItems: 'center',
        borderRadius: 15,

    },
    textButton: {
        color: 'white',
        fontSize: 15
    },
    customRatingStyle: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        columnGap: 10

    },
    starImgStyle: {
        width: 30,
        height: 30,
        resizeMode: 'cover',

    },
    experienceStyle: {
        color: themeColor.bgColor,
        textAlign: 'center',
        fontWeight: '400'
    },
    imgReviewContainer: {
        margin: 5,
    },
    imgReview: {
        width: 100, height: 100
    }




})