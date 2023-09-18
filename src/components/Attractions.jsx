import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { useDispatch,useSelector} from 'react-redux';
import {setPlaces,
  setLat,
  setRegion,
  setLong,} from '../features/Place/placeSlice';

import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { Tabs,Tab,AppBar,Grid,Rating,Card,CardMedia,Box,Typography,Toolbar, Button, Paper,TextField,InputAdornment,Container, CardContent } from '@mui/material';

import axios from 'axios';

// import TripApi from './Travel/TripApi'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LinearProgress from '@mui/material/LinearProgress';

const Attractions = () => {
  const [rating, setRating] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');

  const handleRating = (event) => {
    setRating(event.target.value);
  };


  // const [RegionChange, setRegionChange] = React.useState(false);

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
          distance: '2',
          open_now: 'false',
          lunit: 'km',
          lang: 'en_US',
          distance: '1000'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_travelAdvisorAPiKey,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      };

      useEffect(()=>{
        apicall()
    },[])
 
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
    // const handleRegion = (event) => {
    //   setSearchValue(event.target.value)
    // };
  
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
            const response = await axios.get('https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng',options);
            console.log(response.data.data);
            // console.log(response.data.data[1].photo.images.large.url);
          
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
   
 
                <Button variant="contained" onClick={HandleSearch}
                sx={{mt:'10px',backgroundColor:'#51B0DA',
                width:'100px',height:'50px'}}>
                Search
                </Button>
    
    
                </Toolbar>
    
        {places?.filter((place)=>place.name && place.rating >0).map((place,id)=>(
    
          <Grid container spacing={5} sx={{mt:'10px',padding:'10px',display:'flex',justifyContent:'center',align_items:'center'}} >
    
    <Card variant="outlined"  elevation={6} sx={{border: "1px solid #51B0DA" ,mb:'10px',mt:'10px',padding:'10px',width:'80vw',height:'600',display:'flex',borderRadius:'3%'}}>
                      <CardMedia
                        style={{ height: '600', width: '60%',borderRadius:'3%'}}
                        image={place?.photo?.images?.large?.url ? place?.photo?.images?.large?.url:'https://www.quebec-cite.com/sites/otq/files/styles/slider_map/public/media/image/Old-Quebec.jpg?itok=TgzuYJ59' }
                        title={place.name}
                      />
     
                         
                          <CardContent sx={{ml:'10px',display:'flex',flexDirection:'column',justifyContent:'center',align_items:'center'}}>
                            <Typography variant="h5" sx={{fontWeight:'bold'}}>
                                {place.name}
                            </Typography>
    
                            <Rating name="read-only" sx={{mb:'10px'}} value={Number(place.rating)} precision={0.5} readOnly />
    
                            <Typography gutterBottom variant="subtitle1" >
                                {place.bearing ? place.bearing:null }
                            </Typography>
    
                            <Typography variant="subtitle1" >
                                {place.ranking}
                            </Typography>
    
                           {place?.web_url ? (
                           <Link href={place.web_url} sx={{textDecoration: 'none',display:'flex'}}>
                                <MenuBookIcon/>
                                <Typography variant="subtitle1" >
                                    See WebSite
                                </Typography>
                           </Link>):(null)}
    
                           <Link href={place.write_review} sx={{textDecoration: 'none',display:'flex'}}>
                                <MenuBookIcon/>
                                <Typography variant="subtitle1" >
                                    Write Review
                                </Typography>
                           </Link>
    
    
                           <Typography variant="subtitle1" >
                                   {place.price}
                                </Typography>
                        
                          </CardContent>
            </Card>  
             </Grid>   
        ))} 
        </Box>
    )}
    </>
  )
}

export default Attractions

