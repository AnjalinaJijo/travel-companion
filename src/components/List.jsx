import React,{ useEffect,useState } from 'react'
import CardsPage from './CardsPage';
import { styled } from '@mui/material/styles';

import Hotels from './Hotels';

import { Box,Typography,Toolbar, Button, Paper, Link,TextField,InputAdornment,Container } from '@mui/material';

import axios from 'axios';

const List = (region,start,end) => {

const [regionImg,setRegionImg] = useState('')
const [geoId,setGeoId] = useState(0)
// const [image,setImage] = useState("")
// const [maxw,setMaxW] = useState("")
// const [minH,setminH] = useState("")
// const [imgurl,setimgurl] = useState("")
  
const options = {
  params: {query: `${region}`},
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_TripadvisorApiKey,
    'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
  }
};


useEffect(() =>{
  trip()
},[])



const trip = async()=>{
  console.log(region)

  // try {
  //   // const response = await axios.get("https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation",options);
  //   console.log(response.data.data[0].geoId.split(';')[1]);
  //   // console.log(response.data.data[0].image.urlTemplate)
  //   console.log(response.data.data)
  //   // console.log(response.data.data[0])
  //   // console.log(response.data.data[0].secondaryText)

  //   // const{maxHeight,maxWidth,urlTemplate} = response.data.data[0].image
  //   // setMaxW(maxWidth)
  //   // setminH(maxHeight)
  //   // setimgurl(urlTemplate
  //   //   .replace('{width}', 500)
  //   //   .replace('{height}', 500)
  //   //   )
  //   // setImage(response.data.data[0].image.urlTemplate);
  //   setGeoId(response.data.data[0].geoId.split(';')[1]);
  //   // setRegionImg(response.data.data[0].geoId.split(';')[1]);
  // } catch (error) {
  //   console.error(error);
  // }
}

  return (
    <Box>
     <Link href="/Hotels">
      Hotels
     </Link>
     {/* <Hotels geoId={Number(geoId)} /> */}
    </Box>
  )
}


export default List
