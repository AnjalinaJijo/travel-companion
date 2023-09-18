import axios from 'axios'
import { useDispatch,useSelector} from 'react-redux';
import {
  setLat,
  setLong} from '../../features/Place/placeSlice';
import { useEffect } from 'react';

const TripApi =()=>{ 
  const dispatch = useDispatch();
  const region = useSelector((state) => state.place.value.region);
  useEffect(()=>{
    callapi()
  },[])
  const callapi = async()=>{
    // const options = {
    //     params: {
    //       city: region
    //     },
    //     headers: {
    //       'X-RapidAPI-Key': process.env.REACT_APP_GeoSourceApiKey,
    //       'X-RapidAPI-Host': 'geosource-api.p.rapidapi.com'
    //     }
    //   };
      try {
          // const response = await axios.get("https://geosource-api.p.rapidapi.com/locationByCity.php",options);
          const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${region}&key=${process.env.REACT_APP_OpenCageGeoCoder}`);      
          // console.log(response.data)
          // console.log(response.data[0].latitude)
          const data=response.data.results[0].geometry
          console.log(response.data.results[0].geometry)
      
          dispatch(
            setLat({
              // lat : response.data[1].latitude
              lat:data.lat
            })
          )
          dispatch(
            setLong({
              // long : response.data[1].longitude
              long:data.lng
            })
          )
        } catch (error) {
          console.error(error);
        }
} 
}

export default TripApi
