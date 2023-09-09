import React,{ useState,useEffect } from 'react'
// import { CssBaseline,Grid } from '@material-ui/core'
import { CssBaseline,Grid,Box } from '@mui/material'

import { getPlacesData } from './api';

import Header from "./Header/Header"
import List from "./List/List"
import Map from "./Map/Map"


const SeeMap = () => {
  const [places,setPlaces] = useState([]);
  const [childClicked,setChildClicked] = useState(null);//to know which place is clicked in map
  const [isLoading,setIsLoading] = useState(false);
  const [filteredPlaces,setFilteredPlaces] = useState([]);


  const [coordinates,setCoordinates] = useState({});
  const [bounds,setBounds] = useState(null);

  const [type,setType] = useState('restaurants');
  const [rating,setRating] = useState('');
  const [autocomplete,setautocomplete] = useState(null);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: { latitude, longitude}}) =>{
      setCoordinates({ lat: latitude,lng:longitude })
    })
  },[])//this works only at the start of maplication

  useEffect(()=>{
    const filteredPlaces = places.filter((place)=> Number(place.rating) > rating)
    setFilteredPlaces(filteredPlaces);
  },[rating])

  useEffect(()=>{
    if(bounds){
    //we defined getPlacesData as an async fn
    // console.log(coordinates,bounds)
    setIsLoading(true)
    getPlacesData(type,bounds.sw,bounds.ne)
    .then((data)=>{
      //as soon as you get the places filter to remove dummy places with no name,etc.
      setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0))
      setFilteredPlaces([])
      setRating('')
      setIsLoading(false)
      // console.log(data)
    })
  }
  },[type,bounds])//this works only at the start of maplication
  // console.log(places)
  // console.log(filteredPlaces)
  // console.log(childClicked)
  const onLoad =(autoC)=> setautocomplete(autoC);

    const onPlaceChanged = ()=>{
        const lat= autocomplete.getPlace().geometry.location.lat();
        const lng= autocomplete.getPlace().geometry.location.lng();
        setCoordinates({lat,lng});
    }

  return (
      <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{width:'100%'}}>
        <Grid item xs={12} md={4}>
            <List 
            places={filteredPlaces.length ? filteredPlaces : places} 
            childClicked={childClicked}
            isLoading={isLoading} 
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating} />
        </Grid> 
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* //send setter functions as props to Map component */}
            <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places} 
            setChildClicked={setChildClicked}
            />
        </Grid> 
      </Grid>
      </>
  )
}

export default SeeMap
