import axios from "axios"
import {
    BASE_URL,
    getImgCustomerUrl
} from "./baseUrl"
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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
        // console.log(" get được nè: ", token)
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

        // console.log(email, password);

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



export const getCustomerApi = async () => {
    const token = await getToken();
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
            return response.data
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
export const getStartBooking = async () => {
    try {
        const start = AsyncStorage.getItem("start");
        return start
    } catch (error) {
        console.log(error);
    }
}
export const getEndBooking = async () => {
    try {
        const end = AsyncStorage.getItem("end");
        return end
    } catch (error) {
        console.log(error);
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
            // console.log('Data from API:', response.data);
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
// Lưu giá trị vào AsyncStorage
export const saveNight = async (night) => {
    try {
        await AsyncStorage.setItem('night', night.toString());
        console.log('Đã lưu số đêm AsyncStorage.');
    } catch (error) {
        console.error('Lỗi khi lưu vào AsyncStorage: ', error);
    }
};
export const getNight = async () => {
    try {
        const night = await AsyncStorage.getItem('night');
        // console.log("số đêm: ", night);
        if (night) {
            return night
        }
    } catch (error) {
        console.log(error);
    }
}
export const saveFavor = async ({ id }) => {
    try {
        // Bước 1: Lấy danh sách idProvider hiện tại từ AsyncStorage
        const currentIds = await AsyncStorage.getItem("idProvider");
        let idArray = [];

        if (currentIds) {
            // Nếu danh sách idProvider đã tồn tại, chuyển nó từ chuỗi JSON thành mảng
            idArray = JSON.parse(currentIds);
        }
        // Bước 2: Thêm id mới vào danh sách
        if (id) {
            idArray.push(id);
        }

        // Bước 3: Cập nhật danh sách mới vào AsyncStorage dưới dạng chuỗi JSON
        await AsyncStorage.setItem("idProvider", JSON.stringify(idArray));
        console.log('Đã lưu id favorite vào AsyncStorage!', idArray);
    } catch (error) {
        console.error('Lỗi khi lưu trữ danh sách id vào AsyncStorage: ', error);
    }
}

export const getIdFavor = async (idToCheck) => {
    try {
        const favor = await AsyncStorage.getItem("idProvider");
        if (favor) {
            const idArray = JSON.parse(favor);
            const isIdInFavor = idArray.includes(idToCheck);
            return isIdInFavor;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Lỗi khi truy xuất favor:", error);
        return false;
    }
};

export const delIdFavor = async (id) => {
    try {
        // Bước 1: Lấy danh sách idProvider hiện tại từ AsyncStorage
        const currentIds = await AsyncStorage.getItem("idProvider");
        let idArray = [];
        if (currentIds) {
            // Nếu danh sách idProvider đã tồn tại, chuyển nó từ chuỗi JSON thành mảng
            idArray = JSON.parse(currentIds);
            // Bước 2: Tìm và xóa ID cụ thể khỏi mảng
            const index = idArray.indexOf(id);
            if (index > -1) {
                idArray.splice(index, 1);
            }

            // Bước 3: Cập nhật danh sách mới vào AsyncStorage dưới dạng chuỗi JSON
            await AsyncStorage.setItem("idProvider", JSON.stringify(idArray));
            // console.log("danh sách yue thích: ", idArray)
        }
    } catch (error) {
        console.error('Lỗi khi xóa ID khỏi danh sách idProvider: ', error);
    }
};
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
            saveFavor({ id })
            console.log("Thêm vào yêu thích!")
            return response
        }
    }
    catch (error) {
        console.log(error);
        return null
    }
}

export const deleteFavorite = async (id, token) => {
    const formData = new FormData();
    formData.append('providerId', id);
    try {
        const response = await axios({
            method: 'DELETE',
            url: `${BASE_URL}customer/del-favorite`,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            console.log("Đã xóa khỏi yêu thích!", id);
            delIdFavor(id)
            return null
        }
    } catch (error) {
        console.log(error);
        return null
    }
}

export const getFavorite = async (token) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${BASE_URL}customer/list-favorite`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return null
    }
}

export const saveCategory = async (dataRoom) => {
    try {
        const categoryString = JSON.stringify(dataRoom);
        await AsyncStorage.setItem('category', categoryString);
        console.log('Đã lưu category vào AsyncStorage:', dataRoom);
    } catch (error) {
        console.error('Lỗi khi lưu category vào AsyncStorage:', error);
    }
};

export const getCategory = async () => {
    try {
        const categoryString = await AsyncStorage.getItem('category');
        if (categoryString) {
            const category = JSON.parse(categoryString);
            return category;
        } else {
            console.log('Không có dữ liệu category trong AsyncStorage.');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu category từ AsyncStorage:', error);
        return null;
    }
};


export const orderAPI = async (category, roomCount, startDate, endDate, token) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}customer/create-order`,
            data: { category, roomCount, startDate, endDate },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`

            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            if (response.data && response.data.message) {
                console.error("Lỗi:", response.data.message);
            } else {
                console.error("Lỗi không rõ nguyên nhân, status:", response.status);
            }
            return null;
        }
    } catch (error) {
        console.error('Lỗi :', error);
        return null
    }
}

export const getBookedAPI = async () => {
    const token = await getToken();
    // console.log("token booked: ", token)
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}customer/list-booked`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Lỗi: ", error)
    }
}
export const getCheckoutAPI = async () => {
    const token = await getToken();

    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}customer/list-checkout`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Lỗi: ", error)
    }
}
export const getCancelAPI = async () => {
    const token = await getToken();

    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}customer/list-cancel`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Lỗi: ", error)
    }
}

export const continuePaymentAPI = async (token, reservarID, total) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}payment/create?reservarID=${reservarID}&total=${total}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data.url;
        }
    } catch (error) {
        // console.log("Dữ liệu truyền vào API: ", token, reservarID, total)

        console.log("Lỗi: ", error)
    }
}

export const getProviderAPI = async (providerId) => {
    const token = await getToken()
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}customer/get-provider`,
            params: {
                providerId: parseInt(providerId)
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            // console.log(response.data)
            return response.data
        }
    } catch (error) {
        console.log("Lỗi: ", error)
    }
}

export const getCategoryAPI = async (categoryId) => {
    const token = await getToken();

    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}customer/get-category`,
            params: {
                categoryId: parseInt(categoryId)
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            // console.log(response.data)
            return response.data
        }
    } catch (error) {
        console.log("Lỗi: ", error)
    }
}
export const getAllCategory = async (token, providerId) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}customer/get-categories`,
            params: {
                providerId: parseInt(providerId)
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            // console.log("response data: ", response.data)
            return response.data
        }
    } catch (error) {
        console.log("Lỗi: ", error)
    }
}
export const getListFavoriteBySearch = async (start, end, person, token) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}customer/favorite-provider`,
            params: {
                start: start,
                end: end,
                person: person,
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Lỗi get favorite by search: ", error)
    }
}

export const addReview = async (imgReview, rate, description, reservarId, token) => {
    const formData = new FormData()
    imgReview.forEach((img, index) => {
        formData.append(`imgReview`, {
            uri: img,
            type: 'image/png',
            name: `image-${index}.png`,
        });
    });
    formData.append('rate', parseInt(rate));
    formData.append('description', description);
    formData.append('reservarId', parseInt(reservarId));
    console.log("formDataa: ", formData)
    try {
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}customer/add-review`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log("Log", error)
    }
}

export const getListReview = async () => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}customer/list-reviews`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log("Lỗi: ", error)
        // console.log("token: ", token)
    }
}

export const postCancleAPI = async (reservarId) => {
    const token = await getToken();
    const formData = new FormData();
    formData.append("reservarId", reservarId)
    try {
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}customer/cancel`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        console.log(error);
    }
}