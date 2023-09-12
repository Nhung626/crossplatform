import React, { useState, useEffect } from 'react';
import { View, Text, useColorScheme, StyleSheet, TouchableWithoutFeedback, FlatList, StatusBar, Modal } from 'react-native';
import { Header, SearchBar } from '@rneui/themed'
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/Feather';



const SearchResultScreen = ({ navigation }) => {

    // Dữ liệu mẫu về các phòng khách sạn
    const hotelData = [
        { id: '1', name: 'Hotel A', price: '$100' },
        { id: '2', name: 'Hotel B', price: '$120' },
        { id: '3', name: 'Hotel C', price: '$90' },
        { id: '4', name: 'Hotel A', price: '$100' },
        { id: '5', name: 'Hotel B', price: '$120' },
        { id: '6', name: 'Hotel C', price: '$90' },
        { id: '7', name: 'Hotel A', price: '$100' },
        { id: '8', name: 'Hotel B', price: '$120' },
        { id: '9', name: 'Hotel C', price: '$90' },
        { id: '10', name: 'Hotel A', price: '$100' },
        { id: '11', name: 'Hotel B', price: '$120' },
        { id: '12', name: 'Hotel C', price: '$90' },
        { id: '13', name: 'Hotel A', price: '$100' },
        { id: '14', name: 'Hotel B', price: '$120' },
        { id: '15', name: 'Hotel C', price: '$90' },
        { id: '16', name: 'Hotel A', price: '$100' },
        { id: '17', name: 'Hotel B', price: '$120' },
        { id: '18', name: 'Hotel C', price: '$90' },
        { id: '19', name: 'Hotel A', price: '$100' },
        { id: '20', name: 'Hotel B', price: '$120' },
        { id: '21', name: 'Hotel C', price: '$90' },
        { id: '22', name: 'Hotel A', price: '$100' },
        { id: '23', name: 'Hotel B', price: '$120' },
        { id: '24', name: 'Hotel C', price: '$90' },
        { id: '25', name: 'Hotel A', price: '$100' },
        { id: '26', name: 'Hotel B', price: '$120' },
        { id: '27', name: 'Hotel C', price: '$9000' },
        // Thêm thông tin về các khách sạn khác ở đây
    ];
    const SortData = [
        { id: '1', name: 'Mức phổ biến', checked: false, },
        { id: '2', name: 'Xếp hạng chỗ nghỉ (Thấp đến cao)', checked: false, },
        { id: '3', name: 'Xếp hạng chỗ nghỉ (Cao đến thấp)', checked: false, },
        { id: '4', name: 'Giá (Thấp đến cao)', checked: false, },
        { id: '5', name: 'Giá (Cao đến thấp)', checked: false, },

    ];

    // Hàm render item cho FlatList
    const renderItem = ({ item }) => (
        <View style={styles.hotelItem}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
        </View>
    );
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? '#8ee9ef' : 'white',
    };

    const [sortData, setSortData] = useState(SortData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalSort, setIsModalSort] = useState(false);
    const [isCallBack, setIsCallBack] = useState(false);
    useEffect(() => {
        if (isCallBack) {
            // Thực hiện tác vụ cần khi bạn muốn load lại màn hình ở đây.
            // Ví dụ:
            // navigation.replace('SearchResultScreen'); // Load lại màn hình hiện tại
            // Hoặc navigation.navigate('SearchResultScreen'); // Chuyển đến màn hình SearchResultScreen lại
        }
    }, [isCallBack]);
    const toggleCheckbox = (itemId) => {
        const updatedSortData = sortData.map((item) => {
            if (item.id === itemId) {
                const updatedItem = { ...item, checked: !item.checked };
                return updatedItem;
            }
            return item;
        });
        setSortData(updatedSortData);

        // Kiểm tra xem có checkbox nào có giá trị true hay không
        const hasChecked = updatedSortData.some((item) => item.checked);
        if (!hasChecked) {
            closeModal();
        } else {
            setIsCallBack(!isCallBack); // Khi bạn tích vào checkbox, đặt isCallBack thành true để load lại màn hình
        }
    };








    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const closeModal = () => {
        toggleModalSort(); // Sử dụng hàm toggleModalSort để đóng modal sắp xếp
    };

    const toggleModalSort = () => {
        setIsModalSort(!isModalSort);
    }



    return (
        <View >

            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor="#8ee9ef" // Set the desired color here
            />
            <Header containerStyle={styles.headerContainer} />
            <View style={styles.actionsContainer}>
                <TouchableWithoutFeedback onPress={toggleModalSort}>
                    <View style={styles.actionButton}>
                        <Icon name="list" size={25} />
                        <Text style={styles.textButton}>Sắp xếp</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('SlidersScreen')}>
                    <View style={styles.actionButton}>
                        <Icon name='sliders' size={25} />
                        <Text style={styles.textButton}>Lọc</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('MapScreen')}>

                    <View style={styles.actionButton}>
                        <Icon name='map-pin' size={25} />
                        <Text style={styles.textButton}>Bản đồ</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <TouchableWithoutFeedback onPress={toggleModal}>
                <View style={styles.searchContainer}>
                    <Icon name='arrow-left' size={25} style={{ paddingLeft: 10 }} />
                    <Text style={styles.textButton}>Touch Here! (ô tìm kiếm)</Text>
                </View>
            </TouchableWithoutFeedback>

            {/* Modal Search*/}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>

                    <View style={{ backgroundColor: 'white' }}>
                        <View style={styles.modalContentHeader}>
                            <TouchableWithoutFeedback onPress={toggleModal}>
                                <Icon name="x" size={25} color="black" />
                            </TouchableWithoutFeedback>
                            <View style={styles.mm}>
                                <Text style={styles.modalTitle}>Thay đổi tìm kiếm của bạn</Text>
                            </View>
                        </View>

                        <View style={styles.mauMe}>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalItem}>
                                    <Text>Item 1</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalItem}>
                                    <Text>Item 2</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalItem}>
                                    <Text>Item 3</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalSearch}>
                                    <Text style={{ color: 'white', fontSize: 15 }}>Tìm</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </View>
            </Modal>

            {/* Modal Sắp xếp*/}
            <Modal
                visible={isModalSort}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>

                    <View style={{ backgroundColor: 'white' }}>
                        <View style={styles.modalContentHeader}>
                            <TouchableWithoutFeedback onPress={toggleModalSort}>
                                <Icon name="x" size={25} color="black" />
                            </TouchableWithoutFeedback>
                            <View style={styles.mm}>
                                <Text style={styles.modalTitle}>Sắp xếp theo</Text>
                            </View>
                        </View>
                        <View style={styles.mauMe}>
                            <FlatList
                                data={sortData}
                                renderItem={({ item }) => (
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        padding: 20,
                                        borderWidth: 1,
                                        borderColor: 'pink',
                                    }}>
                                        <Text>{item.name}</Text>
                                        <BouncyCheckbox
                                            value={item.checked}
                                            onValueChange={() => {
                                                closeModal(); // Đảm bảo rằng bạn gọi closeModal sau khi toggleCheckbox

                                                toggleCheckbox(item.id);
                                            }}
                                        />
                                    </View>
                                )}
                                keyExtractor={(item) => item.id}
                            />

                        </View>


                    </View>
                </View>
            </Modal>
            {/* FlatList để hiển thị thông tin về các phòng khách sạn */}
            <View>
                <FlatList
                    data={hotelData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                >

                </FlatList>
            </View>


        </View >

    );
};

const styles = StyleSheet.create({

    headerContainer: {
        backgroundColor: '#8ee9ef', // Màu nền tùy chỉnh
        height: 97, // Kích thước theo yêu cầu
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingVertical: 15,
        position: 'absolute',
        top: 65,
        left: '3%',
        right: '3%',
        borderColor: 'pink',
        borderWidth: 5,
        zIndex: 1000,
    },

    actionsContainer: {
        flexDirection: 'row', // Hiển thị các phần tử theo hàng ngang
        justifyContent: 'space-between', // Căn giữa theo chiều ngang
        paddingHorizontal: '5%', // Khoảng cách giữa các phần tử
        backgroundColor: 'white',
        borderBottomColor: 'pink',
        borderBottomWidth: 2,
        paddingVertical: 10,


    },

    actionButton: {
        flexDirection: 'row', // Hiển thị các phần tử theo hàng ngang
        backgroundColor: 'white',
        marginTop: 40,
        paddingRight: 5,


    },
    textButton: {
        fontSize: 13,
        paddingLeft: 10,
    },

    icon: {
        fontSize: 200,
        color: 'gray',
        top: '15%',
    },
    hotelItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'pink',
    },


    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    modalContentHeader: {
        padding: 20,
        flexDirection: 'row', // Sắp xếp các thành phần ngang hàng
        alignItems: 'center',

    },
    modalTitle: {
        color: 'black',
        fontSize: 18,
        paddingHorizontal: '10%'
    },

    modalItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    modalItemSort: {

    },
    mauMe: {
        borderRadius: 5,
        borderColor: "pink",
        borderWidth: 5,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10,
    },

    modalSearch: {
        padding: 18,
        backgroundColor: '#8ee9ef',
        alignItems: 'center',
    }
});

export default SearchResultScreen;
