import React,{useEffect } from 'react'
import {useNavigate,Link} from "react-router-dom";


import { useDispatch,useSelector} from 'react-redux';
import { setRegion } from '../features/Place/placeSlice';

import { styled } from '@mui/material/styles';
import { Card,Box,Typography,Toolbar, Button, Paper,TextField,InputAdornment,Container, Hidden } from '@mui/material';
// import dateFormat from "dateformat";

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';


const HomePage = () => {
 const navigate = useNavigate();

  const dispatch = useDispatch();

  const region = useSelector((state) => state.place.value.region);
  
  
  const handleChange = (event) => {
    dispatch(
      setRegion({
        region:event.target.value
      })
    )
    // setRegion(event.target.value);
    // console.log(region)
  };

  const handleClick = () =>{
    navigate('/Home')
  }


  return (
          <Background>
            <Box sx={{display:'flex',width:'100vw'}}>
            <Toolbar sx={{zIndex:3 ,color:'white',mt:'30px'}}>
            <Typography variant="h3" component="h3" sx={{ typography: { sm: 'h3', xs: 'h4',md:'h3',lg:'h3' },flexGrow: 1 }}>
                  TravelCompanion
            </Typography>

            <Box sx={{display:"flex",justifyContent:'space-evenly',alignItems:'center'}}>
            <Box sx={{display: { xs: 'none', md: 'none', lg: 'inline' }}}>
              <Toolbar>
            <Link to="/Home/Restaurants" style={{ color:'white', flexGrow: 1,textDecoration: 'none',marginLeft:'60%',marginRight:'10%'}}>
            <Typography variant="h6" component="h6" >
                  Restaurants
            </Typography>
            </Link>
            <Link to="Home/Hotels" style={{ color:'white', flexGrow: 1,textDecoration: 'none',marginRight:'10%'}}>
            <Typography variant="h6" component="h6">
                  Hotels
            </Typography> 
            </Link>

         
            <Link to="Home/Attractions" style={{ color:'white', flexGrow: 1,textDecoration: 'none',marginRight:'10%'}}>
            <Typography variant="h6" component="h6">
                  Attractions
              </Typography>
              </Link>
             
              <Button variant="outlined" sx={{color:"#5AB9C2",borderColor:'#5AB9C2',mr:'5%'}}>LOGIN</Button>
              <Button variant="contained" sx={{backgroundColor:'#51B0DA',mr:'5%',float:'left'}}>SIGNUP</Button>
              </Toolbar>
              </Box>
              </Box>
              </Toolbar>
              </Box>
             
              <Box sx={{color:'white',zIndex:5,display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
              <Typography variant="h3" component="h3" sx={{ typography: { sm: 'h4', xs: 'h5',md:'h3',lg:'h3' },mt:'90px',flexGrow: 1,zIndex:5,fontWeight:'100px',ml:'3%'}}>
                  YOUR PERFECT TRAVEL COMPANION
              </Typography>
              <Typography variant="h6" component="h6" sx={{ typography: { sm: 'h5', xs: 'h6',md:'h6',lg:'h6' },zIndex:5,ml:'3%'}}>
                  Find Best Food, Stay and sites near you or anywhere in the globe...
              </Typography>

            <Container maxWidth="md" sx={{ mt: 5,display:'flex',justifyContent:'center',alignItems:'center',zIndex:5 }} >
            <TextField
              id="search"
              type="search"
              value={region}
              sx={{ width: '80%',backgroundColor:'white',borderRadius:'5%'}}
              onChange={handleChange}
              placeholder='Where eg:new york'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={handleClick} variant="contained" sx={{backgroundColor:'#51B0DA'}}>Find Place</Button>
                  </InputAdornment>
                ),
              }}
            />

          </Container>
        <Box sx={{mt:'10px' ,display:'flex',justifyContent:'center',alignItems:'center',zIndex:5 }}>
          </Box>
          </Box>  
          </Background>
  )
}

const imageURL = './images/beach.jpg';
const Background = styled("div")({
    position: "absolute",
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${imageURL})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    filter:"contrast(1.2)",
    zIndex:-1,

      "&::before" :{
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3),rgba(0,0,0,0.2))',
      content: "''",
      display: 'block',
      height: '100%',
      position: 'absolute',
      width: '100%',
    }

  });










const Home= styled (Box)(()=>({
    height:'100vh',
    width:'100vw',
    background:'url(../public/images/beach.jpg)',
    zIndex:-1
    // "&::before" :{
    //   backgroundColor:'rgb(0,0,0,0.5)',
    //   height:'100%',
    //   width:'100%',
    // }
  }))

  
export default HomePage
