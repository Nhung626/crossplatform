<<<<<<< Updated upstream
export const BASE_URL = "http://192.168.110.220:3000/api/v1/";
=======
export const BASE_URL = "http://192.168.1.35:3000/api/v1/";
>>>>>>> Stashed changes
export const addUrlCustomerSignUp = BASE_URL.concat('customer/auth/sign-up');
export const addUrlCustomerLogin = BASE_URL.concat('customer/auth/login');
export const addUrlCustomerUpdate = (id) => BASE_URL.concat(`customer/update/${id}`);
export const getCustomerUrl = (id) => BASE_URL.concat(`customer/get-customer/${id}`);

export const getImgCustomerUrl = BASE_URL.concat('image');

export const getAllProviderUrl = BASE_URL.concat('provider/get-providers');

export const getCategoryUrl = (id) => BASE_URL.concat(`provider/get-categories/${id}`);


