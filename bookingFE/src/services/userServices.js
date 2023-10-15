import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios';
import moment from 'moment';
export const updateCustomer = (
    token,
    id,
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
            uri: image.uri,
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
    try {
        const response = axios({
            method: "POST",
            url: `${BASE_URL}customer/update/${id}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response
        }
    }
    catch (error) {
        console.log(error);
        return null
    }
}