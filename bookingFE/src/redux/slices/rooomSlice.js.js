// hotelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    room: {
        imgIdCategories: [],
        categoryId: null,
        categoryName: null,
        person: null,
        area: null,
        bedType: null,
        description: null,
        price: null,
        roomNumbers: null,
        countRoom: null,

    },
};

export const hotelSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state.hotel = action.payload;
        },
    },
});

export const { setRooms } = hotelSlice.actions

export const selectedRoom = state => state.room.room;


export default hotelSlice.reducer;
