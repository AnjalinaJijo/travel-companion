import React, { useEffect} from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { useDispatch,useSelector} from 'react-redux';
import {
  setPlaces,
  setRegion,
  setLat,
  setLong,} from '../features/Place/placeSlice';

import { Grid,Rating,Card,CardMedia,Box,Typography,Toolbar, Button,TextField,InputAdornment,Container, CardContent } from '@mui/material';

import axios from 'axios';

// import TripApi from './Travel/TripApi';
import LinearProgress from '@mui/material/LinearProgress';


const Hotels = () => {

  const [adults, setAdults] = React.useState(1);
  // const [RegionChange, setRegionChange] = React.useState(false);

 
  const handleChange = (event) => {
    setAdults(event.target.value);
  };
  const [nights, setNights] = React.useState(2);

  const handleNights = (event) => {
    setNights(event.target.value);
  };
  const [rooms, setRooms] = React.useState(2);

  const handleRooms = (event) => {
    setRooms(event.target.value);
  };
  const [rating, setRating] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');

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
      // params: {
      //   latitude: '40.7127281',
      //   longitude: '-74.0060152',
      //   lang: 'en_US',
      //   hotel_class: '1,2,3',
      //   limit: '30',
      //   adults: '1',
      //   amenities: 'beach,bar_lounge,airport_transportation',
      //   rooms: '1',
      //   child_rm_ages: '7,10',
      //   currency: 'USD',
      //   zff: '4,6',
      //   subcategory: 'hotel,bb,specialty',
      //   nights: '2',
      //   distance: '100'
      // },
        params: {
          latitude: lat,
          longitude:long,
        // latitude: '40.7127281',
        // longitude: '-74.0060152',
          lang: 'en_US',
          hotel_class: '1,2,3',
          limit: '30',
          adults: adults,
          rooms: rooms,
          currency: 'USD',
          subcategory: 'hotel,bb,specialty',
          nights: nights,
          distance: '100'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_travelAdvisorAPiKey,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        },
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
        // console.log(lat)
        // console.log(long)
        apicall()
       },[])

      const HandleSearch = (event)=>{
        event.preventDefault()
        getlatlong()
      //   setTimeout(() => {
      //     apicall()
      //  }, 1000);
      // console.log(lat)
      //   console.log(long)
        apicall()
      }

  

    const apicall = async ()=>{
        try {
            const response = await axios.get('https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng',options);
            // console.log(response.data);
            
            // console.log(response.data.data[0].photo.images.large.url);
            
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
            // console.log(response.data)
            // console.log(response.data[0].latitude)
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${region}&key=${process.env.REACT_APP_OpenCageGeoCoder}`);  
           
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
    ):(
      <Box>

      {/* {RegionChange && <TripApi />} */}
                  <Toolbar sx={{display:'flex',justifyContent:'space-evenly',zIndex:3 ,color:'white',mt:'30px'}}>
      
                          
                      <TextField
                      id="search"
                      type="text"
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
                        <InputLabel id="demo-simple-select-label">Adults</InputLabel>
                        <Select
                          value={adults}
                          label="Adults"
                          onChange={handleChange}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                        </Select>
                      </FormControl>
      
      
                    <TextField
                    id="search"
                    type="search"
                    label="Nights"
                    value={nights}
                    sx={{ width: '100px'}}
                    onChange={handleNights}
                  />
                    <TextField
                    id="search"
                    type="search"
                    label="Rooms"
                    value={rooms}
                    sx={{ width: '100px'}}
                    onChange={handleRooms}
                  />
      
      
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
                    image={place?.photo?.images?.large?.url ? place?.photo?.images?.large?.url:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fhotelxtoronto.com%2F&psig=AOvVaw0KYwzsEkXnTI72dyc6e4Yp&ust=1694547946942000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCPCjnJSpo4EDFQAAAAAdAAAAABAE' }
                    title={place.name}
                  />
      
                     
                      <CardContent sx={{ml:'10px',display:'flex',flexDirection:'column',justifyContent:'center',align_items:'center'}}>
                        <Typography variant="h5" sx={{fontWeight:'bold'}}>
                            {place.name}
                        </Typography>
      
                        <Rating name="read-only" sx={{mb:'10px'}} value={Number(place.rating)} precision={0.5} readOnly />
      
                        <Typography variant="subtitle1" >
                            {place.ranking}
                        </Typography>
      
                        <Typography variant="subtitle1" >
                            {place?.location_string ? place?.location_string : null }
                        </Typography>
      
                       <Typography gutterBottom variant="subtitle1" sx={{fontWeight:'bold'}} >
                            {place?.price ? place?.price:null}
                        </Typography>
      
                      <Box sx={{display:'flex',justifyContent:'center',align_items:'center'}}>
                        <Button variant="contained" sx={{mt:'10px',backgroundColor:'#51B0DA',width:'200px',height:'50px'}}>Book Now</Button>
                      </Box>
                        </CardContent>
        </Card>
         </Grid>
          ))} 
          </Box>
    )}
    
    </>
  )
}

export default Hotels
