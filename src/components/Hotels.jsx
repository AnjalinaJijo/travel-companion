import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles';

import { AppBar,Grid,Rating,Card,CardMedia,Box,Typography,Toolbar, Button, Paper, Link,TextField,InputAdornment,Container, CardContent } from '@mui/material';

import axios from 'axios';




const Hotels = () => {

  // console.log(geoId)

    const [places,setPlaces] = useState([]);
    // const [image,setImage] = useState('')
    const [urlTemplate,setUrlTemplate] = useState('')
    const [adults,setAdults] = useState('')
    const [rooms,setRooms] = useState('')

    const options = {
     
        params: {
              geoId: '35805',
              checkIn: '2023-09-15',
              checkOut: '2023-09-30',
              pageNumber: '1',
              adults: '',
              rooms: '',
              currencyCode: 'USD',
              // priceMin: '100'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_TripadvisorApiKey,
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };

    useEffect(()=>{
        apicall()
    },[])


    // const setTemplateForPlace = (place) => {
    //   if (place.cardPhotos && place.cardPhotos.length > 0) {
    //     // Set the urlTemplate here, but only if cardPhotos exist and have elements
    //     const modifiedUrl = place.cardPhotos[0].sizes.urlTemplate
    //       .replace('{width}', '200px')
    //       .replace('{height}', '300px');
    //     setUrlTemplate(modifiedUrl);
    //   }
    // };


    const apicall = async ()=>{
        try {
            // const response = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels',options);
            console.log(response.data.data.data);
            setPlaces(response.data.data.data);
           
            // console.log(response.data.data.data[0].cardPhotos[0].sizes.urlTemplate.replace('{width}', '500').replace('{height}', '600'))
            // seturlTemplate(response.data.data.data[1])
            // console.log(urlTemplate)
            // Assuming cardPhotos is within the badge object

            // setImage(urlTemplate
            //     )
           
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <Box>

<AppBar position="static" sx={{backgroundColor:'#51B0DA',pb:'15px'}}>
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

              <Button variant="outlined" sx={{color:"white",borderColor:'white', mr:'10px'}}>LOGIN</Button>
              <Button variant="contained" sx={{mr:'20px',backgroundColor:'white',color:'#51B0DA'}}>SIGNUP</Button>
              </Toolbar>
              </Box>
</AppBar>
    {/* <Background>
      <Typography variant="h3" component="h3" sx={{ zIndex:3 ,color:'white',mt:'30px',flexGrow: 1 }}>
                  TravelCompanion
      </Typography>
      <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',zIndex:5}}>
      <Typography variant="h2" component="h2" sx={{ fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center',zIndex:3 ,color:'white',mt:'30px',flexGrow: 1 }}>
                Visit Region
      </Typography>
      <Typography variant="h4" component="h3" sx={{display:'flex',justifyContent:'center',alignItems:'center',zIndex:3 ,color:'white',flexGrow: 1 }}>
               See All Hotels
      </Typography>
      </Box>
    </Background> */}



    {places?.map((place,id)=>(

      <Grid container spacing={5} sx={{mt:'10px',padding:'10px',display:'flex',justifyContent:'center',align_items:'center'}} >

        <Card variant="outlined"  elevation={6} sx={{border: "1px solid #51B0DA" ,mb:'10px',mt:'10px',padding:'10px',width:'70vw',height:'600',display:'flex',borderRadius:'3%'}}>
                    {place.cardPhotos && place.cardPhotos.length > 0 ? (
                  <CardMedia
                    style={{ height: 300, width: 350,borderRadius:'3%'}}
                    image={place.cardPhotos[0].sizes.urlTemplate
                      .replace('{width}', '300')
                      .replace('{height}', '300')}
                    title={place.title.split('.')[1]}
                  />
                ) : (null)}
 
                     
                      <CardContent sx={{ml:'10px',display:'flex',flexDirection:'column',justifyContent:'center',align_items:'center'}}>
                        <Typography variant="h5" sx={{fontWeight:'bold'}}>
                            {place.title.includes('.') ? place.title.split('.')[1] : place.title}
                        </Typography>

                        <Rating name="read-only" sx={{mb:'10px'}} value={Number(place.bubbleRating.rating)} precision={0.5} readOnly />

                        <Typography variant="h6" >
                            {place.primaryInfo  && place.primaryInfo}
                        </Typography>
                        <Typography  variant="h6" >
                            {place.secondaryInfo ? place.secondaryInfo:null }
                        </Typography>
                        <Typography variant="h6" >
                            {place.priceForDisplay }
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" >
                            {place.priceDetails?place.priceDetails:null }
                        </Typography>

                        <Typography gutterBottom variant="subtitle1" >
                            {place.primaryInfo?place.primaryInfo:null}
                        </Typography>
                       

                      <Box sx={{display:'flex',justifyContent:'center',align_items:'center'}}>
                        <Button variant="contained" sx={{mt:'10px',backgroundColor:'#51B0DA',width:'200px',height:'50px'}}>Book Now</Button>
                      </Box>
                        </CardContent>
                        
                        


        </Card>

         </Grid>

    ))} 
    </Box>
  )
}


// const imageURL = './images/hotels.jpg';
// const Background = styled("div")({
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     backgroundImage: `url(${imageURL})`,
//     backgroundPosition: "center",
//     backgroundSize: "cover",
//     backgroundRepeat: "no-repeat",
//     // filter:"contrast(1.2)",
//     zIndex:-1,
//   });

export default Hotels
