export const BASE_URL = "http://172.20.10.12:3000/api/v1/";
// export const BASE_URL = "http://192.168.0.116:3000/api/v1/";
// export const BASE_URL = "http://192.168.1.4:3000/api/v1/";
// export const BASE_URL = "http://10.0.2.43:3000/api/v1/";
export const addUrlProviderSignUp = BASE_URL.concat('provider/auth/sign-up');
export const addUrlProviderLogin = BASE_URL.concat('provider/auth/login');
export const addUrlProviderUpdate = BASE_URL.concat(`provider/update`);
export const getProviderUrl = BASE_URL.concat(`provider/get-provider`);
export const addUrlProviderAddRoom = BASE_URL.concat(`provider/add-room`);
export const getCategoryUrl  = BASE_URL.concat(`provider/get-categories`);
export const getImgProviderUrl = BASE_URL.concat('image');
export const getImgRoomUrl = BASE_URL.concat('image');

export const getBookerUrl = BASE_URL.concat(`provider/list-booked`);
export const getCheckinUrl = BASE_URL.concat(`provider/list-checkin`);
export const getCheckoutUrl = BASE_URL.concat(`provider/list-checkout`);
export const getCancelUrl = BASE_URL.concat(`provider/list-cancel`);
export const getReviewUrl = BASE_URL.concat(`provider/reviews`);


export const postCheckinUrl =(reservarId)=> BASE_URL.concat(`provider/checkin?reservarId=${reservarId}`);
export const postCheckoutUrl =(reservarId)=> BASE_URL.concat(`provider/checkout?reservarId=${reservarId}`);
export const postCancelUrl =(reservarId)=> BASE_URL.concat(`provider/cancel?reservarId=${reservarId}`);