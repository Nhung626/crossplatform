import { Text, StyleSheet, Button, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'
import { getCustomerApi, getImgCustomerApi } from "../../services/useAPI";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getImgCustomerUrl } from "../../services/baseUrl";
//import { Logout } from "../services/authService";

export default function UserScreen({ navigation, route }) {
    const [fullName, setFullName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const { token, id } = route.params ?? {};

    console.log(id)
    const fetchData = async () => {
        try {
            const response = await getCustomerApi(token, id);
            if (response.status === 200) {
                console.log('ok')
                setFullName(response.data.fullName);
                console.log(response.data.avatarId)
                setImageUrl(getImgCustomerUrl.concat(`?imageId=${response.data.avatarId}`))
            } else {
                console.error('Request was not successful:', response.status);
            }

        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
    };
    fetchData();


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: imageUrl }}
                    style={{ height: 180, width: 180, resizeMode: "center", borderRadius: 100, }} />
                <Text style={{ fontSize: 28, fontWeight: "bold", color: "#fff", marginTop: 10, }}>{fullName}</Text>
            </View>

            <View style={styles.body}>
                <ScrollView style={styles.scroll}>
                    <TouchableOpacity>
                        <View style={styles.fix}>
                            <Ionicons style={styles.icon} name="person-circle-outline" />
                            <Text style={styles.Text}>
                                Quản lý tài khoản
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.fix}>
                            <Ionicons style={styles.icon} name="earth-outline" />
                            <Text style={styles.Text}>
                                Chuyến đi của tôi
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.fix}>
                            <Ionicons style={styles.icon} name="card-outline" />
                            <Text style={styles.Text}>
                                Tài khoản liên kết
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.fix}>
                            <Ionicons style={styles.icon} name="star-outline" />
                            <Text style={styles.Text}>
                                Đánh giá của bạn
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('SaveScreen')}>
                        <View style={styles.fix}>
                            <Ionicons style={styles.icon} name="heart-circle-outline" />
                            <Text style={styles.Text}>
                                Đã lưu
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.fix}>
                            <Ionicons style={styles.icon} name="log-out-outline" />
                            <Text style={styles.Text}>
                                Đăng xuất
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#29b4ca',
        height: '35%',
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    scroll: {
        backgroundColor: '#fff',
        width: '100%',
    },
    fix: {
        marginTop: 20,
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center',
    },
    icon: {
        fontSize: 28,
        marginRight: 15,
    },
    Text: {
        fontSize: 20,
        color: '#111',
    }
});