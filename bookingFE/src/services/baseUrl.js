export const BASE_URL = "http://192.168.185.147:3000/api/v1/";
export const addUrlCustomerSignUp = BASE_URL.concat('customer/auth/sign-up');
export const addUrlCustomerLogin = BASE_URL.concat('customer/auth/login');
export const addUrlCustomerUpdate = (id) => BASE_URL.concat(`customer/update/${id}`);
export const getCustomerUrl = (id) => BASE_URL.concat(`customer/get-customer/${id}`);

export const getImgCustomerUrl = BASE_URL.concat('image');

