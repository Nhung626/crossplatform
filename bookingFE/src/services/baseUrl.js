export const BASE_URL = "http://192.168.1.77:3000/api/v1/";
export const addUrlCustomerSignUp = BASE_URL.concat('customer/auth/sign-up');
export const addUrlCustomerLogin = BASE_URL.concat('customer/auth/login');
export const addUrlCustomerUpdate = (id) => BASE_URL.concat(`customer/update/${id}`);
