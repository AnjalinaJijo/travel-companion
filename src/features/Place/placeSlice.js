import {createSlice} from '@reduxjs/toolkit'


const placeSlice = createSlice({
    name:'place',
    initialState:{ value:{lat:'',long:'',region:'',isClicked:false,places:[],isLoading:true}},
    reducers:{
        setRegion:(state,action)=>{
            // state.value.isLoading =true;
            state.value.region = action.payload.region;
            
        },
        setIsLoading:(state,action)=>{
            state.value.isLoading = action.payload.isLoading;
        },
        setIsClicked:(state,action)=>{
            state.value.isClicked = action.payload.isClicked;
        },
        setPlaces:(state,action)=>{
            state.value.isLoading =true;
            state.value.places = action.payload.places;
            state.value.isLoading = false;
        },
        setLat:(state,action)=>{
            state.value.lat = action.payload.lat;
        },
        setLong:(state,action)=>{
            state.value.long = action.payload.long;
        },

    },

})


export const {
    setRegion,setIsLoading,
    setIsClicked,setPlaces,setLat,
      setLong} = placeSlice.actions

export default placeSlice.reducer