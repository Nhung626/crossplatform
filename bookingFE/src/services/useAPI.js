import axios from "axios"
import { addUrlCustomerLogin, addUrlCustomerSignUp, addUrlCustomerUpdate, getCustomerUrl, getImgCustomerUrl } from "./baseUrl"

export const loginApi = (user) => {
    const customerLogin = axios({
        method: "POST",
        url: addUrlCustomerLogin,
        data: user,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return customerLogin
}

export const signUpApi = (user) => {
    const customerSignUp = axios({
        method: "POST",
        url: addUrlCustomerSignUp,
        data: user,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return customerSignUp
}

export const customerUpdateApi = (data, token, id) => {
    // Sử dụng hàm addUrlCustomerUpdate để có URL chứa id
    const customerUpdate = axios({
        method: "POST",
        url: addUrlCustomerUpdate(id),
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
    });
    return customerUpdate;
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