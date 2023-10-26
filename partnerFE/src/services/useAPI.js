import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL,postCheckinUrl,postCheckoutUrl,postCancelUrl,
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

export const providerAddRoom = async (
    token,
    imgCategories,
    categoryName,
    person,
    area,
    description,
    roomNumbers,
    bedType) => {

    const formData = new FormData();

     imgCategories.forEach((img, index) => {
      console.log(img);
      formData.append('imgCategories[]', {
        uri: img,
        type: 'image/png',
        name: `image_${index}.png`,
      });
    });
    // formData.append('imgCategories',imgCategories);
    formData.append('categoryName', categoryName);
    formData.append('person', person);
    formData.append('area', area);
    formData.append('description', description);
    formData.append('roomNumbers', roomNumbers);
    formData.append('bedType', bedType);
    console.log("formData nè", formData)

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
            console.log("lưu thành công!")
            return response
        }
    } catch (error) {
        console.log('Error response data:', error.response.data); // Thêm dòng này
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


export const postCheckout = async(reservarId,token) => {
    const getCategory = axios({
        method: "POST",
        url: postCheckoutUrl,
        params:{reservarId:reservarId},
        headers: {
            
            Authorization: `Bearer ${token}`
        },
    });
    return getCategory;
};

export const postCancel = async( reservarId,token) => {
    try{
       const response = await axios({
      method: 'POST',
      url: postCancelUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response: ",response)
    if(response.status===200){
        return response;
    }
    } catch(error){
        console.log("Lỗi: ", error)
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

