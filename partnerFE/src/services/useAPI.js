import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL,postCheckinUrl,postCheckoutUrl,postCancelUrl,updateCategoryUrl,
    getBookerUrl,getCheckinUrl,getCheckoutUrl,getCancelUrl,getReviewUrl, addUrlProviderLogin,getImgRoomUrl,getCategoryUrl, addUrlProviderSignUp,addUrlProviderAddRoom, addUrlProviderUpdate, getProviderUrl, getImgProviderUrl } from "./baseUrl"

export const loginApi = async (email, password) => {
        try {
            const response = await axios({
                method: 'POST',
                url: addUrlProviderLogin,
                data: { email, password },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                const token = response.data.token;
                saveToken({ token });
                return response;
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error.response);
            throw error;
        }
    }

export const saveToken = async ({ token }) => {
        try {   
            await AsyncStorage.setItem("token", token ? token : "");
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


export const signUpApi = async (email, password) => {
        try {
    
            const response = await axios({
                method: "POST",
                url: addUrlProviderSignUp,
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

    export const providerUpdateApi = async (
        token,
        imgProviders,
        providerName,
        providerPhone,
        address,
        description  
    ) => {
    
        const formData = new FormData();
    
        imgProviders.forEach((img, index) => {
            formData.append('imgProviders', {
                uri: img,
                type: 'image/png',
                name: `image_${index}.png`,
            });
        });
        
        formData.append('providerName', providerName);
        formData.append('providerPhone', providerPhone);
        formData.append('address', address);
        formData.append('description', description);
        console.log("formData nè", formData);
        // console.log("imgCategories:", imgCategories);
    
        try {
            const response = await axios({
                method: "POST",
                url: addUrlProviderUpdate,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                
                console.log("lưu thành công!");
                return response;
            }
        } catch (error) {
            console.log('Error response data:', error.response.data);
            console.log(error);
            return null;
        }
    }

export const providerAddRoom = async (
    token,
    imgCategories,
    categoryName,
    person,
    area,
    bedType,
    roomNumbers,
    description,
    price
) => {

    const formData = new FormData();

    imgCategories.forEach((img, index) => {
        formData.append('imgCategories', {
            uri: img, // Điều này không đúng, hãy chỉ đính kèm URI
            type: 'image/png',
            name: `image_${index}.png`,
        });
    });
    
    formData.append('categoryName', categoryName);
    formData.append('person', person);
    formData.append('area', area);
    formData.append('bedType', bedType);
    formData.append('roomNumbers', roomNumbers);
    formData.append('description', description);     
    formData.append('price', price);
    console.log("formData nè", formData);
    // console.log("imgCategories:", imgCategories);

    try {
        const response = await axios({
            method: "POST",
            url: addUrlProviderAddRoom,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            
            console.log("lưu thành công!");
            return response;
        }
    } catch (error) {
        console.log('Error response data:', error.response.data);
        console.log(error);
        return null;
    }
}

export const updateRoom = async (
    token,
    categoryId,
    imgCategories,
    categoryName,
    person,
    area,
    bedType,
    description,
    price,
    roomNumbers  
        ) => {

    const formData = new FormData();

    if (imgCategories && Array.isArray(imgCategories)) {
    imgCategories.forEach((img, index) => {
        if (img) {
        formData.append('imgCategories', {
            uri: img,
            type: 'image/png',
            name: `image_${index}.png`,
        });
        }
    });
    } else {
    console.error('imgCategories is not an array or is undefined');
    }

    

    formData.append('categoryId', categoryId.toString());
    formData.append('categoryName', categoryName);
    formData.append('person', person);
    formData.append('area', area);
    formData.append('bedType', bedType);
    formData.append('roomNumbers', roomNumbers);
    formData.append('description', description);     
    formData.append('price', price);

    console.log("formData nè", formData);
    // console.log("2222:", price);

    try {
        const response = await axios({
            method: "POST",
            url: updateCategoryUrl(categoryId),
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            
            console.log("lưu thành công!");
            return response;
        }
    } catch (error) {
        console.log('Error response data:', error.response.data);
        console.log(error);
        return null;
    }
}


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
        url: `${BASE_URL}provider/get-categories`,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return getCategory;
};

export const getImgProviderApi = (token,imageId) => {
    const formData = new FormData();
    formData.append('imageId', imageId);
    const getImg = axios({
        method: "GET",
        url: getImgProviderUrl.concat(`?imageId=${imageId}`),
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return getImg
}

export const getImgRoomApi = (token,imageId) => {
    const formData = new FormData();
    formData.append('imageId', imageId);
    const getImg = axios({
        method: "GET",
        url: getImgRoomUrl.concat(`?imageId=${imageId}`),
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return getImg
}

export const getBooked = (token) => {
    const getCategory = axios({
        
        method: "GET",
        url: getBookerUrl,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return getCategory;
};

export const getCheckin = (token) => {
    const getCategory = axios({
        method: "GET",
        url: getCheckinUrl,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return getCategory;
};

export const postCheckin = async(reservarId, token ) => {
    try {
        const response = await axios({
            method: 'POST',
            url: postCheckinUrl(reservarId),
            params: { reservarId:reservarId, token:token },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("response: ", response);

        if (response.status === 200) {
            return response;
        } else {
            // Xử lý lỗi và ném ra một ngoại lệ
            throw new Error(`Failed to check in. Status code: ${response.status}`);
        }
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error; // Ném ngoại lệ để thông báo lỗi đến người gọi hàm
    }
};


export const postCheckout = async(reservarId, token ) => {
    try {
        const response = await axios({
            method: 'POST',
            url: postCheckoutUrl(reservarId),
            params: { reservarId:reservarId, token:token },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("response: ", response);

        if (response.status === 200) {
            return response;
        } else {
            // Xử lý lỗi và ném ra một ngoại lệ
            throw new Error(`Failed to check out. Status code: ${response.status}`);
        }
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error; // Ném ngoại lệ để thông báo lỗi đến người gọi hàm
    }
};

export const postCancel = async(reservarId, token ) => {
    try {
        const response = await axios({
            method: 'POST',
            url: postCancelUrl(reservarId),
            params: { reservarId:reservarId, token:token },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("response: ", response);

        if (response.status === 200) {
            return response;
        } else {
            // Xử lý lỗi và ném ra một ngoại lệ
            throw new Error(`Failed to cancel. Status code: ${response.status}`);
        }
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error; // Ném ngoại lệ để thông báo lỗi đến người gọi hàm
    }
};

  
  
export const getCheckout = (token) => {
    const getCategory = axios({
        method: "GET",
        url: getCheckoutUrl,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return getCategory;
};

export const getCancel = (token) => {
    const getCategory = axios({
        method: "GET",
        url: getCancelUrl,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return getCategory;
};
export const getReview = (token) => {
    const getCategory = axios({
        method: "GET",
        url: getReviewUrl,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return getCategory;
};

