export const categories = [
    {
        id: 1,
        name: 'Phổ biến nhất',
        image: require('../assets/images/pizzaIcon.png'),
    },
    {
        id: 2,
        name: 'Giá thấp nhất',
        image: require('../assets/images/pizzaIcon.png'),
    },
    {
        id: 3,
        name: 'Giá cao nhất',
        image: require('../assets/images/pizzaIcon.png'),
    },
    {
        id: 4,
        name: 'Xếp hạng cao nhất',
        image: require('../assets/images/pizzaIcon.png'),
    },

    {
        id: 5,
        name: 'Xếp hạng thấp nhất',
        image: require('../assets/images/pizzaIcon.png'),
    },
    {
        id: 6,
        name: 'Gần nhất',
        image: require('../assets/images/pizzaIcon.png'),
    },
]

export const filterCategory = [
    {
        id: 1,
        title: 'Xếp hạng chỗ nghỉ',
        categories: [
            {
                id: 1,
                filter: 'Không xếp hạng'
            },
            {
                id: 2,
                filter: '1 sao'
            },
            {
                id: 3,
                filter: '2 sao'
            },
            {
                id: 4,
                filter: '3 sao'
            },
            {
                id: 5,
                filter: '4 sao'
            },
            {
                id: 6,
                filter: '5 sao'
            },

        ]
    },
    {
        id: 2,
        title: 'Số phòng ngủ',
        categories: [
            {
                id: 1,
                filter: '1 phòng hoặc nhiều hơn'
            },
            {
                id: 2,
                filter: '2 phòng hoặc nhiều hơn'
            },
            {
                id: 3,
                filter: '3 phòng hoặc nhiều hơn'
            },
            {
                id: 4,
                filter: '4 phòng hoặc nhiều hơn'
            }
        ]
    },
    {
        id: 3,
        title: 'Điểm đánh giá',
        categories: [
            {
                id: 1,
                filter: 'Tàm tạm: 5 điểm trở lên'
            },
            {
                id: 2,
                filter: 'Dễ chịu: 6 điểm trở lên'
            },
            {
                id: 3,
                filter: 'Tốt: 7 điểm trở lên'
            },
            {
                id: 4,
                filter: 'Rất tốt: 8 điểm trở lên'
            },
            {
                id: 5,
                filter: 'Tuyệt hảo: 9 điểm trở lên'
            }
        ]
    }
]
export const featured = [
    {
        id: 1,
        name: 'Royal Penthouse Duplex Nguyễn Xiển',
        imageHotel: require('../assets/images/hotelImages/hotels/hotel6.png'),
        imageStar: require('../assets/images/fullStar.png'),
        location: 'Quận Thanh Xuân - cách trung tâm 7km',
        description: 'Căn Hộ 3 Phòng Ngủ: ',
        address: '434 second street',
        reviewPoint: 10,
        reviews: 5,
        stars: 5,
        lng: 105.84369620566989,
        lat: 21.003473736700617,

        hotelsData: [
            {
                id: 1,
                name: 'HUCE Howard',
                image: require('../assets/images/hotelImages/hotels/rooms/room1.png'),
                description: 'Hot and spicy pizzas',
                lng: 105.84369620566989,
                lat: 21.003473736700617,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            },
            {
                id: 2,
                name: 'Papa Johns',
                image: require('../assets/images/hotelImages/hotels/rooms/room2.png'),
                description: 'Hot and spicy pizzas',
                lng: -85.5324269,
                lat: 38.2145602,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            },
            {
                id: 3,
                name: 'Papa Johns',
                image: require('../assets/images/hotelImages/hotels/rooms/room3.png'),
                description: 'Hot and spicy pizzas',
                lng: -85.5324269,
                lat: 38.2145602,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            }
        ]
    },
    {
        id: 2,
        name: 'Royal Penthouse Duplex Giải Phóng',
        imageHotel: require('../assets/images/hotelImages/hotels/hotel2.png'),
        imageStar: require('../assets/images/fullStar.png'),
        location: 'Quận Thanh Xuân - cách trung tâm 7km',
        description: 'Căn Hộ 3 Phòng Ngủ: ',
        address: '434 second street',
        reviewPoint: 10,
        reviews: 5,
        stars: 5,

        hotelsData: [
            {
                id: 1,
                name: 'HUCE Howard',
                image: require('../assets/images/hotelImages/hotels/rooms/room1.png'),
                description: 'Hot and spicy pizzas',
                lng: 105.84369620566989,
                lat: 21.003473736700617,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            },
            {
                id: 2,
                name: 'Papa Johns',
                image: require('../assets/images/hotelImages/hotels/rooms/room2.png'),
                description: 'Hot and spicy pizzas',
                lng: -85.5324269,
                lat: 38.2145602,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            },
            {
                id: 3,
                name: 'Papa Johns',
                image: require('../assets/images/hotelImages/hotels/rooms/room3.png'),
                description: 'Hot and spicy pizzas',
                lng: -85.5324269,
                lat: 38.2145602,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            }
        ]
    },
    {
        id: 3,
        name: 'Royal Penthouse Duplex Giải Phóng',
        imageHotel: require('../assets/images/hotelImages/hotels/hotel3.png'),
        imageStar: require('../assets/images/fullStar.png'),
        location: 'Quận Thanh Xuân - cách trung tâm 7km',
        description: 'Căn Hộ 3 Phòng Ngủ: ',
        address: '434 second street',
        reviewPoint: 10,
        reviews: 5,
        stars: 5,

        hotelsData: [
            {
                id: 1,
                name: 'HUCE Howard',
                image: require('../assets/images/hotelImages/hotels/rooms/room1.png'),
                description: 'Hot and spicy pizzas',
                lng: 105.84369620566989,
                lat: 21.003473736700617,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            },
            {
                id: 2,
                name: 'Papa Johns',
                image: require('../assets/images/hotelImages/hotels/rooms/room2.png'),
                description: 'Hot and spicy pizzas',
                lng: -85.5324269,
                lat: 38.2145602,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            },
            {
                id: 3,
                name: 'Papa Johns',
                image: require('../assets/images/hotelImages/hotels/rooms/room3.png'),
                description: 'Hot and spicy pizzas',
                lng: -85.5324269,
                lat: 38.2145602,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            }
        ]
    },
    {
        id: 4,
        name: 'Royal Penthouse Duplex Giải Phóng',
        imageHotel: require('../assets/images/hotelImages/hotels/hotel4.png'),
        imageStar: require('../assets/images/fullStar.png'),
        location: 'Quận Thanh Xuân - cách trung tâm 7km',
        description: 'Căn Hộ 3 Phòng Ngủ: ',
        address: '434 second street',
        reviewPoint: 10,
        reviews: 5,
        stars: 5,

        hotelsData: [
            {
                id: 1,
                name: 'HUCE Howard',
                image: require('../assets/images/hotelImages/hotels/rooms/room1.png'),
                description: 'Hot and spicy pizzas',
                lng: 105.84369620566989,
                lat: 21.003473736700617,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            },
            {
                id: 2,
                name: 'Papa Johns',
                image: require('../assets/images/hotelImages/hotels/rooms/room2.png'),
                description: 'Hot and spicy pizzas',
                lng: -85.5324269,
                lat: 38.2145602,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            },
            {
                id: 3,
                name: 'Papa Johns',
                image: require('../assets/images/hotelImages/hotels/rooms/room3.png'),
                description: 'Hot and spicy pizzas',
                lng: -85.5324269,
                lat: 38.2145602,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                prices: 10,
            }
        ]
    },
]
