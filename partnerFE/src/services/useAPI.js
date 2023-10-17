import axios from "axios"
import { addUrlProviderLogin,getCategoryUrl, addUrlProviderSignUp,addUrlProviderAddRoom, addUrlProviderUpdate, getProviderUrl, getImgProviderUrl } from "./baseUrl"

export const loginApi = (user) => {
    const providerLogin = axios({
        method: "POST",
        url: addUrlProviderLogin,
        data: user,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return providerLogin
}

export const signUpApi = (user) => {
    const providerSignUp = axios({
        method: "POST",
        url: addUrlProviderSignUp,
        data: user,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return providerSignUp
}

export const providerUpdateApi = (data, token) => {
    const providerUpdate = axios({
        method: "POST",
        url: addUrlProviderUpdate,
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
    });
    return providerUpdate;
};

export const providerAddRoom = (data, token) => {
    const providerRoom = axios({
        method: "POST",
        url: addUrlProviderAddRoom,
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
    });
    return providerRoom;
};


export const getProviderApi = (token) => {
    const getProvider = axios({
        method: "GET",
        url: getProviderUrl,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return getProvider;
};

export const getCategoryApi= (token) => {
    const getCategory = axios({
        method: "GET",
        url: getCategoryUrl,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return getCategory;
};

export const getImgProviderApi = (token) => {
    // const formData = new FormData();
    // formData.append('imageId', id);
    const getImg = axios({
        method: "GET",
        url: getImgProviderUrl.concat(`?imageId=`),
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return getImg
}