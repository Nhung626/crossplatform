import { configureStore } from '@reduxjs/toolkit'
import hotelSlice from './src/redux/slices/hotelSlice'
import rooomSlice from './src/redux/slices/rooomSlice.js'

export const store = configureStore({
    reducer: {
        hotel: hotelSlice,
        room: rooomSlice
    },
})