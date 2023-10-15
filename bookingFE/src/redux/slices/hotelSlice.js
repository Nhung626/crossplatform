// hotelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    hotel: {
        id: null,
        name: null,
        imageHotel: [],
        description: null,
        address: null,
        providerPhone: null,
    },
};

export const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        selectHotel: (state, action) => {
            state.hotel = action.payload;
        },
    },
});

export const { selectHotel } = hotelSlice.actions

export const selectSelectedHotel = state => state.hotel.selectedHotel;


export default hotelSlice.reducer;
