import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios';
import moment from 'moment';
import { BASE_URL } from './baseUrl';


export const updateCustomer = async (
    token,
    image,
    fullName,
    gender,
    phoneNumber,
    address,
    customerCode,
    dateOfBirth) => {
    const formData = new FormData();
    if (image) {
        formData.append('avatar', {
            uri: image,
            type: 'image/png',
            name: 'avatar.png',
        });
    }
    formData.append('fullName', fullName);
    formData.append('gender', gender);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('customerCode', customerCode);
    formData.append('dateOfBirth', moment(dateOfBirth).format('YYYY-MM-DD'));
    console.log("formData nè", formData)

    try {
        //const token = getToken()
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}customer/update`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            console.log("đăng ký thành công!")
            return response
        }
    }
    catch (error) {
        console.log(error);
        return null
    }
}

