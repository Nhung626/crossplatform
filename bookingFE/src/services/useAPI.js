import axios from "axios"
import { addUrlCustomerLogin, addUrlCustomerSignUp, addUrlCustomerUpdate } from "./baseUrl"

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
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
    return customerUpdate;
};