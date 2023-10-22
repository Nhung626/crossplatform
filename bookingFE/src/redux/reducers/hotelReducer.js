import { combineReducers } from 'redux';
import hotelReducer from '../slices/hotelSlice'

const rootReducer = combineReducers({
  hotel: hotelReducer,
  // Thêm các reducer khác nếu có
});

export default rootReducer;
