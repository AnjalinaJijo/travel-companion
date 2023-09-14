import { configureStore } from "@reduxjs/toolkit";
import placeReducer from '../features/Place/placeSlice';

const store = configureStore({
    reducer:{
        place:placeReducer,
    },

})


export default store