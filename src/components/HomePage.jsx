import React,{ useState,useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box,Typography,Toolbar, Button, Paper, Link,TextField,InputAdornment,Container } from '@mui/material';
import CardsPage from './CardsPage';
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from '@mui/icons-material/Help';
import dateFormat from "dateformat";

import List from './List';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import {hotel} from './api/hotel'


const HomePage = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [start, setStart] =  useState(new Date().toLocaleDateString('fr-FR'));
  const [end, setEnd] =  useState(new Date().toLocaleDateString('fr-FR'));
  const [isClicked, setIsClicked] =  useState(false);
  
  const handleChange = (event) => {
    setRegion(event.target.value);
    console.log(region)
  };

  const handleClick = () =>{
    setIsClicked(true)
    console.log(region)

    // try {
    //   const response = await axios.get("https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation",options);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  useEffect(()=>{
    const res = hotel
console.log(start)
console.log(end)

    
  },[region,start,end])

  return (
    <>
    {isClicked ?
     (
      <List region={region}
       start={start}
       end={end}/>
     )
    
    :( <Box>
          <Background>
            <Box>
            <Toolbar sx={{zIndex:3 ,color:'white',mt:'30px'}}>
            <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}>
                  TravelCompanion
            </Typography>

            <Link href="/Restaurants" sx={{ color:'white', flexGrow: 1, ml:'27px',textDecoration: 'none'}}>
            <Typography variant="h6" component="h6" >
                  Restaurants
            </Typography>
            </Link>

            {/* <Typography variant="h6" component="h6" sx={{ flexGrow: 1, mr:'17px' }}>
                  Hotels
            </Typography> */}
            <Link href="/Attractions" sx={{ color:'white', flexGrow: 1, ml:'27px',textDecoration: 'none'}}>
            <Typography variant="h6" component="h6" sx={{ flexGrow: 1, mr:'17px' }}>
                  Attractions
              </Typography>
              </Link>


              <Link href="/SeeMap" sx={{ color:'white', flexGrow: 1, ml:'27px',textDecoration: 'none'}}>
              <Typography variant="h6" component="h6" sx={{ flexGrow: 1,mr:'27px' }}>
                  see Map
              </Typography>
              </Link>

              <Button variant="outlined" sx={{color:"#5AB9C2",borderColor:'#5AB9C2', mr:'10px'}}>LOGIN</Button>
              <Button variant="contained" sx={{mr:'20px',backgroundColor:'#51B0DA'}}>SIGNUP</Button>
              </Toolbar>
              </Box>
              <Box sx={{color:'white',zIndex:5,display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
              <Typography variant="h3" component="h3" sx={{ mt:'90px',display:'flex',justifyContent:'center',alignItems:'center',flexGrow: 1,zIndex:5,fontWeight:'100px'}}>
                  YOUR PERFECT TRAVEL COMPANION
              </Typography>
              <Typography variant="h6" component="h6" sx={{ display:'flex',justifyContent:'center',alignItems:'center',flexGrow: 1,zIndex:5}}>
                  Find Best Food, Stay and sites near you or anywhere in the globe...
              </Typography>

            <Container maxWidth="md" sx={{ mt: 5,display:'flex',justifyContent:'center',alignItems:'center',zIndex:5 }} >
            <TextField
              id="search"
              type="search"
              // label="Where would you like to go"
              value={region}
              sx={{ width: 650,backgroundColor:'white',borderRadius:'5%'}}
              // InputLabelProps={{shrink: shrink}}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/* <SearchIcon /> */}
                    {/* <Link href="/List" state={{ region: {region} }}> */}
                    <Button onClick={handleClick} variant="contained" sx={{backgroundColor:'#51B0DA'}}>Find Places</Button>
                    {/* </Link> */}
                  </InputAdornment>
                ),
              }}
            />

          </Container>
        <Box sx={{mt:'10px' ,display:'flex',justifyContent:'center',alignItems:'center',zIndex:5 }}>
        
        <Box sx={{mr:'20px'}}>
        <DemoItem label="Start Date">
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
            onChange={(date) => {
              const d = new Date(date).toLocaleDateString('fr-FR');
              setStart(d);
            }}
            sx={{backgroundColor:"white"} }/>
          </LocalizationProvider>
          </DemoItem>
          </Box>
          
          <DemoItem label="End Date">
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
            onChange={(date) => {
              const d = new Date(date).toLocaleDateString('fr-FR');
              setEnd(d);
            }}
            sx={{backgroundColor:"white"}}/>
          </LocalizationProvider>
          </DemoItem>
          </Box>
          </Box>  
              {/* <Cloud /> */}
              <CardsPage />
          </Background>

        

          </Box>   )
}
</>
  )
}

const imageURL = './images/beach.jpg';
const Background = styled("div")({
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${imageURL})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    filter:"contrast(1.2)",
    zIndex:-1,

      "&::before" :{
      // backgroundColor:'rgb(0,0,0,0.5)',
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3),rgba(0,0,0,0.2))',
      content: "''",
      display: 'block',
      height: '100%',
      position: 'absolute',
      width: '100%',
    }

  });

  const Cloud = styled("div")({
    position:'absolute',
    background: 'linear-gradient(to bottom, rgba(239,238,237,0.5),rgba(224,223,221,0.2),rgba(255,255,255, 0.3)',
    marginTop:'70vh',
    // backgroundColor:"#ECEFF1",
    width: '100vw',
	  height: '100px',
	  background: 'white',
	  // margin: '60px auto',
	  borderRadius: '50%',
    // boxShadow:
		// '40px 20px 0 -20px white,40px 25px 10px -20px gray,-120px 20px 0 5px white,-120px 25px 18px 2px gray,-140px -20px 0 10px white,-140px -15px 18px 10px gray'
    "&::before":{
      width:'100px',
      height:'100px',
      borderRadius:'50px',
      background: 'linear-gradient(to bottom, rgba(239,238,237,0.5),rgba(224,223,221,0.2),rgba(255,255,255, 0.3)',
      top:'-40px',
      left:'50px',
      boxShadow: '0 0 10px white',

      "&::before":{
        width:'100px',
        height:'100px',
        borderRadius:'50px',
        background: 'linear-gradient(to bottom, rgba(239,238,237,0.5),rgba(224,223,221,0.2),rgba(255,255,255, 0.3)',
        top:'-40px',
        left:'50px',
        boxShadow: '0 0 10px white'
      }



    }
  })










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
