import axios from "axios"
import {
    BASE_URL,
    addUrlCustomerSignUp,
    addUrlCustomerUpdate,
    getAllProviderUrl,
    getCategoryUrl,
    getCustomerUrl,
    getImgCustomerUrl
} from "./baseUrl"
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        // console.log('đã lưu token vào AsyncStorage!')
    } catch (error) {
        console.log(error.response)
        console.error('Lỗi khi lưu trữ token vào Async Storage: ', error)
    }
}
export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        console.log(token)
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
        const userType = 2;

        const response = await axios({
            method: "POST",
            url: `${BASE_URL}customer/auth/sign-up`,
            data: { email, password, userType },
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
    } catch (error) {
        console.error("Lỗi khi xóa token:", error);
    }
};



export const getCustomerApi = (token, id) => {
    // Sử dụng hàm addUrlCustomerUpdate để có URL chứa id
    const getCustomer = axios({
        method: "GET",
        url: getCustomerUrl(id),
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return getCustomer;
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

export const getAllProviderAPI = () => {
    const getAll = axios({
        method: 'GET',
        url: getAllProviderUrl,
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUcWxpbmgzMDUwMkBnbWFpbC5jb20iLCJpYXQiOjE2OTcxNjI4MzIsImV4cCI6MTY5NzI0OTIzMn0.ieqJmgyR2Lbw69xTKVlG28j_wE6hboXFc-DriDftLnc"
        },
    })
    return getAll
}
export const getAllCategoryAPI = (id) => {
    const getAll = axios({
        method: 'GET',
        url: getCategoryUrl(id),
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUcWxpbmgzMDUwMkBnbWFpbC5jb20iLCJpYXQiOjE2OTcxNjI4MzIsImV4cCI6MTY5NzI0OTIzMn0.ieqJmgyR2Lbw69xTKVlG28j_wE6hboXFc-DriDftLnc"
        },
    })
    return getAll
}

