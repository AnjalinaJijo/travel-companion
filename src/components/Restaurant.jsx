import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

import { useDispatch,useSelector} from 'react-redux';
import {
  setLat,
  setLong,
  setIsLoading,
  setRegion,
  setPlaces} from '../features/Place/placeSlice';


import MenuBookIcon from '@mui/icons-material/MenuBook';

import { Grid,Rating,Card,CardMedia,Box,Typography,Toolbar, Button, TextField, CardContent } from '@mui/material';

import axios from 'axios';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import TripApi from './Travel/TripApi';
import LinearProgress from '@mui/material/LinearProgress';


const Restaurants = () => {
  const [cuisine, setCuisine] = React.useState('');
  // const [searchActive, setSearchActive] = React.useState(false);

  const handleCuisine = (event) => {
    setCuisine(event.target.value);
  };
  const [rating, setRating] = React.useState(0);
  // const [searchValue, setSearchValue] = React.useState(false);

  const handleRating = (event) => {
    setRating(event.target.value);  
  };



  const dispatch = useDispatch();

  const region = useSelector((state) => state.place.value.region);
  const places= useSelector((state) => state.place.value.places);
  const lat= useSelector((state) => state.place.value.lat);
  const long= useSelector((state) => state.place.value.long);
  const isLoading= useSelector((state) => state.place.value.isLoading);

    const options = {
     
        params: {    
          latitude:  lat,
          longitude: long,
          // latitude: '12.91285',
          // longitude: '100.87808',
          limit: '30',
          currency: 'USD',
          distance: '10',
          open_now: 'false',
          lunit: 'km',
          lang: 'en_US',
          min_rating: '3',
          combined_food: cuisine,
        },
        headers: {
          'X-RapidAPI-Key':  process.env.REACT_APP_travelAdvisorAPiKey,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      };

      const handleRegion = (event) => {
        event.preventDefault()
        // setSearchValue(event.target.value)
        dispatch(
          setRegion({
            region: event.target.value
          })  
        )
        // setRegionChange(true) 
        // apicall()
      };

      useEffect(()=>{
        console.log(lat)
        console.log(long)
        apicall()
      },[])

      

      const HandleSearch = (event)=>{
        event.preventDefault()
        getlatlong()
      //   setTimeout(() => {
      //     apicall()
      //  }, 1000);
        apicall()
      }
    
    const apicall = async ()=>{
        try {
            const response = await axios.get('https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',options);
            // console.log(response.data.data);
            dispatch(
              setIsLoading({
                isLoading:true
              })
            ) 

            dispatch(
              setPlaces({
                places:response.data.data
              })
            ) 
        } catch (error) {
            console.error(error);
        }
    }

    const getlatlong = async()=>{
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
            // console.log(response.data.results[0].geometry)
        
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

  return (
    <>
    {isLoading? (
      <Box sx={{width:'100%'}} >
        <LinearProgress />
        </Box>
    ):
    (<Box>
      {/* {RegionChange && <TripApi />} */}
        <Toolbar sx={{display:'flex',justifyContent:'space-evenly',zIndex:3 ,color:'white',mt:'30px'}}>
        <TextField
        id="search"
        type="search"
        label={region}
        value={region}
        sx={{ width: '200px'}}
        onChange={handleRegion}
        />

        <FormControl sx={{width:'100px'}}>
        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
        <Select
          value={rating}
          label="Rating"
          onChange={handleRating}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
        </FormControl>


        <FormControl sx={{width:'100px'}}>
        <InputLabel id="demo-simple-select-label">Cuisine</InputLabel>
        <Select
          value={cuisine}
          label="Cuisine"
          onChange={handleCuisine}
        >
          <MenuItem value={1}>European</MenuItem>
          <MenuItem value={2}>Italian</MenuItem>
          <MenuItem value={3}>Vietnamese</MenuItem>
          <MenuItem value={4}>Seafood</MenuItem>
          <MenuItem value={5}>International</MenuItem>

        </Select>
        </FormControl>


        <Button variant="contained" onClick={HandleSearch}
        sx={{mt:'10px',backgroundColor:'#51B0DA',
        width:'100px',height:'50px'}}>
        Search
        </Button>
        </Toolbar>

            {places?.filter((place)=>((place.name && place.rating) >0 &&  Number(place.rating)>=rating)).map((place,id)=>(

            <Grid container spacing={5} sx={{mt:'10px',padding:'10px',display:'flex',justifyContent:'center',align_items:'center'}} >

            <Card variant="outlined"  elevation={6} sx={{border: "1px solid #51B0DA" ,mb:'10px',mt:'10px',padding:'10px',width:'80vw',height:'600',display:'flex',borderRadius:'3%'}}>
              <CardMedia
                          style={{ height: '600', width: '60%',borderRadius:'3%'}}
                          image={place?.photo?.images?.large?.url ? place?.photo?.images?.large?.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg' }
                          title={place.name}
                />

                          
                  <CardContent sx={{ml:'3%',display:'flex',flexDirection:'column',justifyContent:'center',align_items:'center'}}>
                      <Typography variant="h5" sx={{fontWeight:'bold'}}>
                        {place.name}
                      </Typography>

                      <Rating name="read-only" sx={{mb:'10px'}} value={Number(place.rating)} precision={0.5} readOnly />

                      <Typography gutterBottom variant="subtitle1" >
                           {place.location_string ? place.location_string:null }
                        </Typography>

                              <Typography variant="subtitle1" >
                                  {place.ranking}
                              </Typography>
                              
                                  { place.cuisine ? (place.cuisine.map((cus)=>(
                                    <Typography variant="subtitle1"  sx={{display:'flex',flexDirection:'row',alignItems:'space-evenly'}}>
                                      {cus.name ? cus.name : null}
                                    </Typography>
                                  ))):null}


                              <Typography variant="subtitle1" >
                                  {place.open_now_text}
                              </Typography> 

                            {place.web_url?(
                            <Link to={place.web_url} target="_blank" style={{textDecoration: 'none',display:'flex'}}>
                                  <MenuBookIcon/>
                                  <Typography variant="subtitle1" sx={{textDecoration:'none'}}>
                                      Check out the website on TripAdvisor
                                  </Typography>
                            </Link>):(null)}


                            <Typography variant="subtitle1" >
                                    {place.price}
                                  </Typography>

                          {place.phone && (
                          <Typography>{place.phone}</Typography>
                        )} 

                        {place.booking?.url ?(
                          <Link to={place.booking?.url} style={{textDecoration: 'none',display:'flex'}}>
                          <Box sx={{display:'flex',justifyContent:'center',align_items:'center'}}>
                            <Button variant="contained" sx={{textDecoration:'none',mt:'10px',backgroundColor:'#51B0DA',width:'200px',height:'50px'}}>Book Now</Button>
                          </Box>
                      </Link>
                        ): null}

                                             
                   </CardContent>
              </Card>
              </Grid>
            ))} 
  </Box>)}
    </>
  )
}

export default Restaurants
