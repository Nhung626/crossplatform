import { Text, StyleSheet, Button, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'
//import { Logout } from "../services/authService";

export default function UserScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                <Image source={require('../../assets/avatar.png')}
                    style={{ height: 100, width: 100, resizeMode: "center", borderRadius: 100, }} />
                <Text style={{ fontSize: 28, fontWeight: "bold", color: "#000" }}>Nguyễn Thu Huyền</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.fix}>
                    <Ionicons name="person-circle-outline" />
                    <Text>
                        Quản lý tài khoản
                    </Text>

                </View>
                <View>
                    <Ionicons name="person-circle-outline" />
                    <Text>
                        Quản lý tài khoản
                    </Text>

                </View>
                <View>
                    <Ionicons name="person-circle-outline" />
                    <Text>
                        Quản lý tài khoản
                    </Text>

                </View>
                <View>
                    <Ionicons name="person-circle-outline" />
                    <Text>
                        Quản lý tài khoản
                    </Text>

                </View>
                <View>
                    <Ionicons name="person-circle-outline" />
                    <Text>
                        Quản lý tài khoản
                    </Text>

                </View>
                <View>
                    <Ionicons name="person-circle-outline" />
                    <Text>
                        Quản lý tài khoản
                    </Text>

                </View>
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
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        flex: 1,
        flexDirection: 'column',
    }
});