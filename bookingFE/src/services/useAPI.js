import axios from "axios"
import {
    BASE_URL,
    getCustomerUrl,
    getImgCustomerUrl
} from "./baseUrl"
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export const loginApi = async (email, password) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${BASE_URL}customer/auth/login`,
            data: { email, password },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const token = response.data.token;
            const id = response.data.id
            saveToken({ token, id });
            return response;
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error.response);
        throw error;
    }
}

export const saveToken = async ({ token, id }) => {
    try {
        const idString = id ? id.toString() : "";

        await AsyncStorage.setItem("token", token ? token : "");
        await AsyncStorage.setItem("id", idString);
        console.log('đã lưu token vào AsyncStorage!', token)
    } catch (error) {
        console.log(error.response)
        console.error('Lỗi khi lưu trữ token vào Async Storage: ', error)
    }
}
export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        console.log(" get được nè: ", token)
        return token;
    } catch (error) {
        console.error("Lỗi khi truy xuất token:", error);
        return null;
    }
};
export const getIdCustm = async () => {
    try {
        const idCustm = await AsyncStorage.getItem("id");
        return idCustm;
    } catch (error) {
        console.error("Lỗi khi truy xuất token:", error);
        return null;
    }
};


// signUpApi function
export const signUpApi = async (email, password) => {
    try {

        const response = await axios({
            method: "POST",
            url: `${BASE_URL}customer/auth/sign-up`,
            data: { email, password },
            headers: {
                'Content-Type': 'application/json'
            },
        });

        console.log(email, password);

        if (response.status === 200) {
            loginApi(email, password)
            return true;
        } else {
            // Nếu không phải status 200, in ra lỗi và trả về null hoặc một giá trị phản hồi khác
            console.error("Unexpected response status:", response.status);
            return null;
        }
    } catch (error) {
        console.error("Error during sign up:", error);
        // Trả về một giá trị phản hồi nếu có lỗi
        return null;
    }
};


export const Logout = async () => {
    try {
        await AsyncStorage.removeItem("token");
        console.log("đã xóa token")
    } catch (error) {
        console.error("Lỗi khi xóa token:", error);
    }
};



export const getCustomerApi = async (token) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}customer/get-customer`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        );
        if (response.status === 200) {
            return response
        }
    }
    catch (error) {
        console.log(error);
        return null
    }

};
export const getImgCustomerApi = (token, id) => {
    // const formData = new FormData();
    // formData.append('imageId', id);
    const getImg = axios({
        method: "GET",
        url: getImgCustomerUrl.concat(`?imageId=${id}`),
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return getImg
}

export const saveDayBooking = async ({ start, end, person }) => {
    try {
        await AsyncStorage.setItem("person", person ? person.toString() : "")
        await AsyncStorage.setItem("start", start ? start : "");
        await AsyncStorage.setItem("end", end ? end : "");

        console.log('đã lưu ngày book phòng vào AsyncStorage!', start, end, person)
    } catch (error) {
        console.log(error.response)
        console.error('Lỗi khi lưu trữ token vào Async Storage: ', error)
    }
}
export const searchAPI = async (start, end, person, token) => {
    try {
        const response = await axios.get(`${BASE_URL}customer/search-provider`, {
            params: {
                start: moment(start).format('YYYY-MM-DD'),
                end: moment(end).format('YYYY-MM-DD'),
                person: parseInt(person),
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            saveDayBooking({ start, end, person })
            console.log('Data from API:', response.data);
            return response.data;
        } else {
            console.log('Error status:', response.status);
        }
    } catch (error) {
        if (error.response) {
            console.log('Response data:', error.response.data);
        }
        console.error(error);
    }
};
export const getAllRoomAPI = async (id, start, end, person, token) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}customer/search-category`,
            params: {
                start: moment(start).format('YYYY-MM-DD'),
                end: moment(end).format('YYYY-MM-DD'),
                person: parseInt(person),
                providerId: parseInt(id)
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error status: ", response.error)
        }
    }
    catch (error) {
        console.log(error);
        return null
    }

}

export const addFavoriteAPI = async (id, token) => {
    const formData = new FormData();
    formData.append('providerId', id);
    try {
        const response = await axios({
            method: 'POST',
            url: `${BASE_URL}customer/add-favorite`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            console.log("Thêm vào yêu thích!")
            return response
        }
    }
    catch (error) {
        console.log(error);
        return null
    }
}

export const deleteFavorite = async (id, token)=>{

}